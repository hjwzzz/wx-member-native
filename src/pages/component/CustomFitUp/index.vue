<template>
  <!-- class="custom-fit-up-box" :style="{ top: headHeight + 'px' }" -->
  <view class="custom-fit-up-box-vnew">
    <block v-for="(items, index) in panelList" :key="index">
      <!-- 会员卡 -->
      <memberCard
        v-if="
          items.kind === 'MEM_CARD' &&
          items.visible === 'Y' &&
          props.types === 'WM_CENTER'
        "
        :items="items"
        :userInfo="userInfo"
        :loginList="loginList"
        @showCode="onShowCode"
      />
      <!-- 轮播图 -->
      <Rotation
        v-if="items.kind === 'SWIPER' && items.visible === 'Y'"
        :items="items"
      />
      <!-- 快捷导航-图片导航  -->
      <CustomQuick
        v-if="items.kind === 'QUICK_NAV' && items.visible === 'Y'"
        :items="items"
      />
      <!-- 广告 -->
      <NoticeBar
        v-if="items.kind === 'NOTICE' && items.visible === 'Y'"
        :items="items"
      />
      <!-- 图片-或者广告 -->
      <CustomImage
        v-if="items.kind === 'BANNER' && items.visible === 'Y'"
        :items="items"
        :types="types"
      />
      <!-- 分割线-占位 -->
      <CutView
        v-if="items.kind === 'PARTITION' && items.visible === 'Y'"
        :items="items"
      />
      <!-- 预约服务 -->
      <MyService
        v-if="items.kind === 'RES_SVC' && items.visible === 'Y'"
        :items="items"
        :title="items.param.title"
        :srvProshowNum="items.param.showNum"
      />
      <!-- 我的奖品 -->
      <MyPrizes
        v-if="items.kind === 'MY_AWARD' && items.visible === 'Y'"
        :item="items"
        :items="items"
        :title="items.param.title"
        @handle="handleMyPrizes"
      />
      <!-- 标题头  -->
      <Title
        v-if="items.kind === 'TITLE' && items.visible === 'Y'"
        :items="items"
      >
      </Title>
      <!-- 今日金价 -->
      <TodayGoldPrices
        v-if="items.kind === 'GOLD_PRICE' && items.visible === 'Y'"
        :title="items.param.title"
        :items="items"
        :type="types"
      />
      <!-- 文本 -->
      <CustomText
        v-if="items.kind === 'TEXT' && items.visible === 'Y'"
        :items="items"
      />
      <!-- 富文本 -->

      <view
        class="des-html"
        v-if="items.kind === 'RICH_TEXT' && items.visible === 'Y'"
        :style="items.param?.doOut?.style"
      >
        <mp-html
          v-if="items.param.content"
          :copy-link="false"
          :content="richImage(items.param.content)"
          @linktap="linktap"
        />
      </view>
      <!-- 推荐礼品 -->
      <ContentMall
        v-if="items.kind === 'REC_GIFTS' && items.visible === 'Y'"
        :title="items.param.title"
        :items="items"
      />
      <!--  附近门店   -->
      <NearbyStore
        v-if="items.kind === 'NEAR_STORE' && items.visible === 'Y'"
        :title="items.param.title"
        :items="items"
      />

      <!--  质保单 -->
      <MyQualitys
        v-if="items.kind === 'WARRANTY' && items.visible === 'Y'"
        :title="items.param.title"
        :items="items"
        :policyListNum="items.param.showNum"
      />
      <!-- 视频  -->
      <CustomVideo
        v-if="items.kind === 'VIDEO' && items.visible === 'Y'"
        :items="items"
      />

      <!-- 优惠券  -->
      <Coupon
        v-if="items.kind === 'COUPON' && items.visible === 'Y'"
        :items="items"
        :title="items.param.title"
      />
    </block>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ref, Ref, reactive } from 'vue';
import Router from '@/utils/router';
// import Storage from '@/utils/storage';
import { getByOpsIdAndKind } from '@/api/server';
import { richImage } from '@/utils/util';

//
import memberCard from './component/memberCard.vue';
import ContentMall from './component/ContentMall.vue';
import Rotation from './component/Rotation.vue';
import MyQualitys from './component/MyQualitys.vue';
import TodayGoldPrices from './component/TodayGoldPrices.vue';
import Coupon from './component/Coupon.vue';
import NearbyStore from './component/NearbyStore.vue';
import CustomImage from './component/CustomImage.vue';
import NoticeBar from './component/NoticeBar.vue';
import CutView from './component/CutView.vue';
import MyService from './component/MyService.vue';
import MyPrizes from './component/MyPrizes.vue';
import Title from './component/Title.vue';
import CustomText from './component/CustomText.vue';
import CustomVideo from './component/CustomVideo.vue';
import CustomQuick from './component/CustomQuick.vue';

import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

interface Props {
  types?: any;
}
const props = withDefaults(defineProps<Props>(), { types: 'WM_HOME' });

