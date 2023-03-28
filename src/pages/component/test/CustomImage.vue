<template>
  <view :style="props.items?.param?.doOut?.style" class="custom-box">
    <!-- 轮播图 -->
    <view
      class="custom-dots"
      v-if="props.items?.param?.doOut?.fixedStyle === 0"
    >
      <swiper
        :style="{ height: props.items?.param?.doOut?.style.height }"
        :autoplay="false"
        circular
        @change="swiperChange"
        class="coupon-swiper"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in props.items?.param?.doOut?.images"
          :key="index"
        >
          <view class="swiper-item-list">
            <image
              class="swiper-item-image"
              :src="item.icoUrl"
              mode="aspectFill"
            >
            </image>
          </view>
        </swiper-item>
      </swiper>
      <view
        class="custom-dots-box dots-round"
        v-if="props.items?.param?.doOut?.images.length > 1"
      >
        <view
          class="custom-dots-show"
          v-for="(_, index) in props.items?.param?.doOut?.images"
          :key="index"
          :style="{
            background:
              currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
          }"
        />
      </view>
    </view>
    <!-- 纵向平铺 -->
    <view
      class="image-direction"
      v-if="props.items?.param?.doOut?.fixedStyle === 1"
    >
      <view
        class="direction-item-list"
        v-for="(item, index) in props.items?.param?.doOut?.images"
        :key="index"
        :style="{ height: props.items?.param?.doOut?.style.height }"
      >
        <image class="swiper-item-image" :src="item.icoUrl" mode="aspectFill">
        </image>
      </view>
    </view>

    <!-- 横向平铺 -->
    <!-- <view class="image-broadwise">
    <view class="image-broadwise-item"> </view>
    <view class="image-broadwise-item"> </view>
  </view> -->

    <!-- 横向滑动 -->
    <!-- <view class="image-broadwise-slither">
    <view class="image-broadwise-slither-item"> </view>
    <view class="image-broadwise-slither-item"> </view>
    <view class="image-broadwise-slither-item"> </view>
    <view class="image-broadwise-slither-item"> </view>
  </view> -->
  </view>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
// import { queryWarrantyListPageFront } from '@/api/server';
// import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
// import { onShow } from '@dcloudio/uni-app';

const initBasicsData = useBasicsData();

interface Props {
  items?: any;
}
const props = withDefaults(defineProps<Props>(), { items: () => ({}) });

const currentIndex = ref(0);
const swiperChange = e => {
  console.log(e);
  currentIndex.value = e.detail.current;
};

const policyList: any = reactive({ totalRecord: 0, records: [] });

const toDetail = () => {
  //  uni.navigateTo({ url });
  Router.goCodePage('warranty');
};
</script>

<style lang="scss" scoped>
.custom-box {
  overflow: hidden;
}

.custom-dots {
  position: relative;

  // margin-bottom: 30rpx;
  .coupon-swiper {
    // border-radius: 16rpx;
    overflow: hidden;
  }
  .swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-item-list {
    display: flex;
    justify-content: flex-start;
    // background: #e04838;
    width: 100%;
    height: 100%;
    border-radius: 16rpx;
    .swiper-item-image {
      width: 100%;
      height: 100%;
    }
  }

  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 18rpx;
    left: 0rpx;
    right: 0rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .custom-dots-show {
    border-radius: 6rpx;
    margin-left: 5rpx;
    margin-right: 5rpx;
  }
  .dots-round {
    z-index: 200px;
    .custom-dots-show {
      width: 24rpx;
      height: 6rpx;
    }
  }
}

//     display: grid;
//     grid-template-columns: repeat(v-bind('props.columnNumber'), 1fr);
//     grid-gap: 10px;

.image-direction {
  z-index: 99;
  .direction-item-list {
    width: 100%;
    height: 100%;
  }
  .swiper-item-image {
    width: 100%;
    height: 100%;
  }
}

.image-broadwise {
  // padding: 20rpx;
  // display: flex;
  // justify-content: space-between;
  // background: #f4f5f7;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rpx;
  .image-broadwise-item {
    // width: 48.5%;
    height: 144rpx;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 20rpx;
  }
}

.image-broadwise-slither {
  display: flex;
  overflow-x: auto;
  // flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  // margin-bottom: 30rpx;
  .image-broadwise-slither-item {
    flex-shrink: 0;
    width: 280rpx;
    height: 280rpx;
    background: red;
    border-radius: 14rpx;
    margin-right: 20rpx;
  }
}
</style>
