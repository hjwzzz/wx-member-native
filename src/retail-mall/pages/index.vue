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
import { shareAppMessage } from '@/utils/shareHold';

const mallPathMap = {

  /** 首页 */
  home: '/mall/pages/home/index',

  /** 分类 */
  category: '/mall/pages/category/index',

  /** 购物车 */
  shoppingCart: '/mall/pages/shopping-cart/index',

  /** 我的订单 */
  orderList: '/mall/pages/order/list',

  /** 我的收藏 */
  collect: '/mall/pages/collect/index',

  /** 地址管理 */
  address: '/mall/pages/address/list',

  /** 公告 */
  announcement: '/mall/pages/announcement/index',

  /** 门店信息 */
  shop: '/mall/pages/shop/index',

  /** 门店信息 */
  personalCenter: '/mall/pages/personal-center/index',

  /** 跳转商品详情页 */
  goodsDetail: '/mall/pages/goods/detail'
};


const authPath = [
  mallPathMap.shoppingCart,
  mallPathMap.orderList,
  mallPathMap.collect,
  mallPathMap.address,
  mallPathMap.personalCenter,
];

const messageData = ref<any>({});
const messageType = ref('null');
const shareName = ref('');
const shareImage = ref('');
const shareSettData = ref<any>([]);
const shareData = ref<any>([]);

const getParams = (params: Record<string, string | undefined>) => `${Object.entries(params)
  .map(([k, v]) => `${k}=${v}`)
  .join('&')}`;
// const appId = Storage.getJqzAppId();
// const epid = Storage.getEpid();
// const mid = Storage.getMid();
// const token = Storage.getToken();

const initBasicsData = useBasicsData();

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
    appId: Storage.getJqzAppId(),
    epid: Storage.getEpid(),
    mid: Storage.getMid(),
    token: Storage.getToken(),
    appType: 'mini'
  };

  /**
   * 如果是支付
   */
  const mallPay = uni.getStorageSync('mallPay');
  uni.removeStorage({ key: 'mallPay' });

  if (mallPay.type === 'fail') {
    uni.showToast({
      title: '支付失败!',
      duration: 3000,
      icon: 'none',
    });

    webViewUrl.value = `${h5Url}/#/mall/pages/pay/fail?${getParams(defaultParams.value)}&orderId=${mallPay.orderId}&opsId=${mallPay.opsId}`;
    return;
  }

  if (mallPay.type === 'success') {
    uni.showToast({
      title: '支付成功!',
      duration: 3000,
      icon: 'none',
    });

    webViewUrl.value = `${h5Url}/#/mall/pages/pay/success?${getParams(defaultParams.value)}&orderId=${mallPay.orderId}&opsId=${mallPay.opsId}`;
    return;
  }

  /**
   * 有 path , 是从 H5 跳转过来的
   */
  const { path, ...rest } = routerQuery.value;

  if (path) {

    /**
     * 如果是需要登录的页面
     */
    if (!initBasicsData.checkLogin) {
      if (authPath.includes(path)) {
        Router.goLogin(
          `/retail-mall/pages/index?path=${path}${getParams(rest)}`,
          true
        );
        return;
      }
    }

    /**
     * 如果是商品详情页面
     */
    // if (path === '/mall/pages/goods/detail') {
    //   webViewUrl.value = `${h5Url}/#${path}?${getParams({ ...rest, ...defaultParams.value })}`;
    //   return;
    // }

    // routerQuery.value = rest;
    webViewUrl.value = `${h5Url}/#${path}?${getParams({ ...rest, ...defaultParams.value })}`;
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

const onMiniMessage = (message: any) => {
  const data = message.detail.data;
  const lastData = data[data.length - 1];
  messageType.value = lastData.showType;
  if (messageType.value === 'goodsdetails') {
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
  if (messageType.value === 'goodsDetails') {
    return shareAppMessage(
      messageData.value,
      shareName.value,
      shareImage.value
    );
  }
  return shareAppMessage(shareData.value);
});
</script>

<style lang="scss" scoped></style>
