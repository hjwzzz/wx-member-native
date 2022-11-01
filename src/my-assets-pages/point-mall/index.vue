<template>
  <web-view :src="webViewUrl" />
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import Storage from '@/utils/storage';
import { h5Url } from '@/utils/config';
import { ref } from 'vue';

const mid = Storage.getMid();
const jqzAppid = Storage.getJqzAppId();
const epid = Storage.getEpid();
const token = Storage.getToken();

const param = `?appId=${jqzAppid}&appType=mini&epid=${epid}&token=${token}&mid=${mid}`;
const lastUrl = `${h5Url}/#/pointsMallGages/tabber/index${param}`;
const webViewUrl = ref(lastUrl);
onShow(() => {
  uni.getStorage({
    key: 'ProductShopPayment',
    success: (res: any) => {
      // 每次取完值后进行清空处理
      uni.removeStorage({ key: 'ProductShopPayment' });
      const { type, page, id } = res.data;
      if (type === 'success') {
        // webViewUrl.value = `${h5Url}/#/pointsMallGages/paySuccess/index?payState=${1}&page=${page}&id=${id}`
        webViewUrl.value = `${h5Url}/#/pointsMallGages/paySuccess/index${param}&payState=${1}&page=${page}&id=${id}`;
      }
    },
  });
});
</script>

<style lang="scss" scoped></style>
