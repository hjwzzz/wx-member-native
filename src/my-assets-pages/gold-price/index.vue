<template>
  <CustomPage background="#f7f3ed">
    <view class="gold-price" v-if="showPriceKind.doOut.fixedStyle === 0">
      <view class="banner custom-dots" v-if="bannerList?.length > 0">
        <!--  :indicator-dots="bannerList?.length > 1"
          indicator-color="#D8D9E0"
          :indicator-active-color="initBasicsData.mainColor" -->
        <swiper style="height: 326rpx" @change="swiperChange" autoplay circular>
          <swiper-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click.stop="bannerListClickImage(item)"
          >
            <image
              class="banner-image"
              style="height: 326rpx; width: 100%"
              :src="item.icoUrl"
              mode="aspectFill"
            ></image>
          </swiper-item>
        </swiper>
        <view class="custom-dots-box dots-round" v-if="bannerList.length > 1">
          <view
            class="custom-dots-show"
            v-for="(_, index) in bannerList"
            :key="index"
            :style="{
              background:
                currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
            }"
          />
        </view>
      </view>

      <view class="shop" @click="onChooseStore" v-if="goldPriceDatas?.store">
        <view class="name text-break">{{
          goldPriceDatas.store.name || goldPriceDatas.store.distName
        }}</view>
        <uni-icons type="right" color="#B7B8C4" size="18"></uni-icons>
      </view>

      <view class="price-box" v-if="goldPriceDatas?.param">
        <!--  @change="(e: any) => current = e.index" -->
        <Tabs :tabList="list" v-model:current="current" @change="setItemKey" />
        <view class="tab-bd" v-if="showTabs.length > 0">
          <view class="inner">
            <view class="item" v-for="item in showData" :key="item.brandId">
              <view class="left">
                <view class="t ttt"
                  >{{ item.met }} {{ item.metCtn || '' }}</view
                >
                <view class="b bbb">
                  {{ item.brandName ? '品牌：' + item.brandName : '' }}
                </view>
              </view>
              <view class="right">
                <view class="t">¥{{ item.price || 0 }}</view>
                <view
                  class="b"
                  v-if="goldPriceDatas.param.laborCostShowed === 'Y'"
                  >工费：¥{{ item.laborFee || item.laborPrice || 0 }}</view
                >
              </view>
            </view>
            <!-- 空 -->
            <view class="empty empty-page" v-if="!showData?.length">
              <image
                width="250rpx"
                height="250rpx"
                class="emptyIcon"
                mode="aspectFill"
                :src="`${staticUrl}img/themoney.png`"
              ></image>

              <view class="stopText">暂无金价信息</view>
            </view>
          </view>
        </view>
      </view>
      <view class="content-page" v-else>
        <view class="empty empty-page">
          <image
            width="250rpx"
            height="250rpx"
            class="emptyIcon"
            mode="aspectFill"
            :src="`${staticUrl}img/themoney.png`"
          ></image>

          <view class="stopText">暂无金价信息</view>
        </view>
      </view>
      <!-- wuyuer.png   showPriceKind.remark     showPriceKind.remarkShowed==='Y'-->

      <view class="remark-box" v-if="showPriceKind.remarkShowed === 'Y'">
        <mp-html
          v-if="showPriceKind.remark"
          :copy-link="false"
          :content="richImage(showPriceKind.remark)"
          @linktap="linktap"
        />
        <view class="content" v-else>
          <view class="empty-wrapper">
            <view class="empty"> 暂无数据 </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="showPriceKind.doOut.fixedStyle === 1">
      <view class="banner-style custom-dots" v-if="bannerList?.length > 0">
        <!--  :indicator-dots="bannerList?.length > 1"
          indicator-color="#D8D9E0"
          :indicator-active-color="initBasicsData.mainColor" -->
        <swiper style="height: 326rpx" @change="swiperChange" autoplay circular>
          <swiper-item
            v-for="(item, index) in bannerList"
            :key="index"
            @click.stop="bannerListClickImage(item)"
          >
            <image
              class="banner-image"
              style="height: 326rpx; width: 100%"
              :src="item.icoUrl"
              mode="aspectFill"
            ></image>
          </swiper-item>
        </swiper>
        <view class="custom-dots-box dots-round" v-if="bannerList.length > 1">
          <view
            class="custom-dots-show"
            v-for="(_, index) in bannerList"
            :key="index"
            :style="{
              background:
                currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
            }"
          />
        </view>
      </view>
      <view
        class="shop-style"
        @click="onChooseStore"
        v-if="goldPriceDatas?.store"
      >
        <image
          class="shop-style-image"
          :src="staticUrl + `img/icon-008.png`"
          mode="scaleToFill"
        />
        <view class="name shop-style-name text-break">
          {{ goldPriceDatas.store.name || goldPriceDatas.store.distName }}
        </view>
        <uni-icons type="right" color="#B7B8C4" size="18"></uni-icons>
      </view>
      <!--  showPriceKind.todayGoldPriceShowed==='Y'   showPriceKind.recoveryGoldPriceShowed==='Y'  -->

      <view class="show-price-box">
        <view
          class="gold-price-style3-item"
          v-if="showPriceKind.todayGoldPriceShowed === 'Y'"
        >
          <view class="gold-price-style3-item-left">
            <view class="gold-price-style3-item-left-type">
              <view class="gold-price-style3-center">
                <image
                  class="gold-price-icon-image"
                  :src="staticUrl + 'img/retrieve-price.png'"
                  mode="aspectFill"
                />
              </view>
              <view class="gold-price-style3-center">
                <text class="gold-price-style3-center-text"> 销售金价 </text>
              </view>
            </view>
          </view>
          <!-- goldPriceDatas.metalPrices      goldPriceDatas.oldmatMetalPrices -->
          <view class="gold-price-style3-item-right">
            <view
              class="gold-price-style3-item-right-info"
              v-for="(item, index) in goldPriceDatas.metalPrices"
              :key="index"
            >
              <text class="gold-price-style3-item-right-name text-break">
                {{ item.met }}{{ item.metCtn || ''
                }}{{ item.brandName ? `(${item.brandName})` : '' }}
              </text>
              <text class="gold-price-style3-item-right-price text-break">
                ¥{{ item.price || 0 }}
              </text>
            </view>

            <!-- <view class="gold-price-style3-item-right-info">
              <text class="gold-price-style3-item-right-name text-break">
                11111111111111111111111111111
              </text>
              <text class="gold-price-style3-item-right-price text-break">
                11111111 1111111111111111
              </text>
            </view> -->
          </view>
        </view>

        <view
          class="gold-price-style3-item"
          v-if="showPriceKind.recoveryGoldPriceShowed === 'Y'"
        >
          <view class="gold-price-style3-item-left">
            <view class="gold-price-style3-item-left-type">
              <view class="gold-price-style3-center">
                <image
                  class="gold-price-icon-image"
                  :src="staticUrl + 'img/sell-price.png'"
                  mode="aspectFill"
                />
              </view>
              <view class="gold-price-style3-center">
                <text class="gold-price-style3-center-text"> 回收金价 </text>
              </view>
            </view>
          </view>
          <view class="gold-price-style3-item-right">
            <view
              class="gold-price-style3-item-right-info"
              v-for="(item, index) in goldPriceDatas.oldmatMetalPrices"
              :key="index"
            >
              <text class="gold-price-style3-item-right-name text-break">
                {{ item.met }}{{ item.metCtn || ''
                }}{{ item.brandName ? `(${item.brandName})` : '' }}
              </text>
              <text class="gold-price-style3-item-right-price text-break">
                ¥{{ item.price || 0 }}
              </text>
            </view>
          </view>
        </view>

        <view class="content-page" v-if="!goldPriceDatas?.param">
          <view class="empty empty-page">
            <image
              width="250rpx"
              height="250rpx"
              class="emptyIcon"
              mode="aspectFill"
              :src="`${staticUrl}img/themoney.png`"
            ></image>

            <view class="stopText">暂无金价信息</view>
          </view>
        </view>
        <!-- wuyuer.png   showPriceKind.remark     showPriceKind.remarkShowed==='Y'-->

        <view class="remark-box" v-if="showPriceKind.remarkShowed === 'Y'">
          <mp-html
            v-if="showPriceKind.remark"
            :copy-link="false"
            :content="richImage(showPriceKind.remark)"
            @linktap="linktap"
          />
          <view class="content" v-else>
            <view class="empty-wrapper">
              <view class="empty"> 暂无数据 </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { computed, reactive, Ref, ref } from 'vue';
