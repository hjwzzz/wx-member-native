<template>
  <!--#949494 pageBackground-->

  <CustomPage :background="'#949494'" bottom>
    <!-- <view
      class="banner-show-background"
      :style="{
        marginBottom: bannerList?.length > 0 ? '54rpx' : '30rpx',
      }"
    >
     <view
        class="back-img"
        :style="{
          background: topBgImageUrl,
        }"
      >
      </view>
     <view class="banner">
        <swiper
          style="height: 300rpx"
          :indicator-dots="bannerList.length > 1"
          indicator-color="#D8D9E0"
          :indicator-active-color="initBasicsData.mainColor"
          autoplay
          circular
        >
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item
              class="swiper-item"
              @click.stop="bannerListClick(item)"
            >
              <image
                class=""
                style="height: 300rpx"
                :src="item.imgUrl"
                mode="aspectFill"
              ></image>
            </swiper-item>
          </block>
        </swiper>
      </view>
  </view> -->
    <CustomFitUp types="WM_HOME" />

    <!-- <view class="customer-diy">
      <block v-for="(items, index) in panelList" :key="index"> -->
    <!--  -->
    <!-- 提示    -->
    <!-- <view v-if="items.kind === 'NOTICE'"> </view> -->
    <!-- <view
          class="bulletin"
          v-if="items.kind === 'NOTICE'"
          @click="goMoreNotice(items.param, items.updateTime)"
        >
          <view class="bulletin-box">
            <text class="iconfont icon-gonggao icon-text"> </text>
            <text class="bulletin-text">{{ items.param.title }}</text>
          </view>
          <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
        </view> -->
    <!-- 广告图 -->
    <!-- <view
          class="ad-banner-list"
          v-else-if="items.kind === 'BANNER' && adBannerList.length"
        >
          <swiper
            style="height: 180rpx"
            class="banner"
            :indicator-dots="adBannerList.length > 1"
            indicator-color="#D8D9E0"
            :indicator-active-color="initBasicsData.mainColor"
            autoplay
            circular
          >
            <block v-for="(item, index) in adBannerList" :key="index">
              <swiper-item class="swiper-item">
                <image
                  @click="bannerListClick(item)"
                  class="image"
                  style="height: 180rpx"
                  :src="item.image"
                  mode="aspectFill"
                ></image>
              </swiper-item>
            </block>
          </swiper>
        </view> -->
    <!-- 快捷导航 -->
    <!--
        <view v-else-if="items.kind === 'QUICK_NAV' && swiperVav.length">

          <view class="quick-nav">
            <swiper
              :style="{ height: swiperVavHeight + 'rpx' }"
              class=""
              :indicator-dots="swiperVav.length > 1"
              indicator-color="#D8D9E0"
              :indicator-active-color="initBasicsData.mainColor"
              circular
            >
              <swiper-item
                class="swiper-item"
                v-for="(navs, index) in swiperVav"
                :key="index"
              >
                <view
                  class="item-shop"
                  v-for="(item, index) in navs"
                  :key="index"
                  @click="handleEntryUrl(item)"
                >
                  <view class="item-header">
                    <image
                      class="item-header-image"
                      :src="
                        item.icoUrl || `${staticUrl}img/item-avatar-default.png`
                      "
                      mode=""
                    ></image>
                  </view>
                  <view class="item-text">{{ item.title }}</view>
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view> -->
    <!-- 富文本 -->
    <!-- <view class="des-html" v-else-if="items.kind === 'RICH_TEXT'">
          <mp-html
            v-if="items.param.content"
            :copy-link="false"
            :content="richImage(items.param.content)"
            @linktap="linktap"
          />
          <NoneData v-else> </NoneData>
        </view> -->
    <!-- 今日金价 -->
    <!-- <TodayGoldPrice
          v-else-if="items.kind === 'GOLD_PRICE'"
          :title="items.param.title"
          type="WM_HOME"
        ></TodayGoldPrice> -->
    <!-- 积分商城推荐  -->
    <!-- <ContentMall
          v-else-if="items.kind === 'REC_GIFTS'"
          :title="items.param.title"
        ></ContentMall> -->
    <!--  -->
    <!-- </block>
    </view> -->
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
import { getByOpsIdAndKind } from '@/api/server';
import Router from '@/utils/router';
import {
  // getWmIndex,
  queryHomBannerListFront,
  queryPopup,
} from '@/pages/api/index';
import Storage from '@/utils/storage';
// CustomFitUp
import CustomFitUp from '../component/CustomFitUp/index.vue';

// import ContentMall from '../component/ContentMall.vue';
// import Rotation from '../component/Rotation.vue';
// import MyQualitys from '../component/MyQualitys.vue';
// import TodayGoldPrices from '../component/TodayGoldPrices.vue';
// import Coupon from '../component/Coupon.vue';

// import NearbyStore from '../component/NearbyStore.vue';
// import CustomImage from '../component/CustomImage.vue';

// import NoticeBar from '../component/NoticeBar.vue';
// import CutView from '../component/CutView.vue';
// import MyService from '../component/MyService.vue';
// import MyPrizes from '../component/MyPrizes.vue';
// import Title from '../component/Title.vue';
// import CustomText from '../component/CustomText.vue';
// import CustomVideo from '../component/CustomVideo.vue';
// import CustomQuick from '../component/CustomQuick.vue';

import Tabbar from '@/components/Tabbar/index.vue';
// import Router from '@/utils/router';
import { staticUrl } from '@/utils/config';
import { richImage, bannerListClick, handleEntryUrl } from '@/utils/util';
import { shareHold, shareAppMessage, shareTimeline } from '@/utils/shareHold';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
// const mainColor = initBasicsData.mainColor;
// onMounted(() => {
// });

