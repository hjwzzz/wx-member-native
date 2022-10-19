<template>
  <view class="custom-tab-bar">
    <view class="custom-tab-bar-item"> 11111111 </view>
    <view class="custom-tab-bar-item"> 11111111 </view>
    <view class="custom-tab-bar-item"> 11111111 </view>
    <view class="custom-tab-bar-item"> 11111111 </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.custom-tab-bar {
  position: fixed;
  left: 0rpx;
  bottom: 0px;
  right: 0rpx;
  height: 100rpx;
  background-color: white;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  display: flex;
  justify-content: space-between;
  .custom-tab-bar-item {
  }
}
</style>
