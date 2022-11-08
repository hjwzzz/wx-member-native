<template>
  <view class="card">
    <view class="top">
      <view class="left">
        <image class="good-img" :src="item.url" mode="aspectFill" />
        <view class="center">
          <view class=""> {{ item.prizeName }} </view>
          <view class="amount"> x{{ item.quantity }} </view>
          <view class="amount">
            {{ item.relatedKindName }}
          </view>
        </view>
      </view>
      <view class="right" v-if="status">
        <text :style="`color:${basicsData.mainColor}`">
          {{ item.statusName }}
        </text>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import { toRef } from 'vue';

import type { IPrize, IPrizeItem } from '@/my-assets-pages/api/types/my-prize';
const basicsData = useBasicsData();
interface propsType {
  item: IPrize | IPrizeItem;
  status: boolean;
}
const props = defineProps<propsType>();
const item = toRef(props, 'item');
</script>

<style scoped lang="scss">
.card {
  margin-top: 30rpx;
  background: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
}

.top {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;

    .good-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
      flex-shrink: 0;
    }
  }

  .center {
    margin-left: 20rpx;
    width: 340rpx;
    color: #323338;
    font-size: 28rpx;
    .amount {
      font-size: 24rpx;
      margin-top: 10rpx;
      color: #b7b8c4;
    }
  }

  .right {
    font-size: 28rpx;
    color: #ff6e8f;
    margin-right: 5rpx;
  }
}
</style>
