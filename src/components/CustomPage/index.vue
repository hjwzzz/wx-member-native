<template>
  <view class="custom-page">
    <view class="custom-page-box">
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
  .custom-page-box {
    min-height: 80vh;
  }
}
</style>
