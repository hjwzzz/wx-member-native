<template>
  <view class="tabs-list" :class="props.fixed ? 'fixed' : ''">
    <view
      class="tabs-list-item"
      v-for="(item, index) in props.tabList"
      :key="index"
      @click="change(index, item)"
      :class="props.current === index ? 'tabs-list-item-action' : ''"
    >
      {{ item.name }}
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  current: number;
  tabList: any;
  fixed?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  current: 0,
  fixed: false,
  tabList: () => [],
});
const emits = defineEmits(['change', 'update:current']);
const change = (index: number, item: any) => {
  emits('update:current', index);
  emits('change', { index, item });
};
</script>

<style lang="scss" scoped>
.fixed {
  z-index: 999;
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  right: 0rpx;
}
.tabs-list {
  //
  display: flex;
  justify-content: space-between;
  background-color: white;
  .tabs-list-item {
    flex: 1;
    height: 90rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #9697a2;
    font-size: 28rpx;
  }
  .tabs-list-item-action {
    position: relative;
    font-weight: bold;
    color: var(--main-color);
    &::after {
      position: absolute;
      bottom: 0px;
      content: '';
      height: 6rpx;
      width: 40rpx;
      background-color: var(--main-color);
    }
  }
}
</style>
