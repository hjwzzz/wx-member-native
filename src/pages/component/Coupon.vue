<template>
  <view class="coupon-act" @click="toDetail">
    <view class="header">
      <view class="header-left">
        <text class="title">{{ title }}</text>
      </view>
      <view class="right">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>

    <!-- <view class="coupon-card">
      <view class="coupon-card-item">
        <view class="coupon-card-item-text coupon-card-item-price">
          <text class="coupon-card-item-price-unit">￥ </text>
          <text class="coupon-card-item-price-num"> 100</text>
        </view>
        <view class="coupon-card-item-text coupon-card-item-info"
          >满199可用
        </view>

        <view class="coupon-card-item-text">
          <view class="coupon-card-item-text coupon-card-item-btn">
            理科领取
          </view>
        </view>
      </view>
      <view class="coupon-card-item">
        <view class="coupon-card-item-text coupon-card-item-price">
          <text class="coupon-card-item-price-unit">￥ </text>
          <text class="coupon-card-item-price-num"> 100</text>
        </view>
        <view class="coupon-card-item-text coupon-card-item-info"
          >满199可用
        </view>

        <view class="coupon-card-item-text">
          <view class="coupon-card-item-text coupon-card-item-btn">
            理科领取
          </view>
        </view>
      </view>
      <view class="coupon-card-item">
        <view class="coupon-card-item-text coupon-card-item-price">
          <text class="coupon-card-item-price-unit">￥ </text>
          <text class="coupon-card-item-price-num"> 100</text>
        </view>
        <view class="coupon-card-item-text coupon-card-item-info"
          >满199可用
        </view>

        <view class="coupon-card-item-text">
          <view class="coupon-card-item-text coupon-card-item-btn">
            理科领取
          </view>
        </view>
      </view>
    </view> -->

    <view class="custom-dots">
      <swiper
        style="height: 250rpx"
        :autoplay="false"
        circular
        @change="swiperChange"
        class="coupon-swiper"
      >
        <swiper-item class="swiper-item">
          <view class="swiper-item-list">
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <view class="swiper-item-list">
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
            <view class="coupon-card-item-swiper">
              <view class="coupon-card-item-text coupon-card-item-price">
                <text class="coupon-card-item-price-unit">￥ </text>
                <text class="coupon-card-item-price-num"> 100</text>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info"
                >满199可用
              </view>

              <view class="coupon-card-item-text">
                <view class="coupon-card-item-text coupon-card-item-btn">
                  理科领取
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view class="custom-dots-box dots-round">
        <view
          class="custom-dots-show"
          v-for="(_, index) in 2"
          :key="index"
          :style="{
            background:
              currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
          }"
        />
      </view>
    </view>

    <!-- <view
      class="content"
      v-for="(policy, index) in policyList.records"
      :key="index"
    >
    </view>
    <NoneData v-if="!policyList.totalRecord" /> -->
  </view>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import NoneData from './NoneData.vue';
import { onShow } from '@dcloudio/uni-app';

const initBasicsData = useBasicsData();

interface Props {
  title?: string;
  item?: any;
  policyListNum?: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: '优惠券',
  item: () => ({}),
  policyListNum: 0,
});

const currentIndex = ref(0);
const swiperChange = e => {
  console.log(e);
  currentIndex.value = e.detail.current;
};

const policyList: any = reactive({ totalRecord: 0, records: [] });

const toDetail = () => {
  //  uni.navigateTo({ url });
  Router.goCodePage('warranty');
};

const getPolicyList = async () => {
  if (!initBasicsData.checkLogin) {
    return;
  }
  const res = await queryWarrantyListPageFront({
    mid: initBasicsData.useMid,
    curPage: 1,
    pageSize: props.policyListNum,
  });
  if (res.code === 0 && res.data) {
    Object.assign(policyList, res.data);
  }
};
// policyListNum 有值再去请求
watch(
  () => props.policyListNum,
  () => {
    getPolicyList();
  },
  { immediate: true }
);
// 登录请求
watch(
  () => initBasicsData.checkLogin,
  (bool: boolean) => {
    if (bool) {
      getPolicyList();
    } else {
      policyList.records = [];
      policyList.totalRecord = 0;
    }
  }
);

