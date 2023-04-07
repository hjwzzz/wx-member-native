<template>
  <view class="coupon-act" :style="props.items.param?.doOut?.style">
    <view class="header">
      <view class="header-left">
        <text
          class="title"
          :style="{
            color: specials.color,
            fontSize: specials.fontSize,
          }"
          >{{ title }}</text
        >
      </view>
      <view class="right" @click="toDetail">
        <text
          class="more"
          :style="{
            color: specials.color,
          }"
          >更多</text
        >
        <uni-icons
          type="arrowright"
          size="14"
          :color="specials.color || '#B7B8C4'"
        ></uni-icons>
      </view>
    </view>

    <!--    props.items.param.doOut.fixedStyle === 0 ||
      props.items.param.doOut.fixedStyle === 1 -->

    <view class="coupon-card" v-if="props.items.param.doOut.fixedStyle === 0">
      <!-- showed -->
      <block v-for="(cou, index) in props.items.param?.coupons" :key="index">
        <view
          v-if="cou.showed"
          class="coupon-card-item"
          :style="{
            background: specials.couponColor || '#e04838',
            color: specials.color || '#fbe7c3',
          }"
        >
          <view class="coupon-card-item-text coupon-card-item-price">
            <block v-if="coupon1.includes(cou.prodCode?.code || cou.prod)">
              <text class="coupon-card-item-price-unit">￥ </text>
              <text class="coupon-card-item-price-num">
                {{ cou.paramVo?.discount || '' }}
              </text>
            </block>
            <block v-if="coupon2.includes(cou.prodCode?.code || cou.prod)">
              <text class="coupon-card-item-price-unit">随机金额 </text>
            </block>
            <block v-if="coupon3.includes(cou.prodCode?.code || cou.prod)">
              <text class="coupon-card-item-price-num">
                {{ cou.paramVo?.discount || '' }}
              </text>
              <text class="coupon-card-item-price-unit">折 </text>
            </block>
            <!-- <text class="coupon-card-item-price-unit">￥ </text>
          <text class="coupon-card-item-price-num"> 100</text> -->
          </view>
          <view class="coupon-card-item-text coupon-card-item-info">
            {{ showCondition(cou) }}
          </view>
          <view class="coupon-card-item-text">
            <view
              class="coupon-card-item-text coupon-card-item-btn"
              :style="{
                background: specials.color || '#e04838',
                color: specials.couponColor || '#e04838',
              }"
              @click="receiveCoupon(cou)"
            >
              立刻领取
            </view>
          </view>
        </view>
      </block>
    </view>

    <view class="custom-dots" v-if="props.items.param.doOut.fixedStyle === 1">
      <swiper
        style="height: 250rpx"
        :autoplay="false"
        circular
        @change="swiperChange"
        class="coupon-swiper"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in couponsList"
          :key="index"
        >
          <!-- :style="{
          background:
            props.items?.param?.doOut?.special?.couponColor || '#e04838',
        }" -->
          <view
            class="swiper-item-list"
            :style="{
              background: specials.couponColor || '#e04838',
              color: specials.color || '#fbe7c3',
            }"
          >
            <view
              class="coupon-card-item-swiper"
              v-for="(cou, cl) in item"
              :key="cl"
            >
              <view class="coupon-card-item-text coupon-card-item-price">
                <block v-if="coupon1.includes(cou.prodCode?.code || cou.prod)">
                  <text class="coupon-card-item-price-unit">￥ </text>
                  <text class="coupon-card-item-price-num">
                    {{ cou.paramVo?.discount || '' }}
                  </text>
                </block>
                <block v-if="coupon2.includes(cou.prodCode?.code || cou.prod)">
                  <text class="coupon-card-item-price-unit">随机金额 </text>
                </block>
                <block v-if="coupon3.includes(cou.prodCode?.code || cou.prod)">
                  <text class="coupon-card-item-price-num">
                    {{ cou.paramVo?.discount || '' }}
                  </text>
                  <text class="coupon-card-item-price-unit">折 </text>
                </block>
              </view>
              <view class="coupon-card-item-text coupon-card-item-info">
                {{ showCondition(cou) }}
              </view>

              <view class="coupon-card-item-text">
                <view
                  class="coupon-card-item-text coupon-card-item-btn"
                  :style="{
                    background: specials.color || '#e04838',
                    color: specials.couponColor || '#e04838',
                  }"
                  @click="receiveCoupon(cou)"
                >
                  立刻领取
                </view>
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view class="custom-dots-box dots-round" v-if="couponsList.length > 1">
        <view
          class="custom-dots-show"
          v-for="(_, index) in couponsList"
          :key="index"
          :style="{
            background:
              currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
          }"
        />
      </view>
    </view>
  </view>
  <CouponResultModal
    :visible="modelShow"
    :type="getResult"
    @ok="onConfirm"
    @cancel="onCancel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { queryWarrantyListPageFront } from '@/api/server';
