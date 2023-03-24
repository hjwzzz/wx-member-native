<template>
  <block v-for="(items, index) in panelList" :key="index">
    <!-- 轮播图 -->
    <Rotation v-if="items.kind === 'SWIPER'" :items="items" />
    <!-- 快捷导航-图片导航  -->
    <CustomQuick v-if="items.kind === 'QUICK_NAV'" :items="items" />
    <!-- 广告 -->
    <NoticeBar v-if="items.kind === 'NOTICE'" :items="items" />
    <!-- 图片-或者广告 -->
    <CustomImage v-if="items.kind === 'BANNER'" :items="items" />
    <!-- 分割线-占位 -->
    <CutView v-if="items.kind === 'PARTITION'" :items="items" />
    <!-- 预约服务 -->
    <MyService
      v-if="items.kind === 'RES_SVC'"
      :items="items"
      :title="items.param.title"
      :srvProshowNum="items.param.showNum"
    />
    <!-- 我的奖品 -->
    <MyPrizes
      v-if="items.kind === 'MY_AWARD'"
      :item="items"
      :items="items"
      :title="items.param.title"
      @handle="handleMyPrizes"
    />
    <!-- 标题头  -->
    <Title v-if="items.kind === 'TITLE'" :items="items"> </Title>
    <!-- 今日金价 -->
    <TodayGoldPrices
      v-if="items.kind === 'GOLD_PRICE'"
      :title="items.param.title"
      :items="items"
      type="WM_HOME"
    />
    <!-- 文本 -->
    <CustomText v-if="items.kind === 'TEXT'" :items="items" />
    <!-- 富文本 -->

    <view
      class="des-html"
      v-if="items.kind === 'RICH_TEXT'"
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
      v-if="items.kind === 'REC_GIFTS'"
      :title="items.param.title"
      :items="items"
    />
    <!--  附近门店   -->
    <NearbyStore
      v-if="items.kind === 'NEAR_STORE'"
      :title="items.param.title"
      :items="items"
    />

    <!--  质保单 -->
    <MyQualitys
      v-if="items.kind === 'WARRANTY'"
      :title="items.param.title"
      :items="items"
    />
    <!-- 视频  -->
    <CustomVideo v-if="items.kind === 'VIDEO'" :items="items" />

    <!-- 优惠券  -->
    <Coupon v-if="items.kind === 'COUPON'" :items="items" />
  </block>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { ref, Ref } from 'vue';
import Router from '@/utils/router';
import Storage from '@/utils/storage';
import { getSysUi } from '@/api/server';
import { richImage } from '@/utils/util';

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

interface Props {
  types?: any;
}
const props = withDefaults(defineProps<Props>(), { types: 'WM_HOME' });

onShow(() => {
  getPageDate();
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

const bannerList: Ref<any> = ref([]);
const swiperVav: Ref<any> = ref([]);
const swiperVavHeight = ref(196);
const dataList: Ref<any> = ref({});

// const goldPrice: Ref<any> = ref([]);
// const todayGoldPriceShowed = ref(false);
// panelList
// 新轮播图
// const swiperImgList: Ref<any> = ref([]);
// 页面数据
const panelList: Ref<any> = ref([]);
// const pageBackground = ref('');
const getPageDate = async () => {
  // const result = await getWmIndex('');
  const result = await getSysUi({
    opsId: Storage.getOpsId(),
    kind: props.types,
  });
  // console.log('result', result);
  panelList.value = result.data.panelList || [];
  // pageBackground.value = result.data.param?.doOut?.style?.background ||  ''
  //
  const banner = result.data?.bannerList || [];
  dataList.value = result.data;
  bannerList.value = banner;

  // console.log('bannerList', bannerList.value);
  // console.log(result);
  uni.setNavigationBarTitle({
    // 设置顶部bar的标题
    title: result.data.param?.title,
  });

  getPanelList();
};

// const bannerIndexFun = (item: any) => {
//   const url = JSON.parse(item.url || {});
//   const code = url.code || url.systemUrl;
//   if (!code && url.appletUrl) {
//     const miniUrl = item.miniUrl || url.appletUrl;
//     Router.goNoCodePage(miniUrl);
//     return;
//   }
//   if (!code && url.h5Url) {
//     uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(url.h5Url)}` });
//     return;
//   }

//   let param = item.miniUrl?.split('?')?.[1];
//   if (param) {
//     param = `?${param}`;
//   } else {
//     param = '';
//   }
//   Router.goCodePage(url.code || url.systemUrl, param);
// };
// QUICK_NAV
const getPanelList = () => {
  const panelList = dataList.value.wmMainRspVo?.panelList;
  if (panelList) {
    const quickNav: any = panelList.filter((p: any) => p.kind === 'QUICK_NAV');
    const linkList = quickNav[0].param.linkList;
    const swiperVavList: any = [];
    for (let i = 0; i < linkList.length; i += 8) {
      swiperVavList.push(linkList.slice(i, i + 8));
    }
    if (swiperVavList.length) {
      const len = swiperVavList[0]?.length;
      const num = Number(String(len / 4)
        .split('.')[0]) + 1 || 0;
      const height = (len % 4 === 0 ? len / 4 : num) * 196;
      swiperVavHeight.value = height;
    }
    swiperVav.value = swiperVavList;
  }
};
</script>

<style lang="scss" scoped>
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
