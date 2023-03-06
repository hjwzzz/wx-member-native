<template>
  <!-- <uni-swiper-dot
    :info="bannerList"
    :current="currentIndex"
    field="content"
    :mode="'round'"
  > -->
  <!--custom-style1=>默认滚动     custom-style2=>滑动       -->
  <view class="custom-dots custom-style1">
    <!-- :indicator-dots="bannerList.length > 1"
      indicator-color="#D8D9E0"
      :indicator-active-color="initBasicsData.mainColor" -->

    <!--  previous-margin="46rpx"
      next-margin="46rpx" -->
    <swiper
      style="height: 600rpx"
      :autoplay="true"
      circular
      @change="swiperChange"
    >
      <block v-for="(item, index) in bannerList" :key="index">
        <swiper-item class="swiper-item" @click.stop="bannerListClick(item)">
          <view class="swiper-item-view">
            <image
              class="swiper-item-image"
              :src="item.imgUrl"
              mode="aspectFill"
            >
            </image>
          </view>
        </swiper-item>
      </block>
    </swiper>
    <!-- dots-roun dots-dot  nav-->
    <!-- <view class="custom-dots-box dots-dot">
      <view
        class="custom-dots-show"
        v-for="(_, index) in bannerList"
        :key="index"
        :style="{
          background:
            currentIndex === index ? initBasicsData.mainColor : '#bdbdbd',
        }"
      />
    </view> -->

    <view class="custom-dots-box">
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
import { ref } from 'vue';

const initBasicsData = useBasicsData();

const bannerList = [
  { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg' },
  { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg' },
  { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg' },
  { imgUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg' },
];

const bannerListClick = (item: any) => {
  console.log(item);
};

const currentIndex = ref(0);
const swiperChange = e => {
  console.log(e);
  currentIndex.value = e.detail.current;
};

interface Props {
  icon?:
    | 'status' // 其他空状态
    | 'noIntegral' // 积分
    | 'address' // 地址
    | 'prize' // 奖品
    | 'Salesperson' // 优惠券
    | 'shop' // 门店
    | 'shoppers' // 导购
    | 'themoney' // 金价
    | 'wifi-none' // 网络
    | 'wukaidong' // 未开通
    | 'wuyuer'; // 余额
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'status',
  text: '暂无相关信息',
});
</script>

<style lang="scss" scoped>
.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-dots {
  position: relative;
  .custom-dots-box {
    // width: 100%;
    position: absolute;
    bottom: 18rpx;
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
