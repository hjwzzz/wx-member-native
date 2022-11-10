<template>
  <uni-popup ref="postRef" class="post-popup">
    <view class="content" @click="close" v-if="poster">
      <view class="content-con">
        <image
          :src="poster"
          class="content-con-poster"
          @click.stop="a"
          mode="widthFix"
        />
        <!-- <image
            v-else
            src="https://static.jqzplat.com/img/2d3238eb-f694-4461-935d-997093358f34.png"
            class="content-con-poster"
            @click.stop="a"
            mode="widthFix"
          />-->
        <view class="content-con-close" @click.stop="download">保存图片</view>
      </view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  showPoster: {
    type: Boolean,
    default: false,
  },
  poster: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:showPoster']);

watch(
  () => props.showPoster,
  val => {
    if (val) {
      postRef.value.open();
    } else {
      postRef.value.close();
    }
  }
);
const postRef = ref();
const a = () => {};
const close = () => {
  postRef.value.close();
  emits('update:showPoster', false);
};
const download = () => {
  // if (this.platform === "H5") {
  //   uni.showToast({
  //     icon: "none",
  //     title: "请长按图片以保存图片",
  //     duration: 3000,
  //   });
  // } else {
  const save = uni.getFileSystemManager();
  const number = Math.random();
  save.writeFile({
    filePath: `${wx.env.USER_DATA_PATH}/pic${number}.png`,
    data: props.poster.slice(22),
    encoding: 'base64',
    success: () => {
      uni.saveImageToPhotosAlbum({
        filePath: `${wx.env.USER_DATA_PATH}/pic${number}.png`,
        success: () => {
          uni.showToast({
            icon: 'none',
            title: '保存成功',
            duration: 3000,
          });
        },
        fail: err => {
          console.log(err);
          uni.showToast({
            icon: 'none',
            title: '保存失败',
            duration: 3000,
          });
        },
      });
    },
    fail: err => {
      uni.showToast({
        icon: 'none',
        title: '保存失败',
        duration: 3000,
      });
      console.log(err);
    },
  });
  // }
};
</script>
<style lang="scss">
.post-popup {
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    &-con {
      position: relative;
      width: 660rpx;
      border-radius: 32rpx;
      z-index: 1;
      &-poster {
        width: 600rpx;
        max-height: 1000rpx !important;
      }
      &-close {
        display: inline-block;
        width: 280rpx;
        height: 88rpx;
        background: linear-gradient(90deg, #ff4700 0%, #ffd170 100%);
        border-radius: 88rpx;
        line-height: 86rpx;
        font-size: 34rpx;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        margin-top: 30rpx;
      }
    }
  }
}
</style>
