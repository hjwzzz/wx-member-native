<template>
  <CustomPage>
    <view class="gold-price">
      <view class="banner" v-if="bannerList.length > 0">
        <swiper
          style="height: 300rpx"
          :indicator-dots="bannerList.length > 1"
          indicator-color="#D8D9E0"
          indicator-active-color="#FF547B"
          autoplay
        >
          <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item @click.stop="bannerClick(item)">
              <image
                class=""
                style="height: 300rpx; width: 690rpx"
                :src="item.imgUrl"
                mode="aspectFill"
              ></image>
            </swiper-item>
          </block>
        </swiper>
      </view>

      <view class="shop" @click="onChooseStore" v-if="goldPriceDatas?.store">
        <view class="name">{{ goldPriceDatas.store.storeName || '--' }}</view>
        <uni-icons type="right" color="#B7B8C4" size="18"></uni-icons>
      </view>

      <view class="price-box" v-if="goldPriceDatas?.param">
        <Tabs
          :tabList="list"
          v-model:current="current"
          @change="(e: any) => current = e.index"
        />

        <view class="tab-bd" v-if="showTabs.length > 1">
          <view class="inner">
            <view class="item" v-for="item in showData" :key="item.brandId">
              <view class="left">
                <view class="t ttt"
                  >{{ item.met }} {{ item.metCtn || '' }}</view
                >
                <view class="b bbb">
                  {{ item.brandName ? '品牌：' : '' }}
                  {{ item.brandName || '' }}</view
                >
              </view>
              <view class="right">
                <view class="t mC">¥{{ item.price }}</view>
                <view
                  class="b"
                  v-if="goldPriceDatas.param.laborCostShowed === 'Y'"
                  >工费：¥{{ item.laborFee || item.laborPrice }}</view
                >
              </view>
            </view>
            <!-- 空 -->
            <view class="empty empty-page" v-if="!showData.length">
              <image
                width="250rpx"
                height="250rpx"
                class="emptyIcon"
                mode="aspectFill"
                :src="`${staticUrl}/img/themoney.png`"
              ></image>

              <view class="stopText">暂无金价信息</view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="remark-box"
        v-if="goldPriceDatas?.param?.remarkShowed === 'Y'"
      >
        <view
          v-if="goldPriceDatas.param.remark"
          v-html="richImage(goldPriceDatas.param.remark)"
        ></view>
        <view class="content" v-else>
          <view class="empty-wrapper">
            <view class="empty"> 暂无数据 </view>
          </view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { queryShareSett } from '@/api/index';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { richImage } from '@/utils/util';
import { shareHold, shareAppMessage, shareTimeline } from '@/utils/shareHold';

import {
  // getGoldPriceAdBannerList,
  queryDefShowGoldPrice,
  queryGoldPriceByDist,
} from '@/api/gold-price';
import {
  queryGoldPriceBannerListFront,
  getSaleMetalPrice,
} from '@/my-assets-pages/api/gold-price';

import router from '@/utils/router';
import { staticUrl } from '@/utils/config';
import Tabs from '@/components/Tabs/index.vue';

onLoad((e: any) => {
  console.log('onLoad((e: any) ', e);
  isShare();
  getBannerList();
  getGoldPrice(e.distId);
});
const bannerList: Ref<any[]> = ref([]);
const list = ref<any[]>([]);
const goldPriceDatas = ref<any>({});
const current = ref(0);

const bannerClick = (item: any) => {
  const url = JSON.parse(item.url || {});
  router.goCodePage(url.code || url.systemUrl);
};
const onChooseStore = () => {
  uni.$once('chooseStore', e => getGoldPrice(e.distId));
  router.goCodePage('storeInfo');
};

// const richImage = (e: any) => {
//   const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
//   const content = e.replace(reg, '<img style="max-width: 100%;" src="$1" />');
//   return content;
// };
// const shareObj: any = {};
// const defaultObj: any = {};
const showTabs = computed(() => list.value.map(i => i.name));
const showData = computed(() => goldPriceDatas.value[current.value ? 'brandOldPrice' : 'brandPrice']);

const getBannerList = async () => {
  const res = await queryGoldPriceBannerListFront('');
  bannerList.value = res.data;
};

const getGoldPrice = async (id = '') => {
  const url = id ? queryGoldPriceByDist : queryDefShowGoldPrice;
  const { code, data } = await url(id);
  // const { code, data } = await getSaleMetalPrice(id);

  if (code === 0) {
    list.value = [];
    goldPriceDatas.value = data;
    if (data.param.todayGoldPriceShowed === 'Y') {
      list.value.push({ name: '今日金价' });
    }
    if (data.param.recoveryGoldPriceShowed === 'Y') {
      list.value.push({ name: '回收金价' });
    }
  }
};

const shareData: Ref<any> = ref([]);
const isShare = async () => {
  const res = await queryShareSett({ pageName: 'WM_TODAY_GOLD_PRICE' });
  // 控住分享
  shareHold(res.data);
  shareData.value = {
    title: '金千枝今日金价',
    path: 'my-assets-pages/gold-price/index',
    shareObj: res.data,
  };
};
onShareAppMessage(() => shareAppMessage(shareData.value));
onShareTimeline(() => shareTimeline(shareData.value));
</script>

<style scoped lang="scss">
.mC {
  color: var(--main-color);
}
.banner {
  position: unset;
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
  min-height: 100vh;
  background: #f5f5f5;
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

.empty-page {
  min-height: 410rpx;
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
          color: #ff547b;
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
</style>
