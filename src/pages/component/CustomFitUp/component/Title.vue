<template>
  <view
    v-if="props.items?.param?.doOut?.fixedStyle === 0"
    :style="{
      ...props.items?.param?.doOut?.style,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="boxs title-box"
  >
    <!-- background-size: cover -->
    <view
      class="title-box-text nowrap"
      :style="{
        ...props.items?.param?.doOut?.special,
        fontWeight: props.items?.param?.doOut?.special.fontWeight ? 700 : '',
      }"
    >
      {{ props.items?.param.title }}
    </view>
  </view>
  <view
    v-if="props.items?.param?.doOut?.fixedStyle === 1"
    :style="{
      ...props.items?.param?.doOut?.style,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="boxs title-box1"
    @click="handleUrl(props.items)"
  >
    <view
      class="title-box-text nowrap"
      :style="{
        ...props.items?.param?.doOut?.special,
        fontWeight: props.items?.param?.doOut?.special.fontWeight ? 700 : '',
      }"
    >
      {{ props.items?.param.title }}</view
    >
    <uni-icons
      v-if="props.items?.param?.doOut?.special?.moreIsIcon"
      type="arrowright"
      size="14"
      color="#9697A2"
    ></uni-icons>
    <text
      v-else
      class="right-text"
      :style="{
        color: props.items?.param?.doOut?.special.iconColor || '#B7B8C4',
      }"
    >
      {{ props.items?.param?.doOut?.special?.rightText || '' }}
    </text>
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

// props.items?.param?.site
const handleUrl = (items: any) => {
  console.log('items', items);
  handleEntryUrl(items?.param?.site);
};
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
  // width: 100%;
  padding-left: 30rpx;
  padding-right: 30rpx;
  .title-box-text {
    display: inline-block;
    width: 100%;
  }
}

.right-text {
  margin-left: 10rpx;
  flex-shrink: 0;
  font-size: 28rpx;
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
