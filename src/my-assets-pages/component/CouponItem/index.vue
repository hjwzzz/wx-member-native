<template>
  <view class="coupon-list-item">
    <view :class="`coupon-list-item-top ${item.style?.watermarkPosition}`">
      <!-- <image mode="heightFix" class="image {{ item.style.watermarkPosition }}" src="{{ item.style.watermarkImgUrl }}"> -->
      <!-- </image> -->
      <view class="name">{{ item.name }}</view>
      <view class="handle">
        <view class="receive"> 领取 </view>
      </view>
      <view class="stock">
        <view class="currency-symbol">￥</view>
        <view class="num">{{ item.stock }}</view>
      </view>
      <view class="threshold">满{{ item.paramVo.threshold }}可用</view>
    </view>
    <view class="coupon-list-item-bottom">
      <view>{{ item.couponValidTime }}</view>
      <view>已领取 {{ item.percentage }}</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { CouponItem } from './index.type';

const props = defineProps<{
  item: CouponItem;
}>();

const couponListItemTopBackgroundImage = computed(() => `url("${props.item.style?.watermarkImgUrl}"), linear-gradient(270deg, ${props.item.style?.topBgColorBottom} 1%, ${props.item.style?.topBgColorTop} 99% 100%, #f5f5f5)`);

const handleColor = computed(() => props.item.style?.topBgColorTop);

const receiveColor = computed(() => props.item.style?.mainColor);

const couponListItemBottomBackgroundColor = computed(() => `linear-gradient(270deg, ${props.item.style?.bottomBgColorTop} 0%, ${props.item.style?.topBgColorTop} 100%)`);

const couponListItemBottomColor = computed(() => props.item.style?.complementaryColor);
</script>

<style lang="scss" scoped>
.coupon-list-item {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  margin: 0 0 30rpx;
  box-sizing: border-box;

  .coupon-list-item-top {
    position: relative;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr auto;
    box-sizing: border-box;
    // gap: 20rpx 0;
    align-items: end;
    width: 100%;
    height: 200rpx;
    padding: 30rpx;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 2rpx solid transparent;
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    background-image: v-bind("couponListItemTopBackgroundImage");
    color: v-bind("handleColor");

    &.RIGHT {
      background-position-x: 100%;
      // right: 0;
    }

    &.LEFT {
      background-position-x: 0;
      // left: 0;
    }

    &.CENTER {
      background-position-x: 50%;
      // left: 50%;
      // transform: translateX(-50%);
    }

    .image {
      position: absolute;
      bottom: 0;
      z-index: 1;
      max-height: 200rpx;
    }

    .name {
      z-index: 2;
      align-self: start;
      font-size: 28rpx;
      font-weight: 500;
    }

    .handle {
      display: flex;
      align-self: start;
      justify-content: flex-end;

      .receive {
        height: 48rpx;
        padding: 0 30rpx;
        line-height: 48rpx;
        border-radius: 28rpx;
        background: v-bind("receiveColor");
      }
    }

    .stock {
      z-index: 2;
      align-self: end;
      height: 80rpx;
      line-height: 80rpx;
      vertical-align: bottom;

      .currency-symbol {
        display: inline-block;
        font-size: 36rpx;
        font-weight: 500;
      }

      .num {
        display: inline-block;
        font-size: 80rpx;
        font-weight: 800;
      }
    }

    .threshold {
      z-index: 2;
      font-size: 24rpx;
      text-align: right;
    }
  }

  .coupon-list-item-bottom {
    display: grid;
    box-sizing: border-box;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 80rpx;
    padding: 20rpx 24rpx;
    transform: translate(0, -10rpx);
    z-index: 1;
    font-size: 24rpx;
    color: rgb(0 0 0 / 45%);
    background: #fff;
    background-image: v-bind("couponListItemBottomBackgroundColor");
    color: v-bind("couponListItemBottomColor");
    border-radius: 0rpx 0rpx 16rpx 16rpx;
    -webkit-mask-image: radial-gradient(
      circle at top,
      transparent 6rpx,
      black 0
    );
    -webkit-mask-position: top;
    -webkit-mask-size: 20rpx 100%;
    -webkit-mask-repeat: repeat-x;
    -webkit-mask-mode: match-source;
    mask-image: radial-gradient(circle at top, transparent 6rpx, black 0);
    mask-position: top;
    mask-size: 20rpx 100%;
    mask-repeat: repeat-x;
    mask-mode: match-source;
  }
}
</style>
