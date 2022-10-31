<template>
  <view class="card">
    <view class="top">
      <view class="left">
        <image class="good-img" :src="props.item.url" mode="" />
        <view class="center">
          <view class=""> {{ props.item.prizeName }} </view>
          <view class="amount"> x{{ props.item.quantity }} </view>
          <view class="amount"> {{ props.item.relatedKind?.name }} </view>
        </view>
      </view>
      <view class="right" v-if="props.status">
        <text :style="`color:${basicsData.mainColor}`">
          {{ props.item.status?.name }}
        </text>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
const basicsData = useBasicsData();
interface propsType {
  item: {
    url: string;
    prizeName: string;
    quantity: string;
    relatedKind: { name: string };
    status: { name: string };
  };
  status: boolean;
}
const props = defineProps<propsType>();
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
