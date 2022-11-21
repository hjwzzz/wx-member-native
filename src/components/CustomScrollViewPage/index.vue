<template>
  <view
    class="custom-page"
    :style="{
      backgroundColor: backgroundColor,
      '--main-color': mainColor,
      paddingTop: `${props.paddingTop}rpx`,
    }"
  >
    <!-- :refresher-triggered="loadingTop" -->
    <scroll-view
      refresher-default-style="black"
      scroll-y
      @scrolltolower="onLoadMore"
      :style="{
        height: `calc(100vh - ${viewHeight}rpx ) `,
      }"
    >
      <view
        :style="{
          minHeight: `calc(100vh - ${viewHeight}rpx  - 110rpx - env(safe-area-inset-bottom) ) `,
        }"
      >
        <slot></slot>
      </view>
      <ScrollViewFooter> </ScrollViewFooter>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import ScrollViewFooter from '@/components/ScrollViewFooter/index.vue';
import { computed } from 'vue';
interface Props {
  paddingTop?: string | number;
  paddingBottom?: string | number;
  backgroundColor?: string;
}
const props = withDefaults(defineProps<Props>(), {
  paddingTop: 0,
  paddingBottom: 0,
  backgroundColor: '#f5f5f5',
});
const initBasicsData = useBasicsData();
const mainColor = computed(() => initBasicsData.mainColor);
const backgroundColor = computed(() => props.backgroundColor);

// const viewHeight = Number(props.paddingTop) + Number(props.paddingBottom);
const viewHeight = computed(() => Number(props.paddingTop) + Number(props.paddingBottom));

const emits = defineEmits(['scrolltolower']);

const onLoadMore = () => {
  emits('scrolltolower');
};
</script>

<style lang="scss" scoped>
// .custom-page {
// }
</style>
