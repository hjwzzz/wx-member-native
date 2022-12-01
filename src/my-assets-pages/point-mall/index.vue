<template>
  <web-view :src="webViewUrl" @message="onMiniMessage" />
</template>

<script setup lang="ts">
import { onLoad, onShow, onShareAppMessage } from '@dcloudio/uni-app';
import Storage from '@/utils/storage';
import { h5Url } from '@/utils/config';
import { ref, Ref } from 'vue';
import { shareHold, shareAppMessage } from '@/utils/shareHold';
import { queryShareSett } from '@/api/index';
import Router from '@/utils/router';
import { useBasicsData } from '@/store/basicsData';

// const mid = Storage.getMid();
const jqzAppid = Storage.getJqzAppId();
const epid = Storage.getEpid();
// const token = Storage.getToken();
const mid = ref(Storage.getMid());
const token = ref(Storage.getToken());
const initBasicsData = useBasicsData();

const param = `?appId=${jqzAppid}&appType=mini&epid=${epid}&token=${token.value}&mid=${mid.value}`;
const lastUrl = `${h5Url}/#/pointsMallGages/tabber/index${param}`;
const webViewUrl = ref(lastUrl);
onLoad((option: any) => {
  if (option.productId) {
    webViewUrl.value = `${h5Url}/#/pointsMallGages/productDetails/index${param}&productId=${option.productId}`;
  }
  if (option.scene) {
    webViewUrl.value = `${h5Url}/#/pointsMallGages/productDetails/index${param}&scene=${option.scene}`;
  }
  if (option.name) {
    webViewUrl.value = `${lastUrl}&name=${option.name}`;
  }

  if (!initBasicsData.checkLogin) {
    Router.goLogin(
      `/my-assets-pages/point-mall/index${getParams(option)}`,
      true
    );
  }
});

const getParams = (Params: any) => `?${Object.entries(Params)
  .map(([k, v]) => `${k}=${v}`)
  .join('&')}`;

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
      } else {
        uni.showToast({
          title: '支付失败!',
          duration: 3000,
          icon: 'none',
        });
      }
    },
    fail: () => {
      console.log('...');
    },
  });
  setTimeout(() => {
    getShareSet();
  }, 2500);
});

const shareSettData: Ref<any> = ref([]);
const shareData: Ref<any> = ref([]);
const getShareSet = async () => {
  const res = await queryShareSett({ pageName: 'WMGFT_INDEX' });
  shareSettData.value = res.data;
  // 控住分享
  shareHold(res.data);
  shareData.value = {
    title: '积分商城',
    path: '/my-assets-pages/point-mall/index',
    shareObj: res.data,
  };
};

const messageType = ref('null');
const messageData: Ref<any> = ref({});
const shareName = ref('');
const shareImage = ref('');
const onMiniMessage = (message: any) => {
  const data = message.detail.data;
  const lastData = data[data.length - 1];
  messageType.value = lastData.showType;
  if (messageType.value === 'product-details') {
    shareName.value = lastData.title;
    shareImage.value = lastData.imageUrl;
    messageData.value = {
      title: lastData.title,
      path: `/my-assets-pages/point-mall/index?productId=${lastData.id}`,
      shareObj: shareSettData.value,
    };
  }
};

onShareAppMessage(() => {
  if (messageType.value === 'product-details') {
    return shareAppMessage(
      messageData.value,
      shareName.value,
      shareImage.value
    );
  }
  return shareAppMessage(shareData.value);
});
// webview 不支持分享到朋友圈
// onShareTimeline(() => shareTimeline(shareData.value));
</script>

<style lang="scss" scoped></style>
