<template>
  <view :style="props.items?.param?.doOut?.style" class="box-video">
    <video
      id="myVideo"
      :src="props.items?.param?.vidoeURL"
      enable-danmu
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
import { computed, ref } from 'vue';
interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });
</script>

<style lang="scss" scoped>
.box-video {
  .videos {
    width: 100%;
  }
}
</style>
