<template>
  <web-view :src="webViewUrl" @message="onMiniMessage" />
</template>

<script setup lang="ts">
import { onLoad, onShow, onShareAppMessage } from '@dcloudio/uni-app';
import Storage from '@/utils/storage';
import { h5Url } from '@/utils/config';
import { ref } from 'vue';
import Router from '@/utils/router';
import { useBasicsData } from '@/store/basicsData';


const getParams = (params: Record<string, string | undefined>) => `${Object.entries(params)
  .map(([k, v]) => `${k}=${v}`)
  .join('&')}`;
// const appId = Storage.getJqzAppId();
// const epid = Storage.getEpid();
// const mid = Storage.getMid();
// const token = Storage.getToken();

const routerQuery = ref<Record<string, string | undefined>>({});
const defaultParams = ref<Record<string, string | undefined>>({});
const defaultUrl = `${h5Url}/#/mall/pages/home/index`;
const webViewUrl = ref('');

// const mallPathMap = { goodsDetail: '/mall/pages/goods/detail' };


onLoad(option => {
  routerQuery.value = option;

  uni.removeStorageSync('mallUrl');
});


onShow(() => {
  defaultParams.value = {
    // appId: Storage.getJqzAppId(),
    // epid: Storage.getEpid(),
    mid: Storage.getMid(),
    token: Storage.getToken(),
    appType: 'mini'
  };


  const mallPay = uni.getStorageSync('mallPay');
  uni.removeStorage({ key: 'mallPay' });

  if (mallPay.type === 'fail') {
    uni.showToast({
      title: '支付失败!',
      duration: 3000,
      icon: 'none',
    });

    webViewUrl.value = `${h5Url}/#/mall/pages/pay/fail?${getParams(defaultParams.value)}&orderId=${mallPay.orderId}`;
    return;
  }

  if (mallPay.type === 'success') {
    uni.showToast({
      title: '支付成功!',
      duration: 3000,
      icon: 'none',
    });

    webViewUrl.value = `${h5Url}/#/mall/pages/pay/success?${getParams(defaultParams.value)}&orderId=${mallPay.orderId}`;
    return;
  }

  /**
   * 有 path , 是从 H5 跳转过来的
   */
  if (routerQuery.value.path) {
    const { path, ...rest } = routerQuery.value;
    routerQuery.value = rest;
    webViewUrl.value = `${h5Url}/#${path}?${getParams(rest)}`;
    return;
  }

  const mallUrl = Storage.getMallUrl();

  if (mallUrl) {
    const url = decodeURIComponent(mallUrl);
    console.log(url);
    webViewUrl.value = `${url}${url.includes('?') ? '&' : '?'}${getParams(defaultParams.value)}`;
  } else {
    webViewUrl.value = `${defaultUrl}?${getParams(defaultParams.value)}`;
  }

});
</script>

<style lang="scss" scoped></style>
