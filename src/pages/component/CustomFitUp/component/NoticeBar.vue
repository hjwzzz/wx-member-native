<template>
  <view
    :style="props.items?.param?.doOut?.style"
    class="notice-bars"
    @click="goMoreNotice(props.items.param, props.items.updateTime)"
  >
    <uni-notice-bar
      :show-icon="true"
      scrollable
      show-get-more
      :text="props.items.param?.title"
      :background-color="props.items.param?.doOut?.style?.background || '#fff'"
      :color="props.items.param?.doOut?.special?.color"
      :moreColor="props.items.param?.doOut?.special?.color"
    >
      <template #icon>
        <image
          v-if="props.items.param?.isIcon"
          class="uni-notice-bar-icon"
          :src="props.items.param?.iconLight || icons"
          mode="aspectFill"
          @click="goMoreNotice(props.items.param, props.items.updateTime)"
        >
        </image>
        <text
          v-else
          class="iconfont"
          :class="props.items.param.icoUrl"
          :style="{ color: props.items.param?.doOut?.special?.color }"
          @click="goMoreNotice(props.items.param, props.items.updateTime)"
        >
        </text>
      </template>
    </uni-notice-bar>
  </view>
</template>

<script setup lang="ts">
// import { reactive, watch, ref } from 'vue';
import { staticUrl } from '@/utils/config';
// import { useBasicsData } from '@/store/basicsData';
// import Router from '@/utils/router';
// import { onShow } from '@dcloudio/uni-app';

// const initBasicsData = useBasicsData();

// staticUrl + `img/qr-icon${showIcon.qrIcon}.png`  icon-010

const icons = `${staticUrl}img/icon-010.png`;

interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });
// 更多
const goMoreNotice = (item: any, noticTime: any) => {
  // console.log('item', item);
  if (item.isUrl) {
    if (item.link && item.link.miniUrl) {
      uni.navigateTo({ url: item.link.miniUrl });
      return;
    }
    if (item.link && item.link.h5Url) {
      uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.link.h5Url)}` });
      return;
    }
    return;
  }
  uni.setStorageSync('notic', item);
  uni.setStorageSync('noticTime', noticTime);
  uni.navigateTo({ url: '/my-assets-pages/notice/index' });
};
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

<style lang="scss" scoped>
.notice-bars {
  overflow: hidden;
  background-color: #fff;
  :deep(.uni-noticebar) {
    margin-bottom: 0px;
  }
}

.iconfont {
  font-size: 32rpx;
  color: var(--main-color);
}
</style>
