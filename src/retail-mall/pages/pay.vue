<template>
  <view> </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { saveOrderPayRequest } from '@/api/mall';
import { ref } from 'vue';

const showToast = (title: string) => {
  uni.showToast({
    title,
    duration: 3000,
    icon: 'none',
  });
};

const orderId = ref('');

onLoad((option: any) => {
  if (option.orderId) {
    startPay({ orderId: option.orderId, opsId: option.opsId });
    orderId.value = option.orderId;
  } else {
    return showToast('订单ID为空');
  }
});

const startPay = async ({ orderId, opsId }: { orderId: string, opsId: string }) => {
  uni.showLoading({ title: '正在调起支付' });
  let provider;
  uni.getProvider({
    service: 'payment',
    success(res) {
      provider = res.provider[0];
    },
  });

  const { data, msg, code } = await saveOrderPayRequest({ orderId, opsId });
  uni.hideLoading();
  if (code !== 0) {
    showToast(msg);
    setTimeout(() => {
      uni.setStorage({
        key: 'mallPay',
        data: { type: 'fail', orderId, opsId },
        success() {
          uni.navigateBack({ delta: 1 });
        },

      });
    }, 1500);
  }
  uni.requestPayment({
    provider: provider || 'wxpay',
    orderInfo: '',
    nonceStr: data.nonceStr,
    package: data.packageValue,
    paySign: data.paySign,
    signType: data.signType,
    timeStamp: `${data.timeStamp}`,
    // total_fee: 2000,
    success: () => {
      goNextStep({ type: 'success', orderId, opsId });
    },
    fail: () => {
      showToast('支付失败');
      goNextStep({ type: 'fail', orderId, opsId });
    },
  });
};

const goNextStep = (params: any) => {
  // 开启存储
  uni.setStorage({
    key: 'mallPay',
    data: params,
    success() {
      uni.navigateBack({ delta: 1 });
    },
  });
};
</script>

<style lang="scss" scoped></style>
