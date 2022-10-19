<template>
  <view
    class="custom-page"
    :style="{ backgroundColor: backgroundColor, '--main-color': mainColor }"
  >
    <view :class="props.bottom ? 'custom-page-box2' : 'custom-page-box1'">
      <slot></slot>
    </view>
    <PageFooter :bottom="props.bottom"> </PageFooter>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import PageFooter from '@/components/PageFooter/index.vue';
import { computed } from 'vue';
interface Props {
  bottom?: boolean;
  backgroundColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  bottom: false,
  backgroundColor: '#f5f5f5',
});

const initBasicsData = useBasicsData();
const mainColor = computed(() => initBasicsData.mainColor);

const backgroundColor = computed(() => props.backgroundColor);
</script>

<style lang="scss" scoped>
.custom-page {
  .custom-page-box1 {
    min-height: calc(100vh - 109rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 109rpx - env(safe-area-inset-bottom));
  }
  .custom-page-box2 {
    min-height: calc(100vh - 199rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 199rpx - env(safe-area-inset-bottom));
  }
}
</style>
