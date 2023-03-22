<template>
  <!-- grid-price-none 无数据显示 -->
  <view class="grid-price" :style="props.items?.param?.doOut?.style">
    <view class="header">
      <view class="left">
        <text class="title">{{ props.title || '今日金价' }}</text>
        <text class="title-unit">(元/克)</text>
      </view>
      <view class="right" @click="more">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>

    <view
      class="gold-price-style1"
      v-if="props.items?.param?.doOut?.fixedStyle === 0"
    >
      <view class="gold-price-style1-text gold-price-style1-item1"
        >销售金价
      </view>
      <view class="gold-price-style1-text gold-price-style1-item2"
        >回收金价
      </view>
      <!-- <view class="gold-price-style1-text gold-price-style1-item3"
        >销售金价
      </view> -->
    </view>
    <view
      class="gold-price-style2"
      v-if="props.items?.param?.doOut?.fixedStyle === 1"
    >
      <view class="gold-price-style2-store">
        <text class="gold-price-style2-store-name"> 金千枝店</text>
        <text class="gold-price-style2-store-time"> 2022年08月09日</text>
      </view>
      <view class="gold-price-style2-tab">
        <view class="gold-price-style2-tabs act-tabs"> 销售金价</view>
        <view class="gold-price-style2-tabs"> 回收金价</view>
      </view>
      <view class="gold-price-style2-list">
        <view class="gold-price-style2-item">
          <view class="gold-price-style2-item-info">
            <view class="gold-price-style2-item-name">千足金 </view>
            <view class="gold-price-style2-item-pz"> 品牌：金千枝</view>
          </view>
          <view class="gold-price-style2-item-price">¥405.49</view>
        </view>
        <view class="gold-price-style2-item">
          <view class="gold-price-style2-item-info">
            <view class="gold-price-style2-item-name"
              >千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金
            </view>
            <view class="gold-price-style2-item-pz"> 品牌：金千枝</view>
          </view>
          <view class="gold-price-style2-item-price">¥405.49</view>
        </view>
        <view class="gold-price-style2-item">
          <view class="gold-price-style2-item-info">
            <view class="gold-price-style2-item-name"
              >千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金千足金
            </view>
            <view class="gold-price-style2-item-pz"> 品牌：金千枝</view>
          </view>
          <view class="gold-price-style2-item-price">¥405.49</view>
        </view>
      </view>
    </view>

    <!--  -->
    <view
      class="gold-price-style3"
      v-if="props.items?.param?.doOut?.fixedStyle === 2"
    >
      <view class="gold-price-style3-store nowrap">
        <text class="gold-price-style3-store-name nowrap"> 金千枝店</text>
      </view>
      <view class="gold-price-style3-item">
        <view class="gold-price-style3-item-left">
          <view class="gold-price-style3-item-left-type">
            <view class="gold-price-style3-center">
              <image
                class="gold-price-icon-image"
                :src="staticUrl + 'img/retrieve-price.png'"
                mode="aspectFill"
              />
            </view>
            <view class="gold-price-style3-center">
              <text class=""> 销售金价 </text>
            </view>
          </view>
        </view>
        <view class="gold-price-style3-item-right">
          <view class="gold-price-style3-item-right-info">
            <text class="gold-price-style3-item-right-name"> 大量进口 </text>
            <text class="gold-price-style3-item-right-price"> ¥405.49 </text>
          </view>
          <view class="gold-price-style3-item-right-info">
            <text class="gold-price-style3-item-right-name nowrap">
              大量进口大量进口大量进口大量进口大量进口
            </text>
            <text class="gold-price-style3-item-right-price"> ¥405.49 </text>
          </view>
        </view>
      </view>
      <view class="gold-price-style3-item">
        <view class="gold-price-style3-item-left">
          <view class="gold-price-style3-item-left-type">
            <view class="gold-price-style3-center">
              <image
                class="gold-price-icon-image"
                :src="staticUrl + 'img/sell-price.png'"
                mode="aspectFill"
              />
            </view>
            <view class="gold-price-style3-center">
              <text class=""> 回收金价 </text>
            </view>
          </view>
        </view>
        <view class="gold-price-style3-item-right">
          <view class="gold-price-style3-item-right-info">
            <text class="gold-price-style3-item-right-name"> 大量进口 </text>
            <text class="gold-price-style3-item-right-price"> ¥405.49 </text>
          </view>
          <view class="gold-price-style3-item-right-info">
            <text class="gold-price-style3-item-right-name nowrap">
              大量进口大量进口大量进口大量进口大量进口
            </text>
            <text class="gold-price-style3-item-right-price"> ¥405.49 </text>
          </view>
        </view>
      </view>
    </view>
    <!-- && showed -->
    <view v-if="goldPrice?.length">
      <swiper
        class="swiper"
        :autoplay="true"
        :circular="true"
        :interval="2000"
        :duration="500"
        :indicator-dots="goldPrice?.length > 1"
        indicator-color="#D8D9E0"
        :indicator-active-color="initBasicsData.mainColor"
        style="height: 250rpx"
      >
        <swiper-item v-for="(price, index) in goldPrice" :key="index">
          <view class="swiper-item uni-bg-red">
            <view class="content-detail">
              <view class="detail-header">
                <view class="swiper-title-brand-name" v-if="price.brandName">
                  <view class="swiper-title left">
                    {{ price.met || '' }}{{ price.metCtn || '' }}
                  </view>
                  <view v-if="price.brandName" class="swiper-line" />
                  <view class="swiper-title rigth">
                    {{ price.brandName || '' }}
                  </view>
                </view>
                <text v-else class="swiper-title">
                  {{ price.met || '' }}{{ price.metCtn || '' }}
                </text>
              </view>
              <view class="detail-content">
                <view class="left detail-content-left">
                  {{ price.price }}
                </view>
                <view class="right">元/克</view>
              </view>
              <view class="detail-footer _text1 text-break">
                {{ price.name || price.distName }}
              </view>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useBasicsData } from '@/store/basicsData';
