<template>
  <view class="grid-price">
    <view class="header">
      <view class="left">
        <text class="title">{{ props.title || '今日金价' }}</text>
      </view>
      <view class="right" @click="more">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>
    <view v-if="goldPrice?.length && showed">
      <!-- @change="swiperChange" -->
      <swiper
        class="swiper"
        :autoplay="true"
        :circular="true"
        :interval="2000"
        :duration="500"
        :indicator-dots="goldPrice?.length > 1"
        indicator-active-color="#FF547B"
        style="height: 280rpx"
      >
        <swiper-item v-for="(price, index) in goldPrice" :key="index">
          <view class="swiper-item uni-bg-red">
            <view class="content-detail">
              <view class="detail-header">
                <view class="swiper-title-brand-name" v-if="price.brandName">
                  <view class="swiper-title left">
                    {{ price.met || '' }}{{ price.metCtn || '' }}
                  </view>
                  <view v-if="price.brandName" class="swiper-line" />
                  <view class="swiper-title rigth">
                    {{ price.brandName || '' }}
                  </view>
                </view>
                <text v-else class="swiper-title">
                  {{ price.met || '' }}{{ price.metCtn || '' }}
                </text>
              </view>
              <view class="detail-content">
                <view class="left detail-content-left">
                  {{ price.price }}
                </view>
                <view class="right">元/克</view>
              </view>
              <view class="detail-footer _text1">{{ price.distName }}</view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <NoneData v-else></NoneData>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import { getGoldPriceByPage } from '@/pages/api/server';
import Router from '@/utils/router';
import { ref, Ref, onMounted } from 'vue';
import NoneData from './NoneData.vue';
const initBasicsData = useBasicsData();
// const mainColor = initBasicsData.mainColor;

interface Props {
  title?: string;
  // showed?: boolean;
  // goldPrice?: any;
  type: string;
}

const distId: Ref<string> = ref('');
const props = withDefaults(defineProps<Props>(), {
  title: '今日金价',
  type: '',
  // showed: false,
  // goldPrice: [],
});
const more = () => {
  Router.goCodePage('goldPrice', `?distId=${distId.value}`);
};

const showed = ref(false);
const goldPrice = ref<any>([]);
onMounted(() => {
  _getGoldPriceByPage();
});

const _getGoldPriceByPage = async () => {
  if (!initBasicsData.checkLogin) {
    return;
  }
  const res = await getGoldPriceByPage(props.type);
  if (res.code === 0 && res.data) {
    const {
      branPriceList,
      param,
      uiParam: todayGoldPrice,
      distId: id,
    } = res.data;
    // this.uiParam = uiParam;
    const { showNum } = param;
    const result: any = [];
    distId.value = id;

    branPriceList.map((item: unknown, index: number) => {
      if (index < showNum) {
        result.push(item);
      }
    });
    showed.value = todayGoldPrice.todayGoldPriceShowed === 'Y';
    goldPrice.value = result;
    // console.log('goldPrice', result);
  }
};
</script>

<style lang="scss" scoped>
.grid-price {
  // width: 630rpx;
  padding: 30rpx;
  // margin-top: 30rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      .title {
        width: 160rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }
    }

    .right {
      .more {
        width: 48rpx;
        height: 34rpx;
        margin-right: 2rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }
    }
  }

  .content-detail {
    text-align: center;

    .swiper-title-brand-name {
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: red;
      width: calc(100vw - 130rpx);

      .swiper-title {
        max-width: 49%;
      }

      .left {
        text-align: right;
      }

      .rigth {
        text-align: left;
      }
    }
    .swiper-title {
      color: #323338;
      font-size: 28rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .swiper-line {
      display: inline-block;
      width: 2rpx;
      height: 24rpx;
      background: #b7b8c4;
      margin: 0 12rpx;
    }

    .detail-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60rpx;
      overflow: hidden;

      .left {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }

      .center {
        display: inline-block;
        width: 2rpx;
        height: 24rpx;
        margin: 0 12rpx;
        overflow: hidden;
        background-color: #b7b8c4;
      }

      .right {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }
    }

    .detail-content {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin-top: 4rpx;

      .detail-content-left {
        height: 100rpx;
        margin-right: 6rpx;
        font-size: 72rpx;
        font-weight: 800;
        line-height: 100rpx;
        color: var(--main-color);
      }

      .right {
        width: 60rpx;
        height: 34rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }
    }

    // ._text1 {
    //   display: box;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   -webkit-line-clamp: 1;
    //   -webkit-box-orient: vertical;
    // }
  }

  .swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10px;

    .dot {
      width: 16px;
      height: 4px;
      margin-right: 6px;
      background: #ebedf0;
      border-radius: 4px;
    }

    .dot-active {
      background: #ff547b;
    }
  }
}
</style>
