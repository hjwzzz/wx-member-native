<template>
  <view class="card">
    <view class="top">
      <view class="left">
        <image :src="url" mode="" />
        <view class="center">
          <view class=""> {{ prizeName }} </view>
          <view class="amount"> x{{ quantity }} </view>
          <view class="amount"> {{ relatedKind.name }} </view>
        </view>
      </view>
      <view class="right" v-if="props.status">
        <text>
          {{ status.name }}
        </text>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps<propsType>();

interface propsType {
  item: {
    url: string;
    prizeName: string;
    quantity: string;
    relatedKind: { name: string };
    status: { name: string };
  };
  status: boolean;
}
const { prizeName, quantity, relatedKind, status, url } = toRefs(props.item);
</script>

<style scoped></style>
