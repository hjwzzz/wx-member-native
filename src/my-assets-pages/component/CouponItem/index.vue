<template>
  <view class="coupon-list-item">
    <view
      :class="`coupon-list-item-top ${item.style?.watermarkPosition} ${
        showStatus ? 'coupon-top-valid' : 'coupon-top-no'
      }`"
    >
      <view class="name">{{ item.name }}</view>
      <view class="handle" v-if="showStatus">
        <view class="receive"> 领取 </view>
      </view>
      <view v-else>
        <view class="right-image">
          <view class="trans">
            <image
              v-if="item.surplus === 0"
              :src="staticUrl + 'img/overNumber.png'"
              class="image"
              mode=""
            ></image>
            <image
              v-else-if="item.restrictStatus === 1"
              :src="staticUrl + 'img/geted.png'"
              class="image"
              mode=""
            ></image>
          </view>
        </view>
      </view>
      <view class="stock" :style="{ color: showMainColor }">
        <!-- 满减券 || 工费抵扣券  -->
        <block v-if="coupon1.includes(prodCode)">
          <view class="currency-symbol">￥</view>
          <view class="num">{{ item.paramVo.discount }}</view>
        </block>
        <!-- 随机券  -->
        <block v-if="coupon2.includes(prodCode)">
          <view class="currency-symbol">随机金额</view>
        </block>
        <!-- 折扣券 || 工费折扣券 -->
        <block v-if="coupon3.includes(prodCode)">
          <view class="num">{{ item.paramVo.discount }}</view>
          <view class="currency-symbol">折</view>
        </block>
      </view>

      <view class="threshold" :style="{ color: showMainColor }">
        {{ showCondition }}
      </view>
    </view>
    <view
      class="coupon-list-item-bottom"
      :class="`${showStatus ? 'coupon-bottom-valid' : 'coupon-bottom-no'}`"
    >
      <view>{{ item.couponValidTime }}</view>
      <view>已领取 {{ item.percentage }}</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import type { CouponItem } from './index.type';
import { staticUrl } from '@/utils/config';
const props = defineProps<{
  item: CouponItem;
}>();

const couponListItemTopBackgroundImage = computed(() => `url("${props.item.style?.watermarkImgUrl}"), linear-gradient(270deg, ${props.item.style?.topBgColorBottom} 1%, ${props.item.style?.topBgColorTop} 99% 100%, #f5f5f5)`);

const handleColor = computed(() => props.item.style?.topBgColorTop);

const receiveColor = computed(() => props.item.style?.mainColor || '#ffffff');

const showMainColor = computed(() => {
  if (props.item.surplus === 0 || props.item.restrictStatus === 1) {
    return '#ffffff';
  }
  return props.item.style?.mainColor;
});

const couponListItemBottomBackgroundColor = computed(() => `linear-gradient(270deg, ${props.item.style?.bottomBgColorTop} 0%, ${props.item.style?.topBgColorTop} 100%)`);

const couponListItemBottomColor = computed(() => props.item.style?.complementaryColor);

// 根据类型显示金额
// 满减券 || 工费抵扣券
const coupon1 = ['full_reduction_coupon', 'labor_cost_deduction_coupon'];
//  随机券
const coupon2 = ['random_money_coupon'];
// 折扣券 || 工费折扣券
const coupon3 = ['discount_coupon', 'labor_cost_discount_coupon'];

// 根据类型满减单位
// 满减券 || 折扣券 || 随机券
const condition1 = [
  'full_reduction_coupon',
  'discount_coupon',
  'random_money_coupon',
];
// 工费抵扣券 工费折扣券
const condition2 = [
  'labor_cost_deduction_coupon',
  'labor_cost_discount_coupon',
];

const showCondition = computed(() => {
  const code = props.item.prodCode?.code || '';
  const { threshold, laborChargesType: labor } = props.item.paramVo;
  if (condition1.includes(code)) {
    return threshold ? `满${threshold}可用` : '满任意金额可用';
  } else if (condition2.includes(code)) {
    const text = labor === 'g' ? '克' : '元';
    return threshold ? `满${threshold}${text}可用` : `满任意${text}可用`;
  }
  return '';
});

const showStatus = computed(() => props.item.surplus && !props.item.restrictStatus);

const prodCode = computed(() => props.item.prodCode?.code || '');
</script>

<style lang="scss" scoped>
.coupon-list-item {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  margin: 0 0 30rpx;
  box-sizing: border-box;

  .coupon-top-valid {
    background-image: v-bind('couponListItemTopBackgroundImage');
  }
  .coupon-top-no {
    background: #d8d9e0;
    color: white;
  }
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
    overflow: hidden;
    .right-image {
      .trans {
        width: 116rpx;
        height: 96rpx;
        position: absolute;
        right: -4rpx;
        top: 0rpx;
        .image {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      }
    }

    // color: v-bind('handleColor');

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
      z-index: 999;
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
        color: v-bind('handleColor');
        background: v-bind('receiveColor');
      }
    }

    .stock {
      z-index: 999;
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
  // .coupon-list-item-bottom-valid {
  //   background-image: v-bind('couponListItemBottomBackgroundColor');
  //   color: v-bind('couponListItemBottomColor');
  // }

  .coupon-bottom-valid {
    background-image: v-bind('couponListItemBottomBackgroundColor');
    color: v-bind('couponListItemBottomColor');
  }
  .coupon-bottom-no {
    color: rgb(0 0 0 / 45%);
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
    // color: rgb(0 0 0 / 45%);
    background: #fff;
    // background-image: v-bind('couponListItemBottomBackgroundColor');
    // color: v-bind('couponListItemBottomColor');
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
