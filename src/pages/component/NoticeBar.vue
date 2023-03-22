<template>
  <view :style="props.items.param.doOut.style">
    <uni-notice-bar
      show-icon
      scrollable
      show-get-more
      :text="props.items.param.title"
      :background-color="props.items.param.doOut.style.background"
      :color="props.items.param.doOut.special.color"
      :moreColor="props.items.param.doOut.special.color"
    >
      <template #icon>
        <image
          class="uni-notice-bar-icon"
          :src="props.items.param.icoUrl"
          mode="aspectFill"
        >
        </image>
      </template>
    </uni-notice-bar>
  </view>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import { onShow } from '@dcloudio/uni-app';

const initBasicsData = useBasicsData();

interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });

// const currentIndex = ref(0);
// const swiperChange = e => {
//   console.log(e);
//   currentIndex.value = e.detail.current;
// };

// const policyList: any = reactive({ totalRecord: 0, records: [] });

// const toDetail = () => {
//   //  uni.navigateTo({ url });
//   Router.goCodePage('warranty');
// };
</script>

<style lang="scss" scoped></style>
