<template>
  <view class="empty-wrapper">
    <view class="content-empty">
      <image class="image" :src="imageUrl" mode=""></image>
    </view>
    <view class="empty">暂无相关信息</view>
  </view>
</template>

<script setup lang="ts">
import { staticUrl } from '@/utils/config';
const imageUrl = `${staticUrl}img/noneStatus.png`;
</script>

<style lang="scss" scoped>
.empty-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .content-empty {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    overflow: hidden;

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .empty {
    width: 144rpx;
    height: 34rpx;
    margin: 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #b7b8c4;
  }
}
</style>
