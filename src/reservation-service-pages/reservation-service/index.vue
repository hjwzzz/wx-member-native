<template>
  <CustomPage bottom>
    <view class="reservation-service">
      <SearchServe :data="data" />
    </view>
    <view v-if="!Object.keys(data).length" class="footer">
      <view class="btn" @click="seeMyAppointment">查看我的预约</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref, Ref } from 'vue';
import SearchServe from '../component/SearchServe.vue';

const data: Ref<any> = ref({});

onLoad((opting: any) => {
  data.value = opting;
});

const isShowBtn = computed(() => Object.keys(data.value).length === 0);

const seeMyAppointment = () => {
  uni.navigateTo({ url: '/reservationService/myAppointment/index' });
};
</script>

<style lang="scss" scoped>
.isbtn {
  padding-bottom: calc(94rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(94rpx + env(safe-area-inset-bottom));
}
.footer {
  background: #fff;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  // padding: 0rpx 0;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  z-index: 30;
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 32rpx;
    margin-right: 32rpx;
    border-radius: 46rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: white;
    background: var(--main-color);
  }
}
.reservation-service {
}
</style>
