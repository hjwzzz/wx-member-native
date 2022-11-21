<template>
  <view class="page-footer" :class="props.bottom ? 'show-bottom' : ''">
    技术支持：金千枝数智云
  </view>
</template>
<script lang="ts" setup>
interface Props {
  bottom?: boolean;
}
const props = withDefaults(defineProps<Props>(), { bottom: false });
</script>
<style lang="scss" scoped>
.page-footer {
  width: 100%;
  height: 110rpx;
  font-size: 24rpx;
  color: #d8d9e0;
  text-align: center;
}

.show-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
