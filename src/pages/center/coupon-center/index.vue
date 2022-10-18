<template>
<swiper class="advert-list">
    <swiper-item v-for="item in advertList" :key="item.imgUrl" class="advert-list-item">
      <image mode="aspectFill" :src="item.imgUrl"></image>
    </swiper-item>
  </swiper>

  <view class="coupon-list">
    <coupon-item :item="item" v-for="item in receiveCenterList" :key="item.couponId">
    </coupon-item>
  </view>

  <page-footer></page-footer>

</template>
<script lang='ts' setup>
import { onMounted, reactive, ref } from 'vue';
import type { AdvertList, QueryReceiveCenterListForm, ReceiveCenterList } from './index.type';
import {
  queryAdvertFrontRequest,
  queryReceiveCenterListFrontRequest,
} from '@/api/coupon-center';
import CouponItem from '@/components/CouponItem/index.vue';
import PageFooter from '@/components/PageFooter/index.vue';

const advertList = ref<AdvertList>([]);
const receiveCenterList = ref<ReceiveCenterList>([]);

const queryReceiveCenterListForm = reactive<QueryReceiveCenterListForm>({
  createTime: '',
  opsId: '57614F85-F843-C47C-B965-0753D121430F',
  pageSize: 10000,
  curPage: 1,
});

const queryAdvertFront = async () => {
  const queryAdvertFrontRequestRes = await queryAdvertFrontRequest();

  if (!queryAdvertFrontRequestRes?.data) {
    return;
  }

  advertList.value = queryAdvertFrontRequestRes.data;
};
const queryReceiveCenterListFront = async () => {
  const queryReceiveCenterListFrontRequestRes =
        await queryReceiveCenterListFrontRequest(queryReceiveCenterListForm);

  if (!queryReceiveCenterListFrontRequestRes?.data) {
    return;
  }

  receiveCenterList.value = queryReceiveCenterListFrontRequestRes.data.records;
};

onMounted(() => {
  queryAdvertFront();
  queryReceiveCenterListFront();
});
</script>

<style lang='scss' scoped>
page {
  padding: 30rpx;
}

.advert-list {
  width: 100%;
  height: 300rpx;
  margin-bottom: 10px;

  .advert-list-item {
    width: 100%;
    height: 100%;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
