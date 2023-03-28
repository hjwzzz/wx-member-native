<template>
  <view
    class="custom-page-box"
    :style="{ background: background, '--main-color': mainColor }"
  >
    <view class="custom-page">
      <block v-if="!hide">
        <view :class="props.bottom ? 'custom-page-box2' : 'custom-page-box1'">
          <slot></slot>
        </view>
        <PageFooter :bottom="props.bottom"> </PageFooter>
      </block>
      <block v-else><slot></slot> </block>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import PageFooter from '@/components/PageFooter/index.vue';
import { computed } from 'vue';
interface Props {
  bottom?: boolean;
  background?: string;
  hide?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  bottom: false,
  hide: false,
  background: '#f5f5f5',
});

const initBasicsData = useBasicsData();
const mainColor = computed(() => initBasicsData.mainColor);

const background = computed(() => props.background);
</script>

<style lang="scss" scoped>
.custom-page-box {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  overflow: scroll;
}
.custom-page {
  overflow: scroll;
  .custom-page-box1 {
    min-height: calc(100vh - 110rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 110rpx - env(safe-area-inset-bottom));
  }
  .custom-page-box2 {
    min-height: calc(100vh - 215rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 215rpx - env(safe-area-inset-bottom));
  }
}
</style>
