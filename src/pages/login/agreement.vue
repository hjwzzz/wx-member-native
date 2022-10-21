<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <CustomPage>
    <view class="post">
      <view v-html="content"></view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import CustomPage from '@/components/CustomPage/index.vue';

const content = ref('');
onLoad(async e => {
  const { content: c, title } = JSON.parse(e.eula || '');
  content.value = c;
  uni.setNavigationBarTitle({ title });
});
</script>

<style scoped>
.post {
  margin: 0 15px;
  padding: 15px 0;
}
</style>