// const getSysUiInfo = async () => {
//   const aw = await getSysUi({ opsId: Storage.getOpsId(), kind: 'WM_MAIN' });
//   console.log('getSysUiInfo', aw);
// };

onLoad(() => {
  queryPopupFun();
});
onShow(() => {
  getPageDate();
  getAdBannerList();
  // getGoldPriceByPage();
  getWmAlertAdBannerListFun();
  getShareSet();
});

const linktap = (e: any) => {
  uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(e.href)}` });
};

const handleMyPrizes = (index: number) => {
  Router.goCodePage('my_prize', `?tab=${index}`);
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

const bannerList: Ref<any> = ref([]);
const swiperVav: Ref<any> = ref([]);
const swiperVavHeight = ref(196);
const dataList: Ref<any> = ref({});
const adBannerList: Ref<any> = ref([]);
// const goldPrice: Ref<any> = ref([]);
// const todayGoldPriceShowed = ref(false);
// panelList
// 新轮播图
// const swiperImgList: Ref<any> = ref([]);
// 页面数据
const panelList: Ref<any> = ref([]);
const pageBackground = ref('');
const getPageDate = async () => {
  // const result = await getWmIndex('');
  const result = await getByOpsIdAndKind({
    opsId: Storage.getOpsId(),
    kind: 'WM_HOME',
  });
  console.log('result', result);
  panelList.value = result.data.panelList || [];
  pageBackground.value = result.data.param.doOut.style.background;
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

// 获取今日金价  type="WM_HOME"
// const getGoldPriceByPage = async () => {
//   if (!initBasicsData.checkLogin) {
//     return;
//   }
//   const res = await queryGoldPriceByPage('WM_HOME');
//   if (res.code === 0 && res.data) {
//     const { branPriceList, param, uiParam: todayGoldPrice } = res.data;
//     // this.uiParam = uiParam;
//     const { showNum } = param;
//     const result: any = [];

//     branPriceList.map((item: unknown, index: number) => {
//       if (index < showNum) {
//         result.push(item);
//       }
//     });
//     todayGoldPriceShowed.value = todayGoldPrice.todayGoldPriceShowed === 'Y';
//     goldPrice.value = result;

//   }
// };

// const richImage = (item: string) => {
//   const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
//   const content = item.replace(
//     reg,
//     '<img style="max-width: 100%;" src="$1" />'
//   );
//   return content;
// };

const topBgImageUrl = computed(() => {
  const imageUrl = dataList.value.wmMainRspVo?.param?.topBgImageUrl;
  if (imageUrl) {
    return `url(${imageUrl}) center top / 100% auto no-repeat`;
  }
  return 'linear-gradient(121deg, #fff0eb 0%, #dce2fb 100%)';
});

// const handleEntryUrl = (item: any) => {
//   if (!item.code && item.miniUrl) {
//     Router.goNoCodePage(item.miniUrl);
//     return;
//   }
//   if (!item.code && item.h5Url) {
//     uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.h5Url)}` });
//     return;
//   }

//   let param = item.miniUrl?.split('?')?.[1];
//   if (param) {
//     param = `?${param}`;
//   } else {
//     param = '';
//   }
//   Router.goCodePage(item.code, param);
// };

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
  const floatAds = res?.data?.splice(0, 3) || [];
  floatAdsPopup.value = floatAds.map((item: any) => ({
    image: item.imgUrl,
    title: item.name,
    url: item.url,
  }));
};

// // 更多
// const goMoreNotice = (item: any, noticTime: any) => {
//   uni.setStorageSync('notic', item);
//   uni.setStorageSync('noticTime', noticTime);
//   uni.navigateTo({ url: '/my-assets-pages/notice/index' });
// };
</script>

<style lang="scss" scoped>
.banner-show-background {
  position: relative;
  height: 306rpx;

  .back-img {
    width: 750rpx;
    height: 256rpx;
  }

  .banner {
    position: absolute;
    top: 30rpx;
    left: 30rpx;
    width: 690rpx;
    height: 300rpx;
    border-radius: 16rpx;
    overflow: hidden;
    image {
      width: 100%;
      border-radius: 10rpx;
    }
  }
}

.customer-diy {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 60rpx);
  // margin: 0 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;

  .iconfont {
    margin-right: 10px;
    font-size: 16px;
    color: var(--main-color);
  }

  .ad-banner-list {
    width: 100%;
    height: 180rpx;
    margin-bottom: 30rpx;
    // background-color: #323338;
    border-radius: 16rpx;
    overflow: hidden;

    .image {
      width: 100%;
      border-radius: 10rpx;
    }

    .swiper-item {
      overflow: hidden;
      border-radius: 10rpx;
    }
  }

  .quick-nav {
    // width: 100%;
    padding: 50rpx 20rpx 20rpx;
    margin-bottom: 30rpx;
    background: #fff;
    border-radius: 16rpx;

    .item-shop {
      display: inline-block;
      width: 162rpx;
      margin-bottom: 30rpx;
      text-align: center;
    }

    .item-header {
      display: inline-block;
      width: 88rpx;
      height: 88rpx;
      border-radius: 22rpx;
    }

    .item-header-image {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .item-text {
      height: 34rpx;
      margin-top: 16rpx;
      margin-bottom: 25rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      color: #323338;
    }

    .swiper-item {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .des-html {
    width: 630rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #646771;
    background: #fff;
    border-radius: 16rpx;
  }

  .des-html img {
    width: 50%;
  }
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

.bulletin {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 72rpx;
  margin-bottom: 30rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 72rpx;
  color: #323338;
  background: #fff;
  border-radius: 16rpx;
}

.bulletin-box {
  width: 550rpx;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bulletin-text {
  font-size: 24rpx;
  color: #323338;
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
