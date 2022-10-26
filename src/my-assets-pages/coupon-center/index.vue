<template>
  <CustomPage>
    <swiper class="advert-list" v-if="advertList.length">
      <swiper-item
        v-for="item in advertList"
        :key="item.imgUrl"
        class="advert-list-item"
      >
        <image mode="aspectFill" :src="item.imgUrl"></image>
      </swiper-item>
    </swiper>

    <view class="coupon-list" v-if="receiveCenterList.length">
      <CouponItem
        :item="item"
        v-for="item in receiveCenterList"
        :key="item.couponId"
      >
      </CouponItem>
    </view>
    <view class="preferential" v-else>
      <image :src="staticUrl + 'img/Salesperson.png'" mode=""></image>
      <view class="text"> 暂无优惠券信息 </view>
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type {
  AdvertList,
  QueryReceiveCenterListForm,
  ReceiveCenterList,
} from './index.type';
import {
  queryAdvertFrontRequest,
  queryReceiveCenterListFrontRequest,
} from '@/api/coupon-center';
import CouponItem from '@/my-assets-pages/component/CouponItem/index.vue';
import { staticUrl } from '@/utils/config';

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

<style lang="scss" scoped>
// page {
//   padding: 30rpx;
// }

.coupon-list {
  padding: 30rpx;
}
.preferential {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  image {
    width: 320rpx;
    height: 320rpx;
  }

  .text {
    text-align: center;
    font-size: 28rpx;
    color: #9697a2;
  }
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
