<template>
  <web-view :src="webViewUrl" />
</template>

<script setup lang="ts">
import { onLoad, onShow, onShareAppMessage } from '@dcloudio/uni-app';
import Storage from '@/utils/storage';
import { h5Url } from '@/utils/config';
import { ref, Ref } from 'vue';
import { shareHold, shareAppMessage } from '@/utils/shareHold';
import { queryShareSett } from '@/api/index';

const mid = Storage.getMid();
const jqzAppid = Storage.getJqzAppId();
const epid = Storage.getEpid();
const token = Storage.getToken();

const param = `?appId=${jqzAppid}&appType=mini&epid=${epid}&token=${token}&mid=${mid}`;
const lastUrl = `${h5Url}/#/pointsMallGages/tabber/index${param}`;
const webViewUrl = ref(lastUrl);
onLoad((option: any) => {
  // console.log(option);
  if (option.productId) {
    webViewUrl.value = `${h5Url}/#/pointsMallGages/productDetails/index${param}&productId=${option.productId}`;
  }
  // /pointsMallGages/productDetails/index?id=${id}
  // productId
});

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
    fail: () => {
      console.log('...');
    },
  });
  getShareSet();
});

const shareData: Ref<any> = ref([]);
const getShareSet = async () => {
  const res = await queryShareSett({ pageName: 'WMGFT_INDEX' });
  // 控住分享
  shareHold(res.data);
  shareData.value = {
    title: '积分商城',
    path: '/my-assets-pages/point-mall/index',
    shareObj: res.data,
  };
};
onShareAppMessage(() => shareAppMessage(shareData.value));
// webview 不支持分享到朋友圈
// onShareTimeline(() => shareTimeline(shareData.value));
</script>

<style lang="scss" scoped></style>
