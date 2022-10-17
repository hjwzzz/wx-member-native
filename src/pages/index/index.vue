<template>
  <uni-goods-nav @click="onClick" />
  <view class="content">
    <view class="text-area">
      <view>
        <text class="title">{{ title }}1111111111111</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, inject, watch, onMounted } from 'vue';
// import { getWmColorTheme } from '@/api/server';

onMounted(() => {
  console.log('onMounted');
});
const onClick = () => {};
const title = ref('Hello');
const sss: any = inject('test');
watch(sss, ss => {
  console.log(ss);
});
console.log(sss.value);
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
}
</style>
