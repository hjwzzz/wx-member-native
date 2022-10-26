<template>
  <CustomPage backgroundColor="white">
    <view class="wifi-no-container" @click="onBack">
      <view class="container">
        <image
          class="image"
          :src="staticUrl + 'img/wifi-none.png'"
          mode="heightFix"
        ></image>
        <view class="titles"> 网络异常，点击重试</view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { staticUrl } from '@/utils/config';
const onBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.wifi-no-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translateY(-10%);
    .image {
      width: 320rpx;
      height: 320rpx;
    }
    .titles {
      font-size: 14px;
      font-weight: 400;
      color: #9697a2;
      line-height: 20px;
    }
  }
}
</style>
