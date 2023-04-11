<template>
  <!-- 一行排列-滑动  -->
  <view
    class="quick-line"
    :style="props.items.param.doOut.style"
    v-if="props.items.param.doOut.fixedStyle === 0"
  >
    <block v-for="(item, index) in props.items.param.linkList" :key="index">
      <view
        class="quick-line-item"
        v-if="item.showed"
        @click="handleEntryUrl(item)"
      >
        <!--item-header showSize  item-header-s-->
        <view :class="showSize === 0 ? 'item-header-s' : ' item-header'">
          <image
            class="item-header-image"
            :src="item.icoUrl || `${staticUrl}img/item-avatar-default.png`"
            mode=""
          ></image>
        </view>
        <view
          class="item-text"
          :style="{
            color: props.items?.param?.doOut?.special?.color,
          }"
          >{{ item.title }}</view
        >
      </view>
    </block>
  </view>

  <!-- 两行排列-swiper -->
  <view
    class="quick-swiper"
    :style="props.items.param.doOut.style"
    v-if="props.items.param.doOut.fixedStyle === 1"
  >
    <!--   -->
    <swiper
      circular
      @change="swiperChange"
      :style="{ height: props.swiperVavHeight + 'rpx' }"
    >
      <swiper-item
        class="swiper-item"
        v-for="(navs, index) in quickLine"
        :key="index"
      >
        <view
          class="item-shop"
          v-for="(item, index) in navs"
          :key="index"
          @click="handleEntryUrl(item)"
        >
          <!-- class="item-header" -->
          <view :class="showSize === 0 ? 'item-header-s' : ' item-header'">
            <image
              class="item-header-image"
              :src="item.icoUrl || `${staticUrl}img/item-avatar-default.png`"
              mode=""
            ></image>
          </view>
          <view
            class="item-text"
            :style="{
              color: props.items?.param?.doOut?.special?.color,
            }"
            >{{ item.title }}</view
          >
        </view>
      </swiper-item>
    </swiper>
    <view class="custom-dots-box dots-round" v-if="quickLine.length > 1">
      <view
        class="custom-dots-show"
        v-for="(_, index) in quickLine"
        :key="index"
        :style="{
          background:
            currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
        }"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import { handleEntryUrl } from '@/utils/util';

const initBasicsData = useBasicsData();

interface Props {
  swiperVavHeight?: number;
  // swiperVav: any;
  items?: any;
}
const props = withDefaults(defineProps<Props>(), {
  swiperVavHeight: 360,
  // swiperVav: () => [],
  items: () => ({}),
});

const showSize = computed(() => props.items?.param?.doOut?.special?.size || 0);

const quickLine = computed(() => {
  if (props.items.param?.linkList) {
    let arr: any = [];
    const listArr: any = [];
    props.items.param?.linkList.map((item: any) => {
      if (item.showed) {
        arr.push(item);
      }
      if (arr.length === 8) {
        listArr.push([...arr]);
        arr = [];
      }
    });

    if (arr.length !== 0) {
      listArr.push([...arr]);
      arr = [];
    }
    return listArr;
  }
  return [];
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
  // margin-bottom: 30rpx;
  // background: #fff;
  // border-radius: 16rpx;

  display: flex;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  // justify-content: center;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .quick-line-item {
    // display: inline-block;
    flex-grow: 1;
    min-width: 150rpx;
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

.item-header-s {
  display: inline-block;
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  overflow: hidden;
}
.quick-swiper {
  // width: 100%;
  padding: 60rpx 20rpx 20rpx;
  margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;
  position: relative;
  padding-bottom: 40rpx;

  .item-shop {
    display: inline-block;
    width: 25%;
    margin-bottom: 30rpx;
    text-align: center;
    // flex-grow: 1;
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
