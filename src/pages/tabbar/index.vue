<template>
  <page-meta
    :page-style="
      'overflow:' +
      (maskPopup && newBannerList.length > 0 ? 'hidden' : 'visible')
    "
  ></page-meta>
  <CustomPage :backgroundColor="pageBackground" bottom>
    <!--  background: `url( ${showToImageBG} ) center top / 100% auto no-repeat`, -->
    <view
      class="page-top-show"
      :style="{
        background: showToImageBG
          ? `url( ${showToImageBG} ) center top / 100% auto no-repeat`
          : pageBackground,
        paddingTop: headHeight + 'rpx',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
    </view>
    <view
      class="page-top-title"
      :style="{
        top: menuInfoTopShow + 'px',
        height: menuInfoHeightShow + 'px',
      }"
    >
      <text class="page-top-title-text text-break">
        {{ pageTitle }}
      </text>
    </view>
    <CustomFitUp types="WM_HOME" />
  </CustomPage>
  <Tabbar code="wm_index"> </Tabbar>

  <!--   :indicator-dots="newBannerList.length > 1"
            indicator-color="#D8D9E0"
            :indicator-active-color="initBasicsData.mainColor" -->
  <view class="home-mask" v-if="maskPopup && newBannerList.length > 0">
    <view class="home-alert">
      <view class="alert-img">
        <view class="alert-box">
          <view class="custom-dots">
            <swiper
              :style="{ height: '680rpx' }"
              circular
              autoplay
              :interval="5000"
              @change="swiperChange"
            >
              <swiper-item
                class="swiper-item"
                v-for="(item, index) in newBannerList"
                :key="index"
              >
                <image
                  :style="{ borderRadius: newBanneRadius }"
                  class="alert-box-image"
                  @click="bannerListClickImage(item)"
                  :src="item.icoUrl"
                  mode="aspectFit"
                ></image>
              </swiper-item>
            </swiper>
            <view
              class="custom-dots-box dots-round"
              v-if="newBannerList.length > 1"
            >
              <view
                class="custom-dots-show"
                v-for="(_, index) in newBannerList"
                :key="index"
                :style="{
                  background:
                    currentIndex === index
                      ? initBasicsData.mainColor
                      : '#bdbdbd',
                }"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="alert-icon" @click.stop="maskPopup = false">
        <image
          class="image"
          :src="staticUrl + 'img/home-close.png'"
          mode="aspectFill"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import {
  onShareTimeline,
  onShareAppMessage,
  onShow,
  onLoad,
  // onReady,
} from '@dcloudio/uni-app';
// import { queryGoldPriceByPage } from '@/api/server';
import { queryShareSett } from '@/api/index';
import { queryWeMemberAlertBannerListFront } from '@/pages/api/server';
// import { getByOpsIdAndKind } from '@/api/server';
// import Router from '@/utils/router';
import { queryPopupByType } from '@/pages/api/index';
// import Storage from '@/utils/storage';
import CustomFitUp from '../component/CustomFitUp/index.vue';
import { getByOpsIdAndKind } from '@/api/server';
import Tabbar from '@/components/Tabbar/index.vue';
// import Router from '@/utils/router';
import { staticUrl } from '@/utils/config';
import { bannerListClickImage } from '@/utils/util';
import { shareHold, shareAppMessage, shareTimeline } from '@/utils/shareHold';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
// const mainColor = initBasicsData.mainColor;
// onMounted(() => {
// });
// onReady(() => {});
// onLoad(() => {});

onShow(() => {
  uni.getSystemInfo({
    success: res => {
      const rr = uni.getMenuButtonBoundingClientRect();
      const menuInfoTop = rr.top;
      const menuInfoBottom = rr.bottom;
      menuInfoTopShow.value = menuInfoTop;
      menuInfoHeightShow.value = rr.height;

      const showHeight =
        Number(menuInfoTop) +
        Number(menuInfoBottom) -
        Number(res.statusBarHeight) +
        10;
      headHeight.value = showHeight * 2;
    },
  });

  getPageDate();
  // getAdBannerList();
  // getGoldPriceByPage();
  // getWmAlertAdBannerListFun();
  getShareSet();
});

