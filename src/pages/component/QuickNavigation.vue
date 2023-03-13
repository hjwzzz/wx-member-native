<template>
  <!-- 一行排列-滑动 quickLine -->
  <view class="quick-line">
    <!-- {{ quickLine }} -->
    <view
      class="quick-line-item"
      v-for="(item, index) in quickLine"
      :key="index"
      @click="handleEntryUrl(item)"
    >
      <view class="item-header">
        <image
          class="item-header-image"
          :src="item.icoUrl || `${staticUrl}img/item-avatar-default.png`"
          mode=""
        ></image>
      </view>
      <view class="item-text">{{ item.title }}</view>
    </view>
  </view>

  <!-- 两行排列-swiper -->
  <!-- <view class="quick-swiper">
    <swiper
      :style="{ height: props.swiperVavHeight + 'rpx' }"
      circular
      @change="swiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(navs, index) in props.swiperVav"
        :key="index"
      >
        <view
          class="item-shop"
          v-for="(item, index) in navs"
          :key="index"
          @click="handleEntryUrl(item)"
        >
          <view class="item-header">
            <image
              class="item-header-image"
              :src="item.icoUrl || `${staticUrl}img/item-avatar-default.png`"
              mode=""
            ></image>
          </view>
          <view class="item-text">{{ item.title }}</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="custom-dots-box dots-round" v-if='props.swiperVav.length > 1'>
      <view
        class="custom-dots-show"
        v-for="(_, index) in props.swiperVav"
        :key="index"
        :style="{
          background:
            currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
        }"
      />
    </view>
  </view> -->
</template>

<script setup lang="ts">
import { reactive, watch, ref, computed } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';

const initBasicsData = useBasicsData();

interface Props {
  swiperVavHeight?: number;
  swiperVav: any;
}
const props = withDefaults(defineProps<Props>(), {
  swiperVavHeight: 180,
  swiperVav: () => [],
});

const handleEntryUrl = (item: any) => {
  console.log('item', item);
};

const quickLine = computed(() => {
  console.log('props.swiperVav', props.swiperVav);

  let arr: any = [];
  props.swiperVav.map((item: any) => {
    arr = [...arr, ...item];
  });
  console.log('props.swiperVav', JSON.stringify(arr));
  return arr;
});

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};
</script>

<style lang="scss" scoped>
.quick-line {
  padding-top: 40rpx;
  padding-bottom: 30rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;

  display: flex;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .quick-line-item {
    // display: inline-block;
    flex-shrink: 0;
    width: 150rpx;
    text-align: center;
  }

  .item-header {
    display: inline-block;
    width: 88rpx;
    height: 88rpx;
    border-radius: 22rpx;
    overflow: hidden;
  }

  .item-header-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.quick-swiper {
  // width: 100%;
  padding: 60rpx 20rpx 20rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  position: relative;

  .item-shop {
    display: inline-block;
    width: 162rpx;
    margin-bottom: 30rpx;
    text-align: center;
  }

  .item-header {
    display: inline-block;
    width: 88rpx;
    height: 88rpx;
    border-radius: 22rpx;
    overflow: hidden;
  }

  .item-header-image {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .item-text {
    margin-bottom: 25rpx;
  }
  .swiper-item {
    display: flex;
    flex-wrap: wrap;
  }
  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 30rpx;
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

.item-text {
  height: 34rpx;
  margin-top: 16rpx;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 34rpx;
  color: #323338;
}
</style>
