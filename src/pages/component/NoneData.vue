<template>
  <view class="empty-wrapper">
    <image
      class="image"
      :src="`${staticUrl}img/empty/${props.icon}.png`"
      :style="imgSize"
    ></image>
    <view class="empty">{{ props.text }}</view>
  </view>
</template>

<script setup lang="ts">
import { staticUrl } from '@/utils/config';
import { computed, ref } from 'vue';

interface Props {

  /**
   * 图标： 其他 、积分、地址、奖品、优惠券、门店、 导购、 金价、 网络、未开通、 余额、
   */
  icon?:
    | 'status' // 其他空状态
    | 'noIntegral' // 积分
    | 'address' // 地址
    | 'prize' // 奖品
    | 'Salesperson' // 优惠券
    | 'shop' // 门店
    | 'shoppers' // 导购
    | 'themoney' // 金价
    | 'wifi-none' // 网络
    | 'wukaidong' // 未开通
    | 'wuyuer'; // 余额
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'status',
  text: '暂无相关信息',
});
const imgInfo = ref({
  width: 100,
  height: 100,
});
const imgSize = computed(() => `width: ${imgInfo.value.width}px;height: ${imgInfo.value.height}px;`);
uni.getImageInfo({
  src: `${staticUrl}img/empty/${props.icon}.png`,
  success: e => {
    imgInfo.value = e;
  },
});
</script>

<style lang="scss" scoped>
.empty-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .image {
    line-height: 0;
    width: 200rpx;
    height: 200rpx;
  }

  .empty {
    width: 144rpx;
    height: 34rpx;
    margin: 0 auto;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #b7b8c4;
  }
}
</style>
