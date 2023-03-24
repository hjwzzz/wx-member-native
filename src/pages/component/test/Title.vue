<template>
  <view
    v-if="props.items?.param?.doOut?.fixedStyle === 0"
    :style="{ ...props.items?.param?.doOut?.style, backgroundSize: 'cover' }"
    class="boxs title-box"
  >
    <!-- background-size: cover -->
    <view
      class="title-box-text nowrap"
      :style="props.items?.param?.doOut?.special"
    >
      {{ props.items?.param.title }}
    </view>
  </view>
  <view
    v-if="props.items?.param?.doOut?.fixedStyle === 1"
    :style="{ ...props.items?.param?.doOut?.style, backgroundSize: 'cover' }"
    class="boxs title-box1"
    @click="handleEntryUrl(props.items?.param?.site)"
  >
    <view class="title-box-text nowrap"> {{ props.items?.param.title }}</view>
    <uni-icons
      type="arrowright"
      size="14"
      :color="props.items?.param?.doOut?.special.iconColor || '#B7B8C4'"
    ></uni-icons>
  </view>
</template>

<script setup lang="ts">
// import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import { computed, ref } from 'vue';
import { handleEntryUrl } from '@/utils/util';
interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });
const initBasicsData = useBasicsData();
</script>

<style lang="scss" scoped>
// .boxs {
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-attachment: fixed;
// }
.title-box {
  height: 80rpx;
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 30rpx;
  padding-right: 30rpx;
  .title-box-text {
    display: inline-block;
    width: 100%;
  }
}

.title-box1 {
  height: 80rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30rpx;
  padding-right: 30rpx;
  .title-box-text {
    display: inline-block;
    width: 100%;
  }
}
</style>
