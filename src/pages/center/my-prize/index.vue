<template>
  <view class="content">
    <uni-segmented-control
      :current="current"
      :values="showItems"
      @clickItem="onClickItem"
      styleType="text"
      :activeColor="mainColor"
    ></uni-segmented-control>
    <view class="content">
      <view v-show="current === 0"> 选项卡1的内容 </view>
      <view v-show="current === 1"> 选项卡2的内容 </view>
      <view v-show="current === 2"> 选项卡3的内容 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const mainColor = computed(() => store.state.mainColor);

const items = reactive([
  {
    key: ['TEXC'],
    name: '待兑换',
  },
  {
    key: ['CONFIRMERD', 'DELIVERED', 'UNCLAIMED', 'SHIPPED', 'CHOICE'],
    name: '待领取',
  },
  {
    key: ['FINISHED'],
    name: '已领取',
  },
  {
    key: ['CLOSED'],
    name: '已失效',
  },
]);
const showItems = items.map(i => i.name);
const current = ref(0);
const onClickItem = () => ({});
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="less" scoped>
:deep(.segmented-control) {
  background-color: white;
}
</style>
