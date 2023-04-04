<template>
  <view :style="props.items?.param?.doOut?.style" class="box-video">
    <video
      id="myVideo"
      :src="props.items?.param?.vidoeURL"
      enable-danmu
      show-mute-btn
      controls
      class="videos"
      :autoplay="props.items?.param?.doOut?.special.autoPlay"
      :show-progress="props.items?.param?.doOut?.special.showProgress"
      :poster="props.items?.param?.vidoeImg"
    ></video>
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
  height: 430rpx;
  overflow: hidden;
  .videos {
    width: 100%;
    margin-right: 15px;
  }
}
</style>