// import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import Storage from '@/utils/storage';
import CouponResultModal from '@/pages/component/CouponResultModal/index.vue';
// import NoneData from './NoneData.vue';
import { getCouponsFront } from '@/pages/api/coupon';

const initBasicsData = useBasicsData();

interface Props {
  title?: string;
  items?: any;
  item?: any;
  policyListNum?: number;
}
const props = withDefaults(defineProps<Props>(), {
  title: '优惠券',
  items: () => ({}),
  item: () => ({}),
  policyListNum: 0,
});

const specials = computed(() => props.items?.param?.doOut?.special || {});

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};

// props.items.param?.coupons
const couponsList = computed(() => {
  if (props.items.param?.coupons) {
    let arr: any = [];
    const listArr: any = [];
    props.items.param?.coupons.map((item: any) => {
      //  v-if="cou.showed"
      if (item.showed) {
        arr.push(item);
        if (arr.length === 8) {
          listArr.push([...arr]);
          arr = [];
        }
      }
    });

    if (arr.length !== 0) {
      listArr.push([...arr]);
      arr = [];
    }
    return listArr;
  }
  return [];
});

// 领取优惠券
const modelShow = ref(false);
const getResult = ref('success');
const receiveCoupon = async (item: any) => {
  if (!initBasicsData.checkLogin) {
    return uni.showModal({
      content: '请先登录账号',
      cancelText: '暂不登录',
      confirmText: '立即登录',
      success: res => {
        if (res.confirm) {
          Router.goLogin();
        }
      },
    });
  }
  const res = await getCouponsFront({
    centerId: item.id,
    couponId: item.couponId,
    mid: initBasicsData.useMid,
    relatedAppId: Storage.getJqzAppId(),
  });
  if (res.code === 0) {
    // 领取成功
    modelShow.value = true;
    getResult.value = 'success';
    // queryReceiveCenterListFront();
  } else if (res.code === 4111) {
    // 已失效
    modelShow.value = true;
    getResult.value = 'invalid';
  } else if (res.code === 4126) {
    // 已领完
    modelShow.value = true;
    getResult.value = 'over';
  }
};
const onConfirm = () => {
  if (getResult.value === 'success') {
    Router.goCodePage('coupon');
  }
};
const onCancel = () => modelShow.value = false;

// 根据类型显示金额
// 满减券 || 工费抵扣券
const coupon1 = ['full_reduction_coupon', 'labor_cost_deduction_coupon'];
//  随机券
const coupon2 = ['random_money_coupon'];
// 折扣券 || 工费折扣券
const coupon3 = ['discount_coupon', 'labor_cost_discount_coupon'];
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

const showCondition = (item: any) => {
  // console.log('item', item);
  const code = item.prodCode?.code || item.prod || '';
  // laborChargesType
  const threshold = item.paramVo?.threshold || '';
  const labor = item.paramVo?.laborChargesType || '';
  if (condition1.includes(code)) {
    return threshold ? `满${threshold}可用` : '满任意金额可用';
  } else if (condition2.includes(code)) {
    const text = labor === 'g' ? '克' : '元';
    return threshold ? `满${threshold}${text}可用` : `满任意${text}可用`;
  }
  return '';
};

// const policyList: any = reactive({ totalRecord: 0, records: [] });

const toDetail = () => {
  //  uni.navigateTo({ url });
  // Router.goCodePage('warranty');
  // Router
  uni.navigateTo({ url: '/my-assets-pages/coupon-center/index' });
};
</script>