import { getGoldPriceByPage } from '@/pages/api/server';
import Router from '@/utils/router';
import { ref, Ref, onMounted, watch } from 'vue';
import { staticUrl } from '@/utils/config';
const initBasicsData = useBasicsData();
// const mainColor = initBasicsData.mainColor;

interface Props {
  title?: string;
  // showed?: boolean;
  // goldPrice?: any;
  items: any;
  type: string;
}

const distId: Ref<string> = ref('');
const props = withDefaults(defineProps<Props>(), {
  title: '今日金价',
  type: '',
  items: () => ({}),
  // showed: false,
  // goldPrice: [],
});
const more = () => {
  Router.goCodePage('gold_price', `?distId=${distId.value}`);
};

const showed = ref(false);
const goldPrice = ref<any>([]);
onMounted(() => {
  _getGoldPriceByPage();
});

watch(
  () => initBasicsData.checkLogin,
  (bool: boolean) => {
    if (bool) {
      _getGoldPriceByPage();
    } else {
      goldPrice.value = [];
    }
  }
);

const _getGoldPriceByPage = async () => {
  if (!initBasicsData.checkLogin) {
    goldPrice.value = [];
    return;
  }
  const res = await getGoldPriceByPage(props.type);
  if (res.code === 0 && res.data) {
    const {
      branPriceList,
      param,
      uiParam: todayGoldPrice,
      distId: id,
    } = res.data;
    // this.uiParam = uiParam;
    const { showNum } = param;
    const result: any = [];
    distId.value = id;

    branPriceList.map((item: unknown, index: number) => {
      if (index < showNum) {
        result.push(item);
      }
    });
    showed.value = todayGoldPrice.todayGoldPriceShowed === 'Y';
    goldPrice.value = result;
    // console.log('goldPrice', result);
  }
};
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.gold-price-style1 {
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28rpx;

  .gold-price-style1-text {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 32rpx;
    height: 64rpx;
  }
  .gold-price-style1-item1 {
    width: 304rpx;
    background: rgba(224, 72, 56, 0.05);
    color: #e04939;
  }
  .gold-price-style1-item2 {
    width: 304rpx;
    background: #f7f8f9;
    color: #9697a2;
  }
  .gold-price-style1-item3 {
    width: 630rpx;
    background: rgba(224, 72, 56, 0.05);
    color: #e04838;
  }
}

