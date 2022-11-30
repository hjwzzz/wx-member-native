<template>
  <view class="evaluate-item">
    <image class="img" mode="aspectFit" :src="props.info.avatarUrl"></image>
    <view class="wrapper">
      <view class="name">
        <view class="text-break left">
          {{ props.info.membName || '' }}
        </view>
        <view class="date">{{ props.info.createTime || '' }}</view>
      </view>
      <view class="content">{{ props.info.content || '' }}</view>
      <view class="img-list">
        <image
          @click="previewImage(index)"
          v-for="(item, index) in props.info.commImgsList"
          :key="index"
          class="img"
          mode="aspectFill"
          :src="item"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
});
const previewImage = (index: any) => {
  uni.previewImage({
    current: index,
    urls: props.info.commImgsList,
  });
};
</script>
<style scoped lang="scss">
.evaluate-item {
  display: flex;
  margin-bottom: 60rpx;
  & > .img {
    width: 56rpx;
    height: 56rpx;
    border-radius: 28rpx;
    margin-right: 20rpx;
  }
  .wrapper {
    width: calc(100% - 76rpx);
    .name {
      height: 56rpx;
      line-height: 56rpx;
      font-size: 28rpx;
      font-weight: bold;
      color: #323338;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18rpx;
      .date {
        flex-shrink: 0;
        font-size: 24rpx;
        font-weight: normal;
        color: #b7b8c4;
      }
    }
    .content {
      font-size: 28rpx;
      color: #646771;
      line-height: 48rpx;
    }
    .img-list {
      margin-top: 20rpx;
      display: grid;
      grid-template-columns: 190rpx 190rpx 190rpx;
      grid-row-gap: 24rpx;
      grid-column-gap: 24rpx;
      .img {
        width: 190rpx;
        height: 190rpx;
        border-radius: 16rpx;
      }
    }
  }
}
</style>
