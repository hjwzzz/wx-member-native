<template>
  <view :style="props.items?.param?.doOut?.style" class="box-text">
    <view
      :style="{
        ...props.items?.param?.doOut?.special,
        fontWeight: props.items?.param?.doOut?.special.fontWeight ? 700 : '',
      }"
    >
      {{ props.items?.param?.title }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });
</script>

<style lang="scss" scoped>
.box-text {
  padding: 24rpx;
}
</style>