const headHeight = ref(100);
onShow(() => {
  getThemeKind();
  getPageDate();
  uni.getSystemInfo({
    success: res => {
      const rr = uni.getMenuButtonBoundingClientRect();
      const menuInfoTop = rr.top;
      const menuInfoBottom = rr.bottom;
      const showHeight =
        Number(menuInfoTop) +
        Number(menuInfoBottom) -
        Number(res.statusBarHeight);
      headHeight.value = showHeight;
      // const navHeight =
      //   (rr.top - Number(res.statusBarHeight)) * 2 +
      //   Number(res.statusBarHeight) +
      //   rr.height;
    },
  });
});

// onMounted(() => {
//   getPageDate();
// });

const handleMyPrizes = (index: number) => {
  Router.goCodePage('my_prize', `?tab=${index}`);
};
const linktap = (e: any) => {
  uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(e.href)}` });
};
const emits = defineEmits(['showCode']);
const onShowCode = () => {
  emits('showCode');
};

// 页面数据
const panelList: Ref<any> = ref([]);

const userInfo: any = reactive({
  avatarUrl: '',
  nickName: '',
  name: '',
  curLevelName: '',
  memberCardInfo: '',
  showGrowthValue: false,
  showSignIn: false,
  doOut: {
    fixedStyle: 0,
    special: {
      color: '#8c7373',
      fontSize: '32rpx',
    },
    style: {
      borderRadius: '10rpx',
      marginBottom: '30rpx',
      marginLeft: '30rpx',
      marginRight: '30rpx',
      marginTop: '30rpx',
      background: '#fff',
    },
  },
  background: '',
});

const loginList: any = ref([]);
// const pageBackground = ref('');
const getPageDate = async () => {
  // const result = await getWmIndex('');
  const result = await getByOpsIdAndKind(props.types);

  // WM_CENTER
  if (props.types === 'WM_CENTER') {
    const { param, panelList } = result.data;
    loginList.value = param?.quickNavList || [];
    if (param) {
      userInfo.avatarUrl = param.avatarUrl;
      userInfo.curLevelName = param.curLevelName;
      userInfo.nickName = param.nickName;
    }

    //  获取基本信息
    const getMenber = (item: { kind: string }) => item.kind === 'MEM_CARD';
    const memberCardInfo = panelList.find(getMenber) || {};
    if (!memberCardInfo.param) {
      return;
    }
    userInfo.showGrowthValue = memberCardInfo.param.showGrowthValue || false;
    userInfo.showSignIn = memberCardInfo.param.showSignIn || false;
    userInfo.doOut = memberCardInfo.param.doOut;
    // userInfo.background =
    //   userInfo.doOut?.fixedStyle === 2
    //     ? null
    //     : memberCardInfo.param.doOut.style.background;
    if (
      memberCardInfo.param.doOut.style.background &&
      userInfo.doOut?.fixedStyle === 2
    ) {
      delete memberCardInfo.param.doOut.style.background;
    }
  }
  // console.log('result', result);
  if (result.data.panelList) {
    const comList = result.data.panelList.map((item: any) => {
      if (!item.param.doOut) {
        item.param.doOut = {
          fixedStyle: 0,
          special: {
            color: '#8c7373',
            fontSize: '32rpx',
          },
          style: {
            borderRadius: '10rpx',
            marginBottom: '30rpx',
            marginLeft: '30rpx',
            marginRight: '30rpx',
            marginTop: '30rpx',
            background: '#fff',
          },
        };
      }

      return item;
    });
    panelList.value = comList || [];
    // panelList.value = [];
    // setTimeout(() => {
    // }, 50);
  }
  // if (result.data.param?.title) {
  //   uni.setNavigationBarTitle({
  //     // 设置顶部bar的标题
  //     title: result.data?.param?.title,
  //   });
  // }
};

const getThemeKind = async () => {
  const getWmColorTheme: any = await getByOpsIdAndKind('WM_THEME');
  // console.log('getWmColorTheme', getWmColorTheme.data.style.mainColor);
  if (getWmColorTheme.data.style.mainColor) {
    initBasicsData.setMainColor(getWmColorTheme.data.style.mainColor);
    initBasicsData.setColorTheme(getWmColorTheme.data.style);
  }
  // if (getWmColorTheme.data.param?.doOut?.special) {
  //   const { navigationBarBackgroundColor, navigationBarTextStyle } =
  //     getWmColorTheme.data.param.doOut.special;
  //   uni.setNavigationBarColor({
  //     frontColor: navigationBarTextStyle || '#ffffff',
  //     backgroundColor: navigationBarBackgroundColor || '#ff547b',
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.custom-fit-up-box-vnew {
  margin-top: -370rpx;
}
.custom-fit-up-box {
  z-index: 999;
  position: absolute;
  left: 0px;
  right: 0px;
}
.des-html {
  // width: 630rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #646771;
  background: #fff;
  // border-radius: 16rpx;
  img {
    width: 50%;
  }
}
</style>
