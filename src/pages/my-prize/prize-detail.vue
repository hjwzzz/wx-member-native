<template>
  <div>
    <view class="receive">
      <view class="left">
        <image class="img" src="@/static/prize/dailingqu.png" mode="" />
      </view>
      <view class="right">
        <view class="title"> 待领取 </view>
        <view class="text"> 请到指定门店领取 </view>
      </view>
    </view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.receive {
  padding: 40rpx 0rpx 40rpx 30rpx;
  height: 180rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  .left {
    .img {
      width: 60rpx;
      height: 60rpx;
    }
  }
  .right {
    margin-left: 30rpx;

    .title {
      font-size: 36rpx;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: #323338;
    }

    .text {
      margin-top: 18rpx;
      color: #9697a2;
    }
  }
}
</style>
