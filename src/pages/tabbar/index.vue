<template>
  <CustomPage :background="'#949494'" bottom>
    <CustomFitUp types="WM_HOME" />
  </CustomPage>
  <Tabbar code="wm_index"> </Tabbar>

  <view class="home-mask" v-if="maskPopup && floatAdsPopup.length > 0">
    <view class="home-alert">
      <view class="alert-img">
        <view class="alert-box">
          <swiper
            :style="{ height: '680rpx' }"
            class=""
            :indicator-dots="floatAdsPopup.length > 1"
            indicator-color="#D8D9E0"
            :indicator-active-color="initBasicsData.mainColor"
            circular
            autoplay
          >
            <swiper-item
              class="swiper-item"
              v-for="(item, index) in floatAdsPopup"
              :key="index"
            >
              <image
                class="alert-box-image"
                @click="bannerListClick(item)"
                :src="item.image"
                mode="aspectFit"
              ></image>
            </swiper-item>
          </swiper>
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
import { ref, Ref, computed } from 'vue';
import {
  onShareTimeline,
  onShareAppMessage,
  onShow,
  onLoad,
} from '@dcloudio/uni-app';
// import { queryGoldPriceByPage } from '@/api/server';
import { queryShareSett } from '@/api/index';
import { queryWeMemberAlertBannerListFront } from '@/pages/api/server';
import { getSysUi } from '@/api/server';
import Router from '@/utils/router';
import {
  // getWmIndex,
  queryHomBannerListFront,
  queryPopup,
} from '@/pages/api/index';
import Storage from '@/utils/storage';
import CustomFitUp from '../component/CustomFitUp/index.vue';

import Tabbar from '@/components/Tabbar/index.vue';
// import Router from '@/utils/router';
import { staticUrl } from '@/utils/config';
import { bannerListClick } from '@/utils/util';
import { shareHold, shareAppMessage, shareTimeline } from '@/utils/shareHold';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
// const mainColor = initBasicsData.mainColor;
// onMounted(() => {
// });

onLoad(() => {
  queryPopupFun();
});
onShow(() => {
  // getPageDate();
  getAdBannerList();
  // getGoldPriceByPage();
  getWmAlertAdBannerListFun();
  getShareSet();
});

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

const adBannerList: Ref<any> = ref([]);

// 获取广告
const getAdBannerList = async () => {
  const result = await queryHomBannerListFront('');
  if (result?.data && result?.data.length) {
    const list =
      result?.data.map((item: any) => ({
        image: item.imgUrl,
        title: item.title,
        url: item.url,
      })) || [];
    // console.log('listadBannerLitadBannerList', adBannerList.value);
    adBannerList.value = list;
  }
};
// 设置广告弹窗
// frequency: 弹窗频率 0:每日仅弹出一次 1:每次进入页面弹出
// isOpen: 是否开启弹窗 Y:开启 N:关闭
const floatAdsPopup: Ref<any> = ref([]);
const maskPopup = ref(false);
const queryPopupFun = async () => {
  let popupTime = uni.getStorageSync('popupTime');
  if (popupTime === '' || popupTime === null) {
    const num = Math.floor(Math.random() * 10000 + 1);
    popupTime = `${new Date()
      .getTime()}-${num}`;
    uni.setStorageSync('popupTime', popupTime);
  }
  const res = await queryPopup(popupTime);
  const { isOpen, isShowed } = res.data;
  maskPopup.value = false;
  if (isOpen === 'Y' && isShowed !== 'Y') {
    maskPopup.value = true;
  }
};
// 弹窗广告图
const getWmAlertAdBannerListFun = async () => {
  const res = await queryWeMemberAlertBannerListFront('');
  const floatAds = res?.data.splice(0, 3) || [];
  floatAdsPopup.value = floatAds.map((item: any) => ({
    image: item.imgUrl,
    title: item.name,
    url: item.url,
  }));
};
</script>

<style lang="scss" scoped>
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