import { queryShareSett } from '@/api/index';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { richImage, bannerListClick, bannerListClickImage } from '@/utils/util';
import { shareHold, shareAppMessage, shareTimeline } from '@/utils/shareHold';
import { getByOpsIdAndKind } from '@/api/server';

// import {
//   // getGoldPriceAdBannerList,
//   queryDefShowGoldPrice,
//   queryGoldPriceByDist,
// } from '@/api/gold-price';
import { getDefaultDistributorInfoByOpsIdFront } from '@/api/server';
//
import {
  queryGoldPriceBannerListFront,
  getSaleMetalPrice,
} from '@/my-assets-pages/api/gold-price';
import Router from '@/utils/router';
import { staticUrl } from '@/utils/config';
import Tabs from '@/components/Tabs/index.vue';

import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

onLoad((e: any) => {
  // console.log('onLoad((e: any) ', e);
  isShare();
  // getBannerList();
  getGoldPrice(e.distId);
  getPriceKind();
});
const bannerList: Ref<any[]> = ref([]);
const list = ref<any[]>([]);
const goldPriceDatas = ref<any>({});
const current = ref(0);

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};

const showPriceKind: any = reactive({
  defaultShow: 'AUTO',
  doOut: { style: {}, images: [], fixedStyle: 0 },
  laborCostShowed: 'Y',
  memberView: 'ALL',
  recoveryGoldPriceShowed: 'Y',
  remark: '<p>321321321</p>',
  remarkShowed: 'N',
  todayGoldPriceShowed: 'Y',
});