<style lang="scss" scoped>
.coupon-card {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  // width: 350px;
  // display: flex;
  // justify-content: flex-start;
  // flex-wrap: nowrap;
  // overflow-x: auto;
  // overflow-y: hidden;
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .coupon-card-item {
    width: 260rpx;
    height: 250rpx;
    // background: #e04838;
    border-radius: 16rpx;
    flex-shrink: 0;
    margin-right: 20rpx;

    .coupon-card-item-text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .coupon-card-item-price {
      height: 120rpx;
      .coupon-card-item-price-unit {
        font-size: 24rpx;
        font-weight: 700;
        // color: #fbe7c3;
        margin-top: 25rpx;
        margin-right: -5rpx;
      }
      .coupon-card-item-price-num {
        font-size: 64rpx;
        font-weight: 700;
        // color: #fbe7c3;
      }
    }
    .coupon-card-item-info {
      // height: 60rpx;
      font-size: 24rpx;
      // color: #fbe7c3;
    }
    .coupon-card-item-btn {
      width: 136rpx;
      height: 48rpx;
      background: linear-gradient(90deg, #fee6cc, #fee6cc);
      border-radius: 24rpx;
      font-size: 24rpx;
      font-weight: 400;

      margin-top: 22rpx;
    }
  }
}

.custom-dots {
  position: relative;
  padding-top: 30rpx;
  padding-bottom: 50rpx;

  .coupon-swiper {
    border-radius: 16rpx;
    overflow: hidden;
  }
  .swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-item-list {
    display: flex;
    justify-content: flex-start;

    width: 660rpx;
    border-radius: 16rpx;
  }
  .coupon-card-item-swiper {
    width: 33.3%;
    height: 250rpx;
    flex-shrink: 0;

    // border: 1px solid white;
    .coupon-card-item-text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .coupon-card-item-price {
      height: 120rpx;
      .coupon-card-item-price-unit {
        font-size: 24rpx;
        font-weight: 700;
        // color: #fbe7c3;
        margin-top: 25rpx;
        margin-right: -5rpx;
      }
      .coupon-card-item-price-num {
        font-size: 64rpx;
        font-weight: 700;
        // color: #fbe7c3;
      }
    }
    .coupon-card-item-info {
      // height: 60rpx;
      font-size: 24rpx;
      // color: #fbe7c3;
    }
    .coupon-card-item-btn {
      width: 136rpx;
      height: 48rpx;
      background: linear-gradient(90deg, #fee6cc, #fee6cc);
      border-radius: 24rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #e04838;
      margin-top: 22rpx;
    }
  }
  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 18rpx;
    left: 0rpx;
    right: 0rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-dots-show {
    border-radius: 6rpx;
    margin-left: 5rpx;
    margin-right: 5rpx;
  }
  .dots-round {
    z-index: 200px;
    .custom-dots-show {
      width: 24rpx;
      height: 6rpx;
    }
  }
}

.coupon-act {
  // width: 690rpx;
  padding: 30rpx;
  padding-bottom: 10rpx;
  // margin: 30rpx 0rpx;
  // background: #fff;
  // border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;
      height: 50rpx;

      .title {
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        color: #323338;
      }

      .number {
        // width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        color: var(--main-color);
      }
    }

    .right {
      .more {
        width: 48rpx;
        height: 34rpx;
        margin-right: 2rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }

      .icon {
        width: 10rpx;
        height: 18rpx;
        color: #b7b8c4;
      }
    }
  }

  .content {
    padding-bottom: 20rpx;
    // padding: 30rpx 0;
    margin-top: 20rpx;
    margin-bottom: 10rpx;

    .orderId {
      display: flex;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 800;
      line-height: 40rpx;
      color: #323338;
    }

    .shopName {
      display: flex;
      align-items: center;
      margin: 16rpx 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // .icon {
      //   flex-shrink: 0;
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .name {
        height: 40rpx;
        margin-left: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .orderTime {
      display: flex;
      align-items: center;
      // height: 50rpx;
      // .icon {
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .time {
        height: 40rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }
    }
  }

  .content {
    border-bottom: solid 2rpx #f8f8f8;
  }
  .content:last-child {
    border-bottom: solid 0rpx white;
  }
}
</style>
