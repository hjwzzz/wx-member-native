<template>
  <view> </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import Router from '@/utils/router';
onLoad(query => {
  Router.goCodePage('invite_courteous', query, 'redirectTo');
});
</script>
