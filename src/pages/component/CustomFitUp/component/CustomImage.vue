<template>
  <!-- height:416px; -->
  <view :style="styles" class="custom-box">
    <!-- 轮播图 -->
    <view class="custom-dots" v-if="fixedStyles === 0">
      <swiper
        :style="{ height: heights }"
        :autoplay="false"
        circular
        @change="swiperChange"
        class="coupon-swiper"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in listImage"
          :key="index"
        >
          <view class="swiper-item-list">
            <image
              class="swiper-item-image"
              :src="item.icoUrl"
              mode="aspectFill"
              @click="bannerListClickImage(item)"
            >
            </image>
          </view>
        </swiper-item>
      </swiper>
      <view class="custom-dots-box dots-round" v-if="listImage.length > 1">
        <view
          class="custom-dots-show"
          v-for="(_, index) in listImage"
          :key="index"
          :style="{
            background:
              currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
          }"
        />
      </view>
    </view>
    <!-- 纵向平铺 -->
    <view class="image-direction" v-if="fixedStyles === 1">
      <view
        class="direction-item-list"
        v-for="(item, index) in listImage"
        :key="index"
        :style="{ height: heights }"
        @click="bannerListClickImage(item)"
      >
        <image class="swiper-item-image" :src="item.icoUrl" mode="aspectFill">
        </image>
      </view>
    </view>

    <!-- 横向平铺 -->
    <view class="image-broadwise" v-if="fixedStyles === 2">
      <view
        class="image-broadwise-item"
        v-for="(item, index) in listImage"
        :key="index"
        :style="{ height: heights }"
        @click="bannerListClickImage(item)"
      >
        <image class="swiper-item-image" :src="item.icoUrl" mode="aspectFill">
        </image>
      </view>
      <!-- <view class="image-broadwise-item"> </view> -->
    </view>

    <!-- 横向滑动 -->
    <view class="image-broadwise-slither" v-if="fixedStyles === 3">
      <view
        class="image-broadwise-slither-item"
        v-for="(item, index) in listImage"
        :key="index"
        :style="{ height: heights }"
        @click="bannerListClickImage(item)"
      >
        <image
          class="swiper-item-slither-image"
          :src="item.icoUrl"
          mode="aspectFill"
        >
        </image>
      </view>
      <!-- <view class="image-broadwise-slither-item"> </view>
      <view class="image-broadwise-slither-item"> </view>
      <view class="image-broadwise-slither-item"> </view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { queryMemberCenterBannerListFront } from '@/pages/api/center';
import { queryHomBannerListFront } from '@/pages/api/index';

import { reactive, computed, ref, onMounted } from 'vue';
// import { queryWarrantyListPageFront } from '@/api/server';
// import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
// import { onShow } from '@dcloudio/uni-app';
import { bannerListClickImage } from '@/utils/util';

const initBasicsData = useBasicsData();

interface Props {
  items?: any;
  types: string;
}
const props = withDefaults(defineProps<Props>(), {
  items: () => ({}),
  types: 'WM_CENTER',
});
// props.types==='WM_CENTER'
const styles = computed(() => {
  if (props.items?.param?.doOut?.style) {
    const { height, ...item } = props.items.param.doOut.style;
    // console.log(height);    backgroundSize: 'cover',
    //  backgroundPosition: 'center', background-position: center;
    return {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      ...item,
    };
  }

  return {};
});

const listImage = computed(() => props.items?.param?.doOut?.images || oldListImage.value);
const heights = computed(() => props.items?.param?.doOut?.special?.height || '400rpx');
const fixedStyles = computed(() => {
  if (!props.items?.param?.doOut?.fixedStyle) {
    return 0;
  }
  if (props.items?.param?.doOut?.fixedStyle) {
    return props.items.param.doOut.fixedStyle;
  }
  return 0;
});

// props.items?.param?.doOut?.fixedStyle

// props.items?.param?.doOut?.style.height

// 获取广告  props.types==='WM_CENTER'

onMounted(() => {
  getBannerData();
});

const oldListImage: any = ref([]);
const getBannerData = async () => {
  const res =
    props.types === 'WM_CENTER'
      ? await queryHomBannerListFront('')
      : await queryMemberCenterBannerListFront('');
  if (res.code === 0 && res.data) {
    const result: any = [];
    res.data.map((item: any) => {
      result.push({
        icoUrl: item.imgUrl,
        title: '',
        h5Url: item.h5Url,
        miniUrl: item.miniUrl,
        url: item.url,
      });
    });
    oldListImage.value = result;
  }
};

const currentIndex = ref(0);
const swiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};

// const policyList: any = reactive({ totalRecord: 0, records: [] });

// const toDetail = () => {
//   //  uni.navigateTo({ url });
//   Router.goCodePage('warranty');
// };
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
    width: 100%;
    height: 144rpx;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 20rpx;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .swiper-item-image {
      width: 100%;
      height: 100%;
    }
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
    // background: red;
    margin-right: 20rpx;
    overflow: hidden;
    border-radius: 14rpx;
    .swiper-item-slither-image {
      height: 100%;
      width: 100%;
      border-radius: 14rpx;
    }
  }
}
</style>