//  showPriceKind.todayGoldPriceShowed==='Y'   showPriceKind.recoveryGoldPriceShowed==='Y'

//

// 会员可查看 memberView     value="BELONG">归属门店  value="ALL">全部门店金价<
// 默认展示 defaultShow   value="BELONG">归属门       value="AUTO">系统自动
// 今日金 todayGoldPriceShowed     "Y">展示  value="N">隐藏
// 回收金 recoveryGoldPriceShowed  value="Y">展示   value="N">隐藏
// 工费展示  laborCostShowed  ="Y">展示  ue="N">隐藏
// 备注说明"   value="Y">展示   n value="N">隐藏</a

// getByOpsIdAndKind     images
const getPriceKind = async () => {
  const { data } = await getByOpsIdAndKind('WM_GPRICE');
  if (data?.param?.doOut?.images) {
    bannerList.value = data.param.doOut.images || [];
    Object.assign(showPriceKind, data.param);
    list.value = [];
    if (data.param) {
      if (data.param.todayGoldPriceShowed === 'Y') {
        list.value.push({ name: '今日金价', key: 'metalPrices' });
      }
      if (data.param.recoveryGoldPriceShowed === 'Y') {
        list.value.push({ name: '回收金价', key: 'oldmatMetalPrices' });
      }
      if (list.value.length) {
        showText.value = list.value[0].key;
      }
    }
  } else {
    oldData();
    getBannerList();
  }
  showPriceKind.doOut ??= {};
  showPriceKind.doOut.fixedStyle ??= 0;
};

