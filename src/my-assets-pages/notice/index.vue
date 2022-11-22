<template>
  <CustomPage backgroundColor="#fff">
    <view class="notice">
      <view class="notice-header">
        {{ obj.title ? obj.title : '暂无公告' }}
        <view class="time">{{ noticTime }}</view>
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
  const content = richImage(item);
  // const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  // content = content.replace(
  //   reg,
  //   '<img style="max-width: 100%;border-radius: 8px; margin-top:10px;margin-bottom: 10px;" src="$1" />'
  // );
  return content;
};
</script>

<style lang="scss" scoped>
.notice {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .notice-header {
    font-size: 40rpx;
    font-weight: 800;
    color: #323338;
    line-height: 56rpx;
  }
  .time {
    margin: 20rpx 0 30rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #b7b8c4;
    line-height: 40rpx;
    font-family: PingFangSC, PingFangSC-Regular;
  }
}
</style>
