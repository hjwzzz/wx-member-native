<template>
  <view class="empty-box">
    <image
      v-show="type == 1"
      class="empty-img"
      src="https://img.dev.jqzplat.com/12D3868F/COMM/2c4ec62a-20220525.png"
      mode="widthFix"
    ></image>
    <image
      v-show="type == 2"
      class="empty-img"
      src="https://img.dev.jqzplat.com/12D3868F/COMM/f306e399-20220525.png"
      mode="widthFix"
    ></image>
    <text class="empty-tip">{{ tip }}</text>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: Number,
    default: 1,
  },
  tip: {
    type: String,
    default: '暂无相关信息',
  },
});
</script>
<style lang="scss" scoped>
.empty-box {
  display: flex;
  padding: 48rpx 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.empty-img {
  width: 220rpx;
}
.empty-tip {
  margin-top: 24rpx;
  color: #aaaaaa;
  font-size: 28rpx;
  line-height: 40rpx;
}
</style>
