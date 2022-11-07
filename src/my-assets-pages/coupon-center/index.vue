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
        :showStatus="item.surplus && !item.restrictStatus"
      >
        <template #btn="{ color, background }">
          <view
            class="receive"
            :style="{
              color,
              background,
            }"
            @click.stop="receiveCoupon(item)"
          >
            <text> 领取</text>
          </view>
        </template>
        <template #image>
          <image
            v-if="item.surplus === 0"
            :src="staticUrl + 'img/overNumber.png'"
            class="status-image"
            mode=""
          ></image>
          <image
            v-else-if="item.restrictStatus === 1"
            :src="staticUrl + 'img/geted.png'"
            class="status-image"
            mode=""
          ></image>
        </template>

        <template #bottom-left>
          <text>
            {{ item.couponValidTime }}
          </text>
        </template>
        <template #bottom-rigth>
          <text> 已领取 {{ item.percentage }} </text>
        </template>
      </CouponItem>
    </view>
    <view class="preferential" v-else>
      <image :src="staticUrl + 'img/Salesperson.png'" mode=""></image>
      <view class="text"> 暂无优惠券信息 </view>
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
import { onMounted, reactive, ref } from 'vue';
import type {
  AdvertList,
  QueryReceiveCenterListForm,
  ReceiveCenterList,
} from './index.type';
import {
  getCouponsFront,
  queryAdvertFront,
  queryCouponCenterListFront,
} from '@/my-assets-pages/api/coupon';

import CouponItem from '@/my-assets-pages/component/CouponItem/index.vue';
import CouponResultModal from '@/my-assets-pages/component/CouponResultModal/index.vue';
import { staticUrl } from '@/utils/config';
import Storage from '@/utils/storage';
import Router from '@/utils/router';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();
const advertList = ref<AdvertList>([]);
const receiveCenterList = ref<ReceiveCenterList>([]);
const queryReceiveCenterListForm = reactive<QueryReceiveCenterListForm>({
  createTime: '',
  opsId: '',
  pageSize: 10000,
  curPage: 1,
});

const getAdvertFront = async () => {
  const { data } = await queryAdvertFront('');
  if (!data) {
    return;
  }
  advertList.value = data;
};
const queryReceiveCenterListFront = async () => {
  const { data } = await queryCouponCenterListFront(queryReceiveCenterListForm);
  if (!data) {
    return;
  }
  receiveCenterList.value = data.records;
};

onMounted(() => {
  getAdvertFront();
  queryReceiveCenterListFront();
});

// 领取优惠券
const modelShow = ref(false);
const getResult = ref('success');
const receiveCoupon = async (item: any) => {
  if (!initBasicsData.checkLogin) {
    return uni.showModal({
      content: '请先登录账号',
      cancelText: '暂不登录',
      confirmText: '立即登录',
      success: res => {
        if (res.confirm) {
          Router.goLogin();
        }
      },
    });
  }
  const res = await getCouponsFront({
    centerId: item.id,
    couponId: item.couponId,
    mid: initBasicsData.useMid,
    relatedAppId: Storage.getJqzAppId(),
  });
  if (res.code === 0) {
    // 领取成功
    modelShow.value = true;
    getResult.value = 'success';
    queryReceiveCenterListFront();
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

const onConfirm = () => {
  if (getResult.value === 'success') {
    Router.goCodePage('coupon');
  }
};
const onCancel = () => modelShow.value = false;
</script>

<style lang="scss" scoped>
.coupon-list {
  padding: 30rpx;
  .receive {
    height: 48rpx;
    padding: 0 30rpx;
    line-height: 48rpx;
    border-radius: 28rpx;
    font-size: 28rpx;
  }
  .status-image {
    width: 116rpx;
    height: 96rpx;
  }
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
