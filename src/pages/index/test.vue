<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
  </view>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';
// onMounted(() => {
//   const dddd = inject('pro');
//   console.log(dddd);
// });

const dddd = inject('pro');
console.log('dddd', dddd);

const dddd22 = inject('test');
console.log('dddd22', dddd22);
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
