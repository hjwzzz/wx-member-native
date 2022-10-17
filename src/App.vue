<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { provide, ref } from 'vue';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

const dddd = ref('22222222');
setTimeout(() => {
  dddd.value = '开始的换届大会';
}, 5000);

provide('test', dddd);
</script>
<style lang="less">
.dddd {
  height: 22rpx;

  .aaa {
    height: 22rpx;
  }
}
</style>
