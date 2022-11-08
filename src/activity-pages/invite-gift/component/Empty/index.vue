<template>
  <view class="empty">
    <image
      src="https://static.jqzplat.com/invitegift/empty.png"
      mode="widthFix"
      class="empty-icon"
    />
    <view>{{ msg }}</view>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  msg: {
    type: String,
    default: '',
  },
});
</script>
<style lang="scss" scoped>
.empty {
  text-align: center;
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #4c4c4c;
  line-height: 22rpx;
  padding: 180rpx;
  &-icon {
    width: 140rpx;
    height: 140rpx;
    margin-bottom: 20rpx;
  }
}
</style>
