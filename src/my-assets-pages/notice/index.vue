<template>
  <CustomPage>
    <view class="notice">
      <view class="notice-header">
        {{ obj.title ? obj.title : '暂无公告' }}
        <view
          style="font-weight: 400; color: #b7b8c4; font-size: 24rpx"
          v-html="noticTime"
        ></view>
      </view>
      <view class="content">
        <view v-html="refRichImage(obj.content)"></view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { richImage } from '@/utils/util';
const obj = uni.getStorageSync('notic');
const noticTime = uni.getStorageSync('noticTime');

const refRichImage = (item: any) => {
  if (!item) {
    return '';
  }
  let content = richImage(item);
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  content = content.replace(
    reg,
    '<img style="max-width: 100%;border-radius: 8px; margin-top:10px;margin-bottom: 10px;" src="$1" />'
  );
  return content;
};
</script>

<style lang="scss" scoped>
.notice {
  margin: 0 15px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .notice-header {
    font-size: 20px;
    font-weight: 800;
    color: #323338;
    line-height: 28px;
  }
}
</style>
