<template>
  <CustomPage>
    <view class="post">
      <view v-html="richImage(content)"></view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getCurrentInstance, ref } from 'vue';
import CustomPage from '@/components/CustomPage/index.vue';
const { proxy }: any = getCurrentInstance();
const content = ref('');
onLoad(() => {
  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
  const eventChannel = proxy.getOpenerEventChannel();
  eventChannel?.on('data', function ([{ content: c, title }]: [any]) {
    content.value = c;
    uni.setNavigationBarTitle({ title });
  });
});
const richImage = (item = '') => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  return item.replace(reg, '<img style="max-width: 100%;" src="$1" />');
};
</script>

<style scoped>
.post {
  margin: 0 15px;
  padding: 15px 0;
}
</style>
