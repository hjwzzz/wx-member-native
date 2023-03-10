<template>
  <!--grid-price-none  -->
  <view class="grid-policy-act" @click="toDetail">
    <view class="header">
      <view class="header-left">
        <text class="title">{{ title || '质保单' }}</text>
        <view class="number"> ({{ policyList.totalRecord || 0 }}) </view>
      </view>
      <view class="right">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>
    <view class="policy-card">
      <view class="policy-card-item">
        <view class="policy-card-item-text policy-card-item-one">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-011.png'"
            mode="aspectFill"
          />
          <text class="text">单号：</text>
          <text class="store-name">Z451265545089354</text>
        </view>
        <view class="policy-card-item-text">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-009.png'"
            mode="aspectFill"
          />
          <text class="text">门店：</text>
          <text class="store-name">金千金千枝金千枝金千枝金千枝金千枝</text>
        </view>
        <view class="policy-card-item-text">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-006.png'"
            mode="aspectFill"
          />
          <text class="text">时间：</text>
          <text class="text">2022-05-18 10:10:10</text>
          <text class="text-num">数量：</text>
          <text class="text">2件</text>
        </view>
        <view class="policy-card-item-btn">
          <view class="policy-card-item-btn-info">
            <text>总计：</text>
            <text class="num-infos">￥</text>
            <text class="num-info-price">200000</text>
          </view>
          <view class="policy-card-item-btn-name"> 详情 </view>
        </view>
      </view>
    </view>
    <!-- <view
      class="content"
      v-for="(policy, index) in policyList.records"
      :key="index"
    >
      <view class="orderId">
        <view class="title">单号：</view>
        <view class="text">{{ policy.number }}</view>
      </view>
      <view class="shopName">
        <image
          class="image icon-image"
          :src="staticUrl + 'img/store.png'"
          mode="aspectFill"
        />
        <view class="name">{{ policy.storeName }}</view>
      </view>
      <view class="orderTime">
        <image
          class="image icon-image"
          :src="staticUrl + 'img/time.png'"
          mode="aspectFill"
        />
        <view class="time">{{ policy.bizTime }}</view>
      </view>
    </view>
    <NoneData v-if="!policyList.totalRecord" /> -->
  </view>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
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
  title: '质保单',
  item: () => ({}),
  policyListNum: 0,
});

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
.policy-card {
  padding-top: 25rpx;
  padding-bottom: 30rpx;
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
  .policy-card-item {
    width: 600rpx;
    height: 300rpx;
    background: #ffffff;
    border: 2rpx solid #f4f5f7;
    border-radius: 16rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
  }
  .store-name {
    width: 420rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .policy-card-item-btn {
    margin-top: 28rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    height: 100rpx;
    border-top: 1rpx solid #ebebeb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .policy-card-item-btn-info {
      color: #9697a2;
      font-size: 24rpx;
      .num-infos {
        color: #e04838;
      }
      .num-info-price {
        font-weight: 700;
        font-size: 28rpx;
        color: #e04838;
      }
    }
    .policy-card-item-btn-name {
      width: 128rpx;
      height: 60rpx;
      background: #e04838;
      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #fbe7c3;
    }
  }
  .policy-card-item-text {
    height: 50rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24rpx;
    color: #9697a2;
    .icon-image {
      margin-left: 30rpx;
      margin-right: 30rpx;
    }
    .text-num {
      margin-left: 40rpx;
    }
  }

  .policy-card-item-one {
    margin-top: 20rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #323338;
  }
}

.icon-image {
  height: 24rpx;
  width: 24rpx;
}
.grid-price-none {
  padding-bottom: 30rpx !important;
}
.grid-policy-act {
  // width: 690rpx;
  padding: 30rpx;
  padding-bottom: 0rpx;
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
