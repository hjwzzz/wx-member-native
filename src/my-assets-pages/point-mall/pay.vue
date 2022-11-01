<template>
  <view> </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getPayOrder } from '@/api/server';
import { ref } from 'vue';

const showToast = (title: string) => {
  uni.showToast({
    title,
    duration: 3000,
    icon: 'none',
  });
};

const page = ref(1);
const orderId = ref('');
onLoad((option: any) => {
  if (option.id) {
    startPay(option.id);
    page.value = option.page || 1;
    orderId.value = option.id;
  } else {
    return showToast('订单ID为空');
  }
});

const startPay = async (id: string) => {
  uni.showLoading({ title: '正在调起支付' });
  let provider;
  uni.getProvider({
    service: 'payment',
    success(res) {
      provider = res.provider[0];
    },
  });

  const { data, msg, code } = await getPayOrder({ orderId: id });
  uni.hideLoading();
  if (code !== 0) {
    return showToast(msg);
  }
  uni.requestPayment({
    provider: provider || 'wxpay',
    orderInfo: '',
    nonceStr: data.nonceStr,
    package: data.package,
    paySign: data.paySign,
    signType: data.signType,
    timeStamp: `${data.timeStamp}`,
    // total_fee: 2000,
    success: () => {
      goNextStep({ type: 'success', page: page.value, id: orderId.value });
    },
    fail: () => {
      showToast('支付失败');
      goNextStep({ type: 'fail' });
    },
    // complete: err => {
    // },
  });
};

const goNextStep = (params: any) => {
  // 开启存储
  uni.setStorage({
    key: 'ProductShopPayment',
    data: params,
    success() {
      uni.navigateBack({ delta: 1 });
    },
  });
};
</script>

<style lang="scss" scoped></style>
