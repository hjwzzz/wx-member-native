<template>
  <CustomPage>
    <view class="shop">
      <view class="title">
        <text class="letter">适用门店</text>
      </view>
      <view class="content">
        <view v-for="(item, i) in shopInfoData" :key="i" class="content-text">
          {{ item }}
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue';
const shopInfoData: Ref<any> = ref([]);

onMounted(() => {
  const str = uni.getStorageSync('shopInfo');
  shopInfoData.value = JSON.parse(str);
});
</script>

<style lang="scss" scoped>
.shop {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 24rpx 30rpx;
  box-sizing: border-box;

  .title {
    display: flex;
    justify-content: space-between;
    .letter {
      width: 128rpx;
      height: 44rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #323338;
      line-height: 44rpx;
    }
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: #9697a2;
    line-height: 52rpx;
    margin-top: 20rpx;

    .content-text {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
}
</style>