.gold-price-style2 {
  font-size: 28rpx;
  .gold-price-style2-store {
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    // width: 100%;
    height: 80rpx;
    background: #f7f8f9;
    border-radius: 8rpx;
  }
  .gold-price-style2-store-name {
    width: 370rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    color: #323338;
  }
  .gold-price-style2-store-time {
    color: #9697a2;
  }
  .gold-price-style2-tab {
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .gold-price-style2-tabs {
    margin-right: 20rpx;
    color: #9697a2;
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .act-tabs {
    position: relative;
    font-weight: 700;
    color: #e04838;
  }
  .act-tabs {
    &::before {
      content: '';
      position: absolute;
      bottom: 0rpx;
      left: 0rpx;
      right: 0rpx;
      height: 2px;
      background: #e04838;
    }
  }
  // .gold-price-style2-list {
  // }
  .gold-price-style2-item {
    height: 124rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #ebebeb;
    .gold-price-style2-item-info {
      .gold-price-style2-item-name {
        color: #323338;
        line-height: 48rpx;
        width: 450rpx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
      .gold-price-style2-item-pz {
        // line-height: 40rpx;
        font-size: 12px;
        color: #9697a2;
        width: 450rpx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .gold-price-style2-item-price {
      font-size: 32rpx;
      font-weight: 700;
      color: #dbb866;
    }
  }
  .gold-price-style2-item:last-child {
    border-bottom: 0rpx;
  }
}

// gold-price-style3   gold-price-style3-stor gold-price-style3-store-name
.gold-price-style3 {
  .gold-price-style3-store {
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    height: 80rpx;
    background: #f7f8f9;
    border-radius: 40rpx;
  }
  .gold-price-style3-store-name {
    color: #323338;
  }

  .gold-price-style3-item {
    display: flex;
    justify-content: flex-start;
    margin-top: 25rpx;
    padding-top: 10rpx;
    padding-bottom: 35rpx;
    border-bottom: 1rpx solid #ebebeb;
  }
  .gold-price-style3-item:last-child {
    border-bottom: 0rpx solid white;
    padding-bottom: 5rpx;
  }
  .gold-price-style3-item-left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150rpx;
    color: #c1a975;
    flex-shrink: 0;
    // background-color: red;
    .gold-price-icon-image {
      height: 72rpx;
      width: 72rpx;
    }

    .gold-price-style3-item-left-type {
      width: 150rpx;
    }
    .gold-price-style3-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .gold-price-style3-item-right {
    flex-grow: 1;
    .gold-price-style3-item-right-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70rpx;
    }
    .gold-price-style3-item-right-name {
      font-size: 14px;
      font-weight: 400;
      color: #646771;
      width: 280rpx;
    }
    .gold-price-style3-item-right-price {
      font-size: 32rpx;
      font-weight: 700;
      color: #dbb866;
    }
    // background-color: rgb(186, 186, 186);
  }
}

.grid-price-none {
  padding-bottom: 30rpx !important;
}
.grid-price {
  font-size: 28rpx;
  // width: 630rpx;
  padding: 30rpx;
  padding-bottom: 0rpx;
  // margin-top: 30rpx;
  // margin-bottom: 30rpx;
  background: #fff;
  border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      .title {
        // width: 160rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }
      .title-unit {
        font-size: 24rpx;
        color: #9697a2;
        margin-left: 10rpx;
      }
    }

    .right {
      .more {
        width: 48rpx;
        height: 34rpx;
        margin-right: 2rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }
    }
  }

  .content-detail {
    text-align: center;

    .swiper-title-brand-name {
      display: flex;
      align-items: center;
      justify-content: center;
      // background-color: red;
      width: calc(100vw - 130rpx);

      .swiper-title {
        max-width: 49%;
      }

      .left {
        text-align: right;
      }

      .rigth {
        text-align: left;
      }
    }
    .swiper-title {
      color: #323338;
      font-size: 28rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .swiper-line {
      display: inline-block;
      width: 2rpx;
      height: 24rpx;
      background: #b7b8c4;
      margin: 0 12rpx;
    }

    .detail-header {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60rpx;
      overflow: hidden;

      .left {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }

      .center {
        display: inline-block;
        width: 2rpx;
        height: 24rpx;
        margin: 0 12rpx;
        overflow: hidden;
        background-color: #b7b8c4;
      }

      .right {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }
    }

    .detail-content {
      display: flex;
      align-items: baseline;
      justify-content: center;
      margin-top: 4rpx;

      .detail-content-left {
        height: 100rpx;
        margin-right: 6rpx;
        font-size: 72rpx;
        font-weight: 800;
        line-height: 100rpx;
        color: var(--main-color);
      }

      .right {
        width: 60rpx;
        height: 34rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }
    }

    ._text1 {
      // overflow: hidden;
      // text-overflow: ellipsis;
      // -webkit-line-clamp: 1;
      // -webkit-box-orient: vertical;
      font-size: 24rpx;
      color: #b7b8c4;
    }
  }

  .swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10px;

    .dot {
      width: 16px;
      height: 4px;
      margin-right: 6px;
      background: #ebedf0;
      border-radius: 4px;
    }

    .dot-active {
      background: #ff547b;
    }
  }
}
</style>
