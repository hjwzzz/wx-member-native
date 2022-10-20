<template>
  <view class="empty-wrapper">
    <view class="content-empty">
      <image
        class="image"
        :src="`${staticUrl}img/empty/${props.icon}.png`"
        mode=""
      ></image>
    </view>
    <view class="empty">{{ props.text }}</view>
  </view>
</template>

<script setup lang="ts">
import { staticUrl } from '@/utils/config';

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
</script>

<style lang="scss" scoped>
.empty-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  .content-empty {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
    overflow: hidden;

    .image {
      width: 100%;
      height: 100%;
    }
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
