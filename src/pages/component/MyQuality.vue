<template>
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
    <view
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
    <NoneData v-if="!policyList.totalRecord" />
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
  title: '预约服务',
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
.grid-policy-act {
  // width: 690rpx;
  padding: 30rpx;
  padding-bottom: 10rpx;
  margin: 30rpx 0rpx;
  background: #fff;
  border-radius: 16rpx;

  .icon-image {
    height: 24rpx;
    width: 24rpx;
  }

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
