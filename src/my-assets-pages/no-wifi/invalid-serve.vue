<template>
  <CustomPage>
    <view class="container">
      <view>
        <image
          class="container-image"
          src="https://static.jqzplat.com/img/invalid-service.png"
        >
        </image>
      </view>
      <view class="fot view-text">非常抱歉！该企业服务已到期。</view>
      <view class="view-text">现暂无法正常使用，给你造成不便敬请谅解！</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  .fot {
    margin-top: 44rpx;
  }
  .view-text {
    font-size: 14px;
    font-weight: 400;
    color: #9697a2;
    line-height: 60rpx;
  }
  .container-image {
    width: 470rpx;
    height: 260rpx;
  }
}
</style>
