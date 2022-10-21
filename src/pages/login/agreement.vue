<template>
  <view class="post">
    <text class="content"> </text>
    <view class="footer"> 技术支持：金千枝数智云 </view>
  </view>
</template>

<script setup lang="ts">
import { getMemberEula } from '@/api/login';
import { onLoad } from '@dcloudio/uni-app';

let protocol;
let eulas;
onLoad(async () => {
  const { code, data } = await getMemberEula('');

  if (code === 0) {
    protocol = Object.assign({}, data);
    eulas = data.eulas;
    console.log(protocol, eulas);

    // A隐私协议
    // uni.setStorageSync('protocolA', this.eulas[0]['content']);
    // // B 注册协议
    // uni.setStorageSync('protocolB', this.eulas[1]['content']);
  }
});
</script>

<style scoped>
.post {
  margin: 0 15px;
  padding: 15px 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  margin: 0 40rpx;
  text-align: center;
}
</style>
