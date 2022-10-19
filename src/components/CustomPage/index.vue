<template>
  <view class="custom-page">
    <view :class="props.bottom ? 'custom-page-box2' : 'custom-page-box1'">
      <slot></slot>
    </view>
    <PageFooter :bottom="props.bottom"> </PageFooter>
  </view>
</template>

<script setup lang="ts">
import PageFooter from '@/components/PageFooter/index.vue';
interface Props {
  bottom?: boolean;
}
const props = withDefaults(defineProps<Props>(), { bottom: false });
</script>

<style lang="scss" scoped>
.custom-page {
  .custom-page-box1 {
    min-height: calc(100vh - 80rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 80rpx - env(safe-area-inset-bottom));
  }
  .custom-page-box2 {
    min-height: calc(100vh - 180rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 180rpx - env(safe-area-inset-bottom));
  }
}
</style>