const oldData = () => {
  setTimeout(() => {
    const data = goldPriceDatas.value;
    if (data.param) {
      if (data.param.todayGoldPriceShowed === 'Y') {
        list.value.push({ name: '今日金价', key: 'metalPrices' });
      }
      if (data.param.recoveryGoldPriceShowed === 'Y') {
        list.value.push({ name: '回收金价', key: 'oldmatMetalPrices' });
      }
      if (list.value.length) {
        showText.value = list.value[0].key;
      }
    }
  }, 1000);
};

// const bannerClick = (item: any) => {

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
//   Router.goCodePage(code, param);
// };
const onChooseStore = () => {
  uni.$once('chooseStore', e => getGoldPrice(e.distId));
  Router.goCodePage('chooseStore', 't=gold_price');
};

const linktap = (e: any) => {
  uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(e.href)}` });
};

// const richImage = (e: any) => {
//   const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
//   const content = e.replace(reg, '<img style="max-width: 100%;" src="$1" />');
//   return content;
// };
// const shareObj: any = {};
// const defaultObj: any = {};
// 'brandOldPrice' : 'brandPrice'
// metalPrices  oldmatMetalPrices

const showText = ref('metalPrices');
const showTabs = computed(() => list.value.map(i => i.name));
const showData = computed(() => goldPriceDatas.value[showText.value]);

const getBannerList = async () => {
  const res = await queryGoldPriceBannerListFront('');
  const oldImage = res.data.map((item: any) => ({
    icoUrl: item.imgUrl,
    title: '',
    h5Url: item.h5Url,
    miniUrl: item.miniUrl,
    url: item.url,
  }));
  bannerList.value = oldImage;
};

const setItemKey = ({ item }: any) => {
  showText.value = item.key;
  // showText.value
};

// const getDefaultOpsId = async () => {
//   const res = await getDefaultDistributorInfoByOpsIdFront('');
//   const distId = res.data.distId;
//   if (distId) {
//     getGoldPrice(distId);
//   }
//   console.log('getDefaultDistributorInfoByOpsIdFront', ddd.data.distId);
// };

const getGoldPrice = async (id = '') => {
  // console.log('getGoldPrice id=', id);
  let distId = id;
  if (!distId || distId === 'undefined') {
    const res = await getDefaultDistributorInfoByOpsIdFront('');
    distId = res.data.distId;
  }
  // console.log('getGoldPrice distId=', distId);
  // queryDefShowGoldPrice,
  // queryGoldPriceByDist,
  // const url = id ? queryGoldPriceByDist : queryDefShowGoldPrice;
  // const { code, data } = await url({ distId: id });
  const { code, data } = await getSaleMetalPrice({ distId });

  if (code === 0) {
    // list.value = [];
    goldPriceDatas.value = data;
    // if (data.param) {
    //   if (data.param.todayGoldPriceShowed === 'Y') {
    //     list.value.push({ name: '今日金价', key: 'metalPrices' });
    //   }
    //   if (data.param.recoveryGoldPriceShowed === 'Y') {
    //     list.value.push({ name: '回收金价', key: 'oldmatMetalPrices' });
    //   }
    //   if (list.value.length) {
    //     showText.value = list.value[0].key;
    //   }
    // }
  }
};

const shareData: Ref<any> = ref([]);
const isShare = async () => {
  const res = await queryShareSett({ pageName: 'WM_TODAY_GOLD_PRICE' });
  // 控住分享
  shareHold(res.data);
  shareData.value = {
    title: '金千枝今日金价',
    path: '/my-assets-pages/gold-price/index',
    shareObj: res.data,
  };
};
onShareAppMessage(() => shareAppMessage(shareData.value));
onShareTimeline(() => shareTimeline(shareData.value));
</script>

<style scoped lang="scss">
.banner {
  position: unset;
  border-radius: 16rpx;
  overflow: hidden;
}
.shop-style-image {
  width: 48rpx;
  height: 48rpx;
  flex-shrink: 0;
  margin-right: 20rpx;
}
.banner-style {
}
.shop {
  margin: 30rpx 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  height: 98rpx;
  align-items: center;
  padding: 0 30rpx;
  border-radius: 16rpx;
  .name {
    font-size: 28rpx;
    font-weight: 400;
    color: #323338;
  }
}

.shop-style-name {
  width: 100%;
}
.custom-dots {
  position: relative;
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

.content-page {
  height: 60vh;
  display: flex;
  align-items: center;
}
.ttt {
  width: calc(100vw - 350rpx);
  text-overflow: -o-ellipsis-lastlist;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bbb {
  width: calc(100vw - 350rpx);
  text-overflow: -o-ellipsis-lastlist;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.gold-price {
  padding: 30rpx;
}

// .gold-price-style {
//   background: #f5f5f5;
// }
.shop-style {
  // margin: 30rpx 0;
  // border-top-left-radius: 40rpx;
  // border-top-right-radius: 40rpx;
  margin-left: 30rpx;
  margin-right: 30rpx;
  margin-top: 30rpx;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  height: 98rpx;
  align-items: center;
  padding: 0 30rpx;
  // width: 80vw;
  border-radius: 20rpx;
  z-index: 999;
  .name {
    font-size: 28rpx;
    font-weight: 400;
    color: #323338;
  }
}

.empty-page {
  min-height: 410rpx;
}

.show-price-box {
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.price-box {
  background: #ffffff;
  margin: 30rpx 0;
  border-radius: 16rpx;

  .tab-hd {
    margin-top: -68rpx;
    display: flex;
    justify-content: space-around;
    .item {
      position: relative;
      font-size: 28rpx;
      font-weight: 400;
      color: #9697a2;
      padding: 30rpx 0;
      &.active {
        color: #323338;
        font-weight: 500;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 74rpx;
          height: 6rpx;
          background: #ff547b;
          border-radius: 3rpx;
        }
      }
    }
  }
  .tab-bd {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      border-top: 1px solid #ebedf0;
      .left {
        .t {
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          line-height: 40rpx;
        }
      }
      .right {
        text-align: right;
        .t {
          font-size: 28rpx;
          font-weight: 800;
          color: var(--main-color);
        }
      }
      .b {
        font-size: 24rpx;
        font-weight: 400;
        color: #9697a2;
        margin-top: 10rpx;
      }
    }
  }
}
.empty {
  margin: 0 auto;
  padding: 80rpx 0;
  text-align: center;
  color: #9697a2;
  font-size: 28rpx;
  font-weight: 400;
  width: 250rpx;
}
.remark-box {
  background: #ffffff;
  margin: 30rpx 0;
  padding: 30rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #646771;
  .empty-wrapper {
    .empty {
      text-align: center;
      padding: 50rpx 0;
      font-size: 28rpx;
      color: #9697a2;
    }
  }
}
.emptyIcon {
  width: 250rpx;
  height: 250rpx;
}

.gold-price-style3-item {
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  margin-top: 25rpx;
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  padding-right: 30rpx;
  padding-left: 30rpx;
  // border-bottom: 1rpx solid #ebebeb;
}
// .gold-price-style3-item:last-child {
//   border-bottom: 0rpx solid white;
//   padding-bottom: 5rpx;
// }
.gold-price-style3-item-left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150rpx;
  color: #c1a975;
  flex-shrink: 0;
  // background-color: red;
  .gold-price-icon-image {
    height: 72rpx;
    width: 72rpx;
  }

  .gold-price-style3-item-left-type {
    width: 150rpx;
  }
  .gold-price-style3-center {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
  }
  .gold-price-style3-center-text {
    margin-top: 10rpx;
  }
}
.gold-price-style3-item-right {
  flex-grow: 1;
  .gold-price-style3-item-right-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70rpx;
  }
  .gold-price-style3-item-right-name {
    font-size: 14px;
    font-weight: 400;
    color: #646771;
    width: 280rpx;
  }
  .gold-price-style3-item-right-price {
    font-size: 32rpx;
    font-weight: 700;
    color: #dbb866;
    width: 180rpx;
  }
  // background-color: rgb(186, 186, 186);
}
</style>
