<template>
  <web-view :src="url" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getMemberWarrantyUrlFront } from '@/my-assets-pages/api/quality';

const url = ref('');
onLoad(async (options: any) => {
  const res = await queryMemberWarrantyUrl(options);
  if (res.data.url) {
    url.value = `${res.data.url}?n=${options.n}&t=${options.t}&a=${options.a}&e=${options.e}`;
  } else {
    uni.showToast({
      title: '请联系商家配置门店质保单模板',
      duration: 3000,
      icon: 'none',
    });
  }

  if (options.url) {
    // const res = await queryMemberWarrantyUrl(options);
    // console.log('res', res);
    // url.value = `${res.data.url}?n=${options.n}&t=${options.t}&a=${options.a}&e=${options.e}`;
    uni.setNavigationBarTitle({ title: options.kind === 'BAS' ? '质保单详情' : '质保单' });
  } else {
    // const res = await queryMemberWarrantyUrl(options);
    // console.log('res', res);
    // url.value = `${res.data.url}?n=${options.n}&t=${options.t}&a=${options.a}&e=${options.e}`;
    uni.setNavigationBarTitle({ title: res.data.kind === 'CUST' ? '质保单' : '质保单详情' });
  }
});

const queryMemberWarrantyUrl = async (obj: any) => {
  const url = await getMemberWarrantyUrlFront({
    opsId: '',
    ticket: obj.n,
  });
  return url;
};
</script>

<style lang="scss" scoped></style>
