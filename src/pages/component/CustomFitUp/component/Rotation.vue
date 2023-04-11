<template>
  <!-- <uni-swiper-dot
    :info="bannerList"
    :current="currentIndex"
    field="content"
    :mode="'round'"
  > -->
  <!--custom-style1=>默认滚动     custom-style2=>滑动       -->
  <view
    class="custom-dots custom-style1"
    :class="fixedStyleIndex === 0 ? 'custom-style1' : 'custom-style2'"
    :style="boxStyle"
  >
    <!-- :indicator-dots="bannerList.length > 1"
      indicator-color="#D8D9E0"
      :indicator-active-color="initBasicsData.mainColor" -->

    <!--  previous-margin="46rpx"
      next-margin="46rpx" -->

    <!-- {{ bannerList }} -->
    <swiper
      :style="{ height: boxStyle.height }"
      :autoplay="true"
      :interval="intervals"
      circular
      @change="swiperChange"
      :previous-margin="fixedStyleIndex === 0 ? '0rpx' : '46rpx'"
      :next-margin="fixedStyleIndex === 0 ? '0rpx' : '46rpx'"
    >
      <block v-for="(item, index) in bannerList" :key="index">
        <swiper-item
          class="swiper-item"
          @click.stop="bannerListClickImage(item)"
          :style="{ height: boxStyle.height }"
        >
          <view
            class="swiper-item-view"
            :style="{
              overflow: 'hidden',
            }"
          >
            <image
              :style="{
                height: boxStyle.height,
                borderRadius: props.items?.param?.doOut?.special?.borderRadius,
              }"
              class="swiper-item-image"
              :src="item.icoUrl || 'https://static.jqzplat.com/img/r-54253.png'"
            >
            </image>
          </view>
        </swiper-item>
      </block>
    </swiper>
    <!-- specialStyle -->
    <!-- dots-roun dots-dot  nav-->
    <view
      v-if="specialStyle === 0 || specialStyle === 1"
      class="custom-dots-box"
      :class="specialStyle === 0 ? 'dots-dot' : 'dots-round'"
    >
      <view
        class="custom-dots-show"
        v-for="(_, index) in bannerList"
        :key="index"
        :style="{
          background:
            currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
        }"
      />
    </view>

    <view class="custom-dots-box" v-if="specialStyle === 2">
      <view class="custom-num-show">
        {{ currentIndex + 1 }}/{{ bannerList.length }}
      </view>
    </view>
  </view>
  <!-- </uni-swiper-dot> -->
</template>

<script setup lang="ts">
// import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import { computed, ref } from 'vue';
import { bannerListClickImage } from '@/utils/util';
// import { bannerListClickImage } from '@/utils/util';
interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });
const initBasicsData = useBasicsData();

// props.items.param.doOut.images
// 乱博图
const bannerList = computed(() => props.items?.param?.doOut?.images || []);
// 显示那种样式
const fixedStyleIndex = computed(() => props.items?.param?.doOut?.fixedStyle || 0);
// 点数类型
const specialStyle = computed(() => props.items?.param?.doOut?.special?.fixedStyle || 0);

// borderRadius

const intervals = computed(() => {
  if (
    props.items?.param?.doOut?.style?.interval &&
    Number(props.items.param.doOut.style.interval)
  ) {
    return Number(props.items.param.doOut.style.interval) * 1000;
  }
  return 5000;
});

const boxStyle = computed(() => {
  const styles = props.items?.param?.doOut?.style;
  const {
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    background,
    borderRadius,
    height,
  } = styles;

  if (styles) {
    return {
      background: background || '#fff',
      borderRadius: borderRadius || '0px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      paddingTop: marginTop || '0px',
      paddingBottom: marginBottom || '0px',
      paddingLeft: marginLeft || '0px',
      paddingRight: marginRight || '0px',
      height,
    };
  }
  return {};
});
// const bannerList = [
//   { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
//   { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' },
//   { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg' },
//   { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg' },
// ];

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};
</script>

<style lang="scss" scoped>
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-item-view {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-dots {
  position: relative;
  overflow: hidden;
  margin-bottom: 30rpx;
  background-size: cover;
  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 18rpx;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-num-show {
    width: 70rpx;
    height: 44rpx;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 26rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
  }

  .custom-dots-show {
    border-radius: 6rpx;
    margin-left: 5rpx;
    margin-right: 5rpx;
  }
  .dots-round {
    .custom-dots-show {
      width: 24rpx;
      height: 6rpx;
    }
  }
  .dots-dot {
    .custom-dots-show {
      width: 12rpx;
      height: 12rpx;
    }
  }
}

.custom-style1 {
  .swiper-item-view {
    width: 100%;
    height: 100%;
  }
  .swiper-item-image {
    width: 100%;
    height: 100%;
  }
}
.custom-style2 {
  .swiper-item-view {
    width: calc(100% - 30rpx) !important;
    height: 100%;
  }
  .swiper-item-image {
    width: 100%;
    // width: calc(100% - 80rpx) !important;
    height: 600rpx;
  }
}
</style>
