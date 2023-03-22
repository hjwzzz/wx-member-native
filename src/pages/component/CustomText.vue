<template>
  <view :style="props.items?.param?.doOut?.style" class="box-text">
    <view
      :style="{
        ...props.items?.param?.doOut?.special,
        fontWeight: props.items?.param?.doOut?.special.fontWeight
          ? 'bold'
          : 500,
      }"
    >
      {{ props.items?.param?.title }}dfsjjklsadhflsda fildsaj
      flkasjas按属地划分空间撒大黄蜂舒服了接口的撒后即可家乐福很骄傲聚少离多复健科大煞风景客户sad副科级撒大海
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
