<template>
  <view></view>
</template>

<script setup lang="ts">
import { getAdressList } from '@/api/address';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
const adressList = ref([]);
const store = useBasicsData();
console.log(store.useMid);

const getData = (flag = false) => {
  getAdressList({ mid: store.useMid || 'C880523C-623F-BAC9-D951-07FCC9E9A9E4' })
    .then(res => {
      const { records } = res.data;
      adressList.value = records;
      if (flag) {
        setTimeout(() => {
          uni.showToast({
            title: '设置成功',
            duration: 3000,
          });
        }, 500);
      }
    });
};
onLoad(() => {
  getData();
});
</script>

<style scoped></style>
