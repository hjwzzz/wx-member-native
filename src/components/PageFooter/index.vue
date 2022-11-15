<template>
  <view
    class="page-footer"
    :class="props.bottom ? 'page-bottom2' : 'page-bottom1'"
  >
    技术支持：金千枝数字云
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
  line-height: 110rpx;
  font-size: 24rpx;
  color: #d8d9e0;
  text-align: center;
}

.page-bottom1 {
  padding-bottom: calc(constant(safe-area-inset-bottom));
  padding-bottom: calc(env(safe-area-inset-bottom));
}

.page-bottom2 {
  padding-bottom: calc(105rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(105rpx + env(safe-area-inset-bottom));
}
</style>
