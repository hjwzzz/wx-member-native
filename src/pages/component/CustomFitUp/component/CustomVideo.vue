<template>
  <view :style="props.items?.param?.doOut?.style" class="box-video">
    <view>
      <!--  border-radius -->
      <video
        :style="{
          borderRadius: props.items?.param?.doOut?.style?.borderRadius,
        }"
        id="myVideo"
        :src="props.items?.param?.vidoeURL"
        enable-danmu
        controls
        class="videos"
        :autoplay="props.items?.param?.doOut?.special.autoPlay"
        :show-progress="props.items?.param?.doOut?.special.showProgress"
        :poster="props.items?.param?.vidoeImg"
      ></video>
    </view>
    <!-- special: {radio: 0, showProgress: true, autoPlay: true} -->
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });

const myVideoContext: any = ref(null);

onMounted(() => {
  myVideoContext.value = uni.createVideoContext('myVideo', this);
  if (props.items?.param?.doOut?.special?.autoPlay) {
    setTimeout(() => {
      myVideoContext.value.play();
    }, 1000);
  }
});
</script>

<style lang="scss" scoped>
.box-video {
  // flex-shrink: 1;
  min-height: 430rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  > view {
    width: 100%;
  }
  .videos {
    width: 100%;
    // height: 100%;
    margin-right: 15px;
    // border-radius: 20rpx;
  }
}
</style>
