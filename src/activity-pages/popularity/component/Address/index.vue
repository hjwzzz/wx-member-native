<template>
  <view class="address-template">
    <view
      v-for="item in list"
      :key="item.id"
      class="address-item"
      :data-item="item"
      @click="onCheck"
    >
      <view class="shop-box">
        <view class="shop-name text-line-one">
          {{ item.storeName }}
        </view>
        <view class="shop-range">
          <text v-if="item.range">
            <text v-if="item.range * 1000 >= 1000">{{ item.range }}km</text>
            <text v-else>{{ item.range * 1000 }}m</text>
          </text>
        </view>
      </view>
      <view class="address-item-option address-info">
        <image
          class="address-icon"
          src="https://img.dev.jqzplat.com/12D3868F/COMM/e35badb5-20220527.png"
          mode="aspectFill"
        ></image>
        <view class="address-info-value">
          {{ item.province + item.city + item.district + item.address || '--' }}
        </view>
      </view>
      <view class="address-item-option address-phone">
        <image
          class="address-icon"
          src="https://img.dev.jqzplat.com/12D3868F/COMM/2b08de8f-20220527.png"
          mode="aspectFill"
        ></image>
        <view class="address-phone-value">
          {{ item.tel || '--' }}
        </view>
      </view>
      <image
        class="address-check-icon"
        :src="distId == item.distId ? checkIcon : uncheckIcon"
        mode="aspectFill"
      ></image>
    </view>
  </view>
</template>

<script lang="ts">
export default { name: '' };
</script>

<script lang="ts" setup>
import { ref, PropType } from 'vue';
import { cloneDeep } from '@/utils/util';

const props = defineProps({
  list: {
    type: Array as PropType<any[]>,
    default() {
      return [];
    },
  },
  distId: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['onCheck']);

const checkIcon = ref('https://img.dev.jqzplat.com/12D3868F/COMM/4f536893-20220527.png');
const uncheckIcon = ref('https://img.dev.jqzplat.com/12D3868F/COMM/58ef1906-20220527.png');
const onCheck = (e: any) => {
  const { item } = e.currentTarget.dataset;
  console.log('onCheck1', item);
  emits('onCheck', cloneDeep(item));
};
</script>
<style lang="scss" scoped>
.address-template {
  .address-item {
    position: relative;
    padding: 30rpx;
    color: #999;
    font-size: 24rpx;
    line-height: 34rpx;
    border-bottom: 1rpx solid #eee;
    border-radius: 16rpx;
    background-color: #ffffff;
    &:last-child {
      border-bottom: 0;
    }
  }
  .address-check-icon {
    position: absolute;
    top: 84rpx;
    right: 30rpx;
    width: 35rpx;
    height: 35rpx;
  }
  .shop-box {
    display: flex;
    align-items: center;
    line-height: 1;
    justify-content: space-between;
  }
  .shop-name {
    color: #4d4d4d;
    font-size: 28rpx;
    font-weight: 500;
  }
  .shop-range {
    font-size: 20rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999;
    background-color: #ffffff;
    margin-left: 10rpx;
  }
  .address-item-option {
    position: relative;
    padding-left: 40rpx;
  }
  .address-icon {
    position: absolute;
    top: 2rpx;
    left: 0;
    width: 28rpx;
    height: 28rpx;
  }
  .address-info {
    margin-top: 26rpx;
  }
  .address-phone {
    margin-top: 18rpx;
  }
}
</style>
