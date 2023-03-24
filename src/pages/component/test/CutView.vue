<template>
  <view :style="props.items?.param?.doOut?.style" class="cut-box">
    <view
      v-if="props.items?.param?.doOut?.fixedStyle === 1"
      :style="lines"
      class="cut-box-line"
    >
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// import { useBasicsData } from '@/store/basicsData';

// const initBasicsData = useBasicsData();

interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });

const lines = computed(() => {
  if (props.items?.param?.doOut?.special) {
    const { boderStyle, borderColor }: any =
      props.items?.param?.doOut?.special || {};
    return { borderBottom: `1rpx  ${boderStyle} ${borderColor}` };
  }
  return {};
});
</script>

<style lang="scss" scoped>
.cut-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .cut-box-line {
    width: 100%;
  }
}
</style>
