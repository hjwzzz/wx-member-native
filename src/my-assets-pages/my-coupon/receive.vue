<template>
  <CustomPage>
    <view class="receive">
      <view class="split"></view>
      <view class="receive-hd">
        <text class="title" v-if="curParam">
          {{ curParam.couponName }}
        </text>
        <view class="info xxxx" v-if="curParam">
          <text class="numb" v-if="curParam.prodCode === 'random_money_coupon'">
            {{ curParam.randomAmount }}
          </text>
          <text class="numb" v-else-if="curParam.discount !== 'undefined'">
            {{ curParam.discount }}
          </text>
          <text class="numb" v-else>随机券</text>
          <text
            class="sub"
            v-if="
              curParam.prodCode === 'full_reduction_coupon' ||
              curParam.prodCode === 'random_money_coupon' ||
              curParam.prodCode === 'labor_cost_deduction_coupon'
            "
            >元</text
          >
          <text
            class="sub"
            v-if="
              curParam.prodCode === 'discount_coupon' ||
              curParam.prodCode === 'labor_cost_discount_coupon'
            "
            >折</text
          >
          <!-- prodCode类型
				labor_cost_discount_coupon:工费折扣券,
				labor_cost_deduction_coupon:工费抵扣券,
				random_money_coupon:随机券,
				discount_coupon:折扣券,
				full_reduction_coupon:满减券 -->
        </view>
      </view>
      <view class="receive-disc">
        <view> 好友送你一张优惠券 </view>
        <view> 赶紧点击领取吧！ </view>
      </view>
      <view class="receive-handle" @click="onGetCouponHandle"> 立即领取 </view>
      <view class="receive-logo">
        <u-image
          mode="aspectFit"
          width="auto"
          height="180rpx"
          v-if="logoUrl"
          :src="logoUrl"
        ></u-image>
      </view>
      <CouponResultModal
        :visible="modelShow"
        :type="getResult"
        @ok="onConfirm"
        @cancel="modelShow = false"
      />
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, Ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { getLogo } from '@/api/server';
import { getUserCoupon } from '@/my-assets-pages/api/coupon';
// getUserCoupon
import Router from '@/utils/router';
import CouponResultModal from '@/my-assets-pages/component/CouponResultModal/index.vue';
// import Storage from '@/utils/storage';

const initBasicsData = useBasicsData();

const curParam: any = ref(null);
const modelShow = ref(false);
const getResult = ref('success'); // success 领取成功，invalid 已失效， over 已领完
const handleFlag = ref(false);
const logoUrl = ref('');
const showOption: Ref<any> = ref({});
// const hideOption: Ref<any> = ref({});

onLoad((option: any) => {
  showOption.value = { ...option };
  const ops = { ...option };
  for (const key in ops) {
    ops[key] = decodeURIComponent(ops[key]);
  }
  // if (uni.getStorageSync('onload_receive')) {
  //   curParam.value = ops;
  //   uni.removeStorageSync('onload_receive');
  //   handleFlag.value = false;
  // } else {
  //   curParam.value = ops;
  //   uni.setStorageSync('onload_receive', ops);
  // }
  curParam.value = ops;

  getSiteLogo();
});

const onConfirm = () => {
  Router.goCodePage('coupon');
};

const onGetCouponHandle = async () => {
  if (!initBasicsData.checkLogin) {
    return Router.goCodePage('login');
  }
  if (handleFlag.value) return;
  handleFlag.value = true;
  const params = {
    couponMemberId: curParam.value.couponMemberId,
    donateId: curParam.value.donateId,
    mid: initBasicsData.useMid,
    // relatedAppId: Storage.getJqzAppId(),
  };
  // console.log('params', params);
  setTimeout(() => {
    handleFlag.value = false;
  }, 1000);
  const res = await getUserCoupon(params);
  // console.log(JSON.stringify(res));
  handleFlag.value = false;
  // console.log('getCouponsFront222222', res);
  if (res.data === 30101065) {
    // 优惠券领取成功
    getResult.value = 'success';
    modelShow.value = true;
  } else if (res.data === 30101042) {
    // 已失效
    getResult.value = 'invalid';
    modelShow.value = true;
    //
  } else if (res.data === 30101062) {
    // 已领完
    getResult.value = 'over';
    modelShow.value = true;
  } else if (res.data === 30101043) {
    // 已领
    getResult.value = 'overing';
    modelShow.value = true;
  } else if (res.data === 30101063) {
    // 您不可领取自己转赠的优惠券
    getResult.value = 'self';
    modelShow.value = true;
  } else if (res.code === 401 || res.code === 600) {
    Router.goLogin();
  } else {
    uni.showToast({
      title: res?.msg || '系统开小差了~~',
      duration: 3000,
      icon: 'none',
    });
  }
};

// 获取logo
const getSiteLogo = async () => {
  const res = await getLogo('');
  logoUrl.value = res?.data;
};
</script>

<style lang="scss" scoped>
.receive {
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background-size: 100% auto;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-color: #fff8d7;
  background-image: url('https://static.dev.jqzplat.com/img/receive.png');
  .split {
    height: 220rpx;
  }
  .receive-hd {
    text-align: center;
    padding: 60rpx 0 0;
    height: 400rpx;
    box-sizing: border-box;
    .title {
      font-size: 36rpx;
      font-weight: 500;
      color: #8a5800;
      line-height: 1;
    }
    .info {
      margin-top: 20px;
      line-height: 1;
      .numb {
        font-size: 144rpx;
        font-weight: 800;
        color: #dc3728;
      }
      .sub {
        font-size: 48rpx;
        font-weight: 800;
        color: #dc3728;
      }
    }
  }
  .receive-disc {
    padding: 60rpx 0 0;
    font-size: 36rpx;
    font-weight: 400;
    color: #fbf2c7;
    line-height: 64rpx;
    text-align: center;
    height: 280rpx;
  }
  .receive-handle {
    width: 570rpx;
    height: 100rpx;
    background: linear-gradient(180deg, #faee97 0%, #f0b542 100%);
    box-shadow: 0rpx 6rpx 0rpx 0rpx rgba(252, 125, 41, 1);
    border-radius: 200rpx;
    font-size: 32rpx;
    font-weight: 800;
    color: #b0391b;
    line-height: 100rpx;
    text-align: center;
    margin: 0 auto;
  }
  .receive-logo {
    margin: 180rpx 0 0;
    padding-bottom: 40rpx;
  }
}
.model {
  margin-top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .bianda {
    padding: 0 0 30rpx;
  }
  .text {
    margin-top: 20rpx;
  }
  .modelimg {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-top: 50rpx;
  }
}
</style>
