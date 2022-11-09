<template>
  <web-view :src="url" />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getMemberWarrantyUrlFront } from '@/my-assets-pages/api/quality';

const url = ref('');
onLoad(async (options: any) => {
  if (options.url) {
    const res = await queryMemberWarrantyUrl(options);
    url.value = `${res.data.url}?n=${options.n}&t=${options.t}&a=${options.a}&e=${options.e}`;
    uni.setNavigationBarTitle({ title: options.kind === 'BAS' ? '质保单详情' : '质保单' });
  } else {
    const res = await queryMemberWarrantyUrl(options);
    url.value = `${res.data.url}?n=${options.n}&t=${options.t}&a=${options.a}&e=${options.e}`;
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