const pageTitle = ref('首页');
const headHeight: Ref<number> = ref(100);
const menuInfoTopShow: Ref<number> = ref(0);
const menuInfoHeightShow: Ref<number> = ref(0);
// const deFImage1 = 'https://static.jqzplat.com/wx_%20applet/img/bg-img-002.png';
const showToImageBG = ref('');
const newBannerList: any = ref([]);
const newBanneRadius = ref('0px');
const pageBackground = ref('#f5f5f5');
const getPageDate = async () => {
  // console.log('WM_HOMEWM_HOMEWM_HOMEWM_HOME');
  const { data } = await getByOpsIdAndKind('WM_HOME');
  const { param, panelList } = data;
  pageBackground.value = param?.doOut?.special?.backgroundColor || '#f5f5f5';
  showToImageBG.value = param?.doOut?.special?.backgroundImage || '';
  pageTitle.value = data?.param?.title || '首页';

  //  获取基本信息
  const getMenber = (item: { kind: string }) => item.kind === 'POP_IMAGE';
  const memberCardInfo = panelList.find(getMenber) || {};
  if (memberCardInfo.visible === 'N') {
    return;
  }
  if (
    !memberCardInfo.param ||
    memberCardInfo.param?.doOut?.images?.length === 0
  ) {
    getWmAlertAdBannerListFun();
    return;
  }
  const { style, special } = memberCardInfo.param?.doOut || {};
  newBanneRadius.value = style?.borderRadius || '0rpx';
  const everyDay = special.everyDay ? 'Y' : 'N';
  queryPopupFun(everyDay);
  // console.log('POP_IMAGEmemberCardInfo2', memberCardInfo);
  let image: any = [];
  if (memberCardInfo.param.doOut.images) {
    image = memberCardInfo.param.doOut.images.filter((item: any) => item.showed);
  }
  newBannerList.value = image;
  // console.log('POP_IMAGE', image);
};

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};

// icoUrl  showed   special: {everyDay: false} special: {everyDay: true}   visible
// 设置广告弹窗
// frequency: 弹窗频率 0:每日仅弹出一次 1:每次进入页面弹出
// isOpen: 是否开启弹窗 Y:开启 N:关闭
// const floatAdsPopup: Ref<any> = ref([]);
const maskPopup = ref(false);
const queryPopupFun = async (isOnce: any) => {
  let popupTime = uni.getStorageSync('popupTime');
  if (popupTime === '' || popupTime === null) {
    const num = Math.floor(Math.random() * 10000 + 1);
    popupTime = `${new Date()
      .getTime()}-${num}`;
    uni.setStorageSync('popupTime', popupTime);
  }
  // queryPopupByType queryPopup
  const res = await queryPopupByType({ param: popupTime, isOnce });
  const { isOpen } = res.data;
  maskPopup.value = false;
  if (isOpen === 'Y') {
    maskPopup.value = true;
  }
};
// 弹窗广告图
const getWmAlertAdBannerListFun = async () => {
  const res = await queryWeMemberAlertBannerListFront('');
  // const floatAds = res?.data?.splice(0, 3) || [];
  // newBannerList.value  floatAdsPopup.value
  const floatAds = res?.data || [];
  newBannerList.value = floatAds.map((item: any) => ({
    ...item,
    icoUrl: item.icoUrl,
    title: item.name,
    url: item.url,
  }));
};

// const shareObj: Ref<any> = ref({});
const shareData: Ref<any> = ref([]);
const getShareSet = async () => {
  const res = await queryShareSett({ pageName: 'WM_INDEX' });
  // 控住分享
  shareHold(res.data);
  shareData.value = {
    title: '首页',
    path: '/pages/tabbar/index',
    shareObj: res.data,
  };
};
onShareAppMessage(() => shareAppMessage(shareData.value));
onShareTimeline(() => shareTimeline(shareData.value));
</script>

<style lang="scss" scoped>
.page-top-show {
  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-bottom: 30rpx;
  width: calc(100vw - 60rpx);
  min-height: 330rpx;
  // background: linear-gradient(180deg, #f5debb, #f4f5f7);
  background-repeat: no-repeat;
  // background-size: 100% 100%;
  // position: absolute;
  // left: 0px;
  // right: 0px;
  // z-index: 0;
  // .page-top-title {
  //   position: absolute;
  //   left: 0px;
  //   right: 0px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   font-size: 28rpx;
  //   font-weight: 500;
  //   color: #000000;
  // }
}

.custom-dots {
  position: relative;
  // padding-top: 30rpx;
  // padding-bottom: 50rpx;
  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 18rpx;
    left: 0rpx;
    right: 0rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-dots-show {
    border-radius: 6rpx;
    margin-left: 5rpx;
    margin-right: 5rpx;
  }
  .dots-round {
    z-index: 200px;
    .custom-dots-show {
      width: 24rpx;
      height: 6rpx;
    }
  }
}

.page-top-title {
  position: absolute;
  left: 0px;
  right: 0px;
  display: flex;
  padding-left: 30rpx;
  padding-right: 30rpx;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-weight: 700;
  color: #000000;
  .page-top-title-text {
    text-align: center;
    width: 350rpx;
  }
}
.home-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .home-alert {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .alert-img {
    width: 560rpx;
    height: 680rpx;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alert-box {
    flex: 1;
    .alert-box-image {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
  }
  .alert-icon {
    width: 80rpx;
    height: 80rpx;
    margin-top: 40rpx;
  }
  .alert-icon .image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