onShow(() => {
  if (initBasicsData.checkLogin) {
    getPolicyList();
    return;
  }
  policyList.records = [];
  policyList.totalRecord = 0;
});
</script>

<style lang="scss" scoped>
.coupon-card {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  // width: 350px;
  // display: flex;
  // justify-content: flex-start;
  // flex-wrap: nowrap;
  // overflow-x: auto;
  // overflow-y: hidden;
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .coupon-card-item {
    width: 260rpx;
    height: 250rpx;
    background: #e04838;
    border-radius: 16rpx;
    flex-shrink: 0;
    margin-right: 20rpx;

    .coupon-card-item-text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .coupon-card-item-price {
      height: 120rpx;
      .coupon-card-item-price-unit {
        font-size: 24rpx;
        font-weight: 700;
        color: #fbe7c3;
        margin-top: 25rpx;
        margin-right: -5rpx;
      }
      .coupon-card-item-price-num {
        font-size: 64rpx;
        font-weight: 700;
        color: #fbe7c3;
      }
    }
    .coupon-card-item-info {
      // height: 60rpx;
      font-size: 24rpx;
      color: #fbe7c3;
    }
    .coupon-card-item-btn {
      width: 136rpx;
      height: 48rpx;
      background: linear-gradient(90deg, #fee6cc, #fee6cc);
      border-radius: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #e04838;
      margin-top: 22rpx;
    }
  }
}

.custom-dots {
  position: relative;
  padding-top: 30rpx;
  padding-bottom: 50rpx;

  .coupon-swiper {
    border-radius: 16rpx;
    overflow: hidden;
  }
  .swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-item-list {
    display: flex;
    justify-content: flex-start;
    background: #e04838;
    width: 660rpx;
    border-radius: 16rpx;
  }
  .coupon-card-item-swiper {
    width: 33.3%;
    height: 250rpx;
    flex-shrink: 0;

    // border: 1px solid white;
    .coupon-card-item-text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .coupon-card-item-price {
      height: 120rpx;
      .coupon-card-item-price-unit {
        font-size: 24rpx;
        font-weight: 700;
        color: #fbe7c3;
        margin-top: 25rpx;
        margin-right: -5rpx;
      }
      .coupon-card-item-price-num {
        font-size: 64rpx;
        font-weight: 700;
        color: #fbe7c3;
      }
    }
    .coupon-card-item-info {
      // height: 60rpx;
      font-size: 24rpx;
      color: #fbe7c3;
    }
    .coupon-card-item-btn {
      width: 136rpx;
      height: 48rpx;
      background: linear-gradient(90deg, #fee6cc, #fee6cc);
      border-radius: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #e04838;
      margin-top: 22rpx;
    }
  }
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

.coupon-act {
  // width: 690rpx;
  padding: 30rpx;
  padding-bottom: 10rpx;
  margin: 30rpx 0rpx;
  background: #fff;
  border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
      height: 50rpx;

      .title {
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        color: #323338;
      }

      .number {
        // width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        color: var(--main-color);
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

      .icon {
        width: 10rpx;
        height: 18rpx;
        color: #b7b8c4;
      }
    }
  }

  .content {
    padding-bottom: 20rpx;
    // padding: 30rpx 0;
    margin-top: 20rpx;
    margin-bottom: 10rpx;

    .orderId {
      display: flex;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 800;
      line-height: 40rpx;
      color: #323338;
    }

    .shopName {
      display: flex;
      align-items: center;
      margin: 16rpx 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // .icon {
      //   flex-shrink: 0;
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .name {
        height: 40rpx;
        margin-left: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .orderTime {
      display: flex;
      align-items: center;
      // height: 50rpx;
      // .icon {
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .time {
        height: 40rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }
    }
  }

  .content {
    border-bottom: solid 2rpx #f8f8f8;
  }
  .content:last-child {
    border-bottom: solid 0rpx white;
  }
}
</style>
