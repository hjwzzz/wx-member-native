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
        <view v-html="richImage(obj.content)"></view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
const richImage = (item: any) => {
  const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
  let content = item.replace(reg, '<img style="max-width: 100%;" src="$1" />');
  const regP = /<p.*?>/g;
  content = item.replace(
    regP,
    '<p style="max-width: 100%;word-break:break-all;word-wrap:break-word"  >'
  );
  return content;
};

// const richImage = (item: any) => {
//   const reg = /<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/g;
//   const content = item.replace(
//     reg,
//     '<img style="max-width: 100%;" src="$1" />'
//   );
//   return content;
// };

const obj = uni.getStorageSync('notic');
const noticTime = uni.getStorageSync('noticTime');
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
