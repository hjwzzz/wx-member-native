<template>
  <CustomPage bottom>
    <view class="detail">
      <view class="coupon-box">
        <!-- :showStatus="ticketData.couponStatus === 'EFFECTIVE'" -->
        <CouponItem :item="ticketData" :showStatus="true">
          <template #bottom-left>
            <text>
              <!-- 有效期：{{ ticketData.cutValidTime }}至{{
                ticketData.cutExpireTime
              }} -->
              {{ ticketData.couponValidTime }}
            </text>
          </template>
        </CouponItem>
      </view>
      <view class="descBox">
        <view class="title">
          <text class="letter">使用说明</text>
        </view>
        <view class="content" v-if="ticketData.description">
          <view v-html="richImage(ticketData.description)"></view>
        </view>
      </view>
    </view>
    <view class="center-box btn-box">
      <view
        class="center-box btn-item"
        :style="{
          background: isDisabled ? '#D8D9E0' : initBasicsData.mainColor,
        }"
        @click="getCoupon()"
      >
        <text v-if="ticketData.restrictStatus === 1">已领取</text>
        <text v-else-if="ticketData.surplus === 0">已领完</text>
        <text v-else>立即领取</text>
      </view>
    </view>

    <CouponResultModal
      :visible="modelShow"
      :type="getResult"
      @ok="onConfirm"
      @cancel="onCancel"
    />
  </CustomPage>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import CouponItem from '@/my-assets-pages/component/CouponItem/index.vue';
import { computed, ref, Ref } from 'vue';
import { richImage } from '@/utils/util';
// import { queryCouponPageFront } from '@/my-assets-pages/api/coupon';
import { useBasicsData } from '@/store/basicsData';
// import { staticUrl } from '@/utils/config';
import Router from '@/utils/router';
import Storage from '@/utils/storage';
import CouponResultModal from '@/my-assets-pages/component/CouponResultModal/index.vue';
import {
  getCouponsFront,
  getCouponCenterDetailFront,
  getCenterCouponIdByStorageFront,
} from '@/my-assets-pages/api/coupon';
// initBasicsData.mainColor
const initBasicsData = useBasicsData();
const modelShow = ref(false);
const getResult = ref('success');
const onConfirm = () => {
  Router.goCodePage('coupon');
};
const onCancel = () => {
  modelShow.value = false;
  getDetail();
};
const ticketData: Ref<any> = ref({});
const getCoupon = async () => {
  if (!initBasicsData.checkLogin) {
    return uni.showModal({
      content: '请先登录账号',
      cancelText: '暂不登录',
      confirmText: '立即登录',
      success: res => {
        if (res.confirm) {
          Router.goCodePage('login');
        }
      },
    });
  }
  const res = await getCouponsFront({
    centerId: ticketData.value.id,
    couponId: ticketData.value.couponId,
    mid: initBasicsData.useMid,
    relatedAppId: Storage.getJqzAppId(),
  });
  if (res.code === 0) {
    // 领取成功
    modelShow.value = true;
    getResult.value = 'success';
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

const isDisabled = computed(() => !(ticketData.value.surplus && !ticketData.value.restrictStatus));

// 分享或者转赠优惠券
// onShareAppMessage((res: any) => onShareCoupon(res));

const couponId = ref('');
const couponOptions = ref({});

onLoad((options: any) => {
  const { id = '' } = options;
  couponOptions.value = options;
  couponId.value = id;

  if (couponId.value) {
    return getDetail();
  }

  const scene: any = options?.scene || wx.getLaunchOptionsSync().scene;
  if (scene) {
    uni.setStorageSync('couponDetailscene', scene);
    getParamData(scene);
  } else {
    const m_scene = uni.getStorageSync('couponDetailscene');
    getParamData(m_scene);
  }

  // if (!id) {
  //   const couponDetailNum = options?.num;
  //   console.log('scene', scene);
  //   if (scene) {
  //     uni.setStorageSync('couponDetailNum', scene);
  //     getParamData(scene);
  //   } else if (couponDetailNum) {
  //     uni.setStorageSync('couponDetailNum', couponDetailNum);
  //     getParamData(couponDetailNum, options);
  //   } else {
  //     const data = uni.getStorageSync('couponDetailNum');
  //     getParamData(data);
  //   }
  // } else {
  //   getDetail();
  // }
  // couponName.value = options.name;
  // couponStatus.value = options.status;
  // createdtatus();
});

// getCenterCouponIdByStorageFront
const getParamData = async (scene: any, ops = {}) => {
  const res = await getCenterCouponIdByStorageFront(scene);
  couponId.value = res.data;
  getDetail();
};

const getDetail = async () => {
  // const params = { centerId: couponId.value };
  const res = await getCouponCenterDetailFront(couponId.value);
  if (res.code === 0) {
    // console.log('res.data', res.data);
    ticketData.value = res.data;
    // Object.assign(ticketData, res.data);
  }
};
</script>

<style lang="scss" scoped>
// .content-text {
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   word-break: break-all;
// }

.detail {
  // width: 100%;
  // height: 100%;
  // min-height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}

.descBox {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 24rpx 30rpx;
  box-sizing: border-box;

  .title {
    .letter {
      // width: 128rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #323338;
      line-height: 44rpx;
    }
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: #9697a2;
    line-height: 52rpx;
    margin-top: 20rpx;

    .content-text {
      display: inline-block;
    }
  }
}

.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .btn-item {
    height: 80rpx;
    width: 80vw;
    color: #fff;
    font-size: 28rpx;
    border-radius: 200rpx;
  }
}

.coupon-box {
  padding: 30rpx 30rpx 0;
}
</style>
