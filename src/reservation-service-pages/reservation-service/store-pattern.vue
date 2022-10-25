<template>
  <CustomPage bottom> qqqqqqqqqqqqqqqqqqqqqqqqqqq </CustomPage>
</template>

<script setup lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
// import { computed, ref, Ref } from 'vue';
// import SearchServe from '../component/SearchServe.vue';

// const data: Ref<any> = ref({});

// onLoad((opting: any) => {
//   data.value = opting;
// });

// const isShowBtn = computed(() => Object.keys(data.value).length === 0);

// const seeMyAppointment = () => {
//   uni.navigateTo({ url: '/reservationService/myAppointment/index' });
// };
</script>

<style lang="scss" scoped>
.isbtn {
  padding-bottom: calc(94rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(94rpx + env(safe-area-inset-bottom));
}
.reservation-service {
  height: 100vh;

  position: relative;
  .main {
    /*height: calc(100vh - 112rpx);*/
    height: 100%;
    position: relative;
    search-serve {
      width: 100vw;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .footer {
    background: #fff;
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10rpx 32rpx;
    padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
    z-index: 30;
    .btn {
      border-radius: 46rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      color: var(--main-color);
    }
  }
}
</style>
