<template>
  <CustomPage>
    <view class="gold-price">
      <view class="banner" v-if="bannerList.length > 0">
        <u-swiper
          @click="bannerClick"
          :list="bannerList"
          :mode="bannerList.length > 1 ? 'round' : 'none'"
          :height="300"
          name="imgUrl"
        ></u-swiper>
      </view>

      <view
        class="shop"
        @click="onChooseStore"
        v-if="goldPriceDatas && goldPriceDatas.store"
      >
        <view class="name">{{ goldPriceDatas.store.storeName || '--' }}</view>
        <u-icon name="arrow-right" color="#B7B8C4" size="28"></u-icon>
      </view>

      <view class="price-box" v-if="goldPriceDatas && goldPriceDatas.param">
        <u-tabs
          class="u-tabs"
          :list="list"
          height="100"
          :is-scroll="false"
          inactive-color="#aaabb5"
          :active-color="initBasicsData.mainColor"
          bar-width="118"
          :current="current"
          @change="change"
          sticky
        >
        </u-tabs>
        <view class="tab-hd">
          <view class="item mC" @click="onChangeTab('jr')" v-if="!current">
            <text></text>
          </view>
          <view
            class="item mc"
            @click="onChangeTab('hs')"
            v-if="current === 1"
          ></view>
        </view>
        <view
          class="tab-bd"
          v-if="
            goldPriceDatas.param.todayGoldPriceShowed === 'Y' ||
            goldPriceDatas.param.recoveryGoldPriceShowed === 'Y'
          "
        >
          <view class="inner" v-if="!current">
            <view
              class="item"
              v-for="(item, index) in goldPriceDatas.brandPrice"
              :key="index"
            >
              <view class="left">
                <view class="t ttt"
                  >{{ item.met }} {{ item.metCtn || '' }}</view
                >
                <view class="b bbb">
                  {{ item.brandName ? '品牌：' : '' }}
                  {{ item.brandName || '' }}</view
                >
              </view>
              <view class="right">
                <view class="t mC">¥{{ item.price }}</view>
                <view
                  class="b"
                  v-if="goldPriceDatas.param.laborCostShowed === 'Y'"
                  >工费：¥{{ item.laborFee }}</view
                >
              </view>
            </view>
            <!-- 空 -->
            <view
              class="empty empty-page"
              v-if="!goldPriceDatas.brandPrice.length"
            >
              <u-image
                width="250rpx"
                height="250rpx"
                mode="aspectFill"
                src="/static/themoney.png"
              ></u-image>
              <view class="stopText">暂无金价信息</view>
            </view>
          </view>
          <view class="inner" v-if="current === 1">
            <view
              class="item"
              v-for="(item, index) in goldPriceDatas.brandOldPrice"
              :key="index"
            >
              <view class="left">
                <view class="t ttt"
                  >{{ item.met }} {{ item.metCtn || '' }}</view
                >
                <view class="b bbb">
                  {{ item.brandName ? '品牌：' : '' }}
                  {{ item.brandName || '' }}
                </view>
              </view>
              <view class="right">
                <view class="t mC">¥{{ item.price }}</view>
                <view
                  class="b"
                  v-if="goldPriceDatas.param.laborCostShowed === 'Y'"
                  >工费：¥{{ item.laborPrice }}</view
                >
              </view>
            </view>
            <!-- 空 -->
            <view
              class="empty empty-page"
              v-if="!goldPriceDatas.brandOldPrice.length"
            >
              <u-image
                width="250rpx"
                height="250rpx"
                mode="aspectFill"
                src="/static/themoney.png"
              ></u-image>
              <view class="stopText">暂无金价信息</view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="remark-box"
        v-if="
          goldPriceDatas &&
          goldPriceDatas.param &&
          goldPriceDatas.param.remarkShowed === 'Y'
        "
      >
        <!-- <rich-text :nodes="goldPriceDatas.param.remark"></rich-text> -->
        <view
          v-if="goldPriceDatas.param.remark"
          v-html="richImage(goldPriceDatas.param.remark)"
        ></view>
        <view class="content" v-else>
          <view class="empty-wrapper">
            <!-- <view class="content-empty">
							<image src="../../../static/noneStatus.png" mode=""></image>
						</view> -->
            <view class="empty"> 暂无数据 </view>
          </view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
const initBasicsData = useBasicsData();

const bannerList = ref([]);
const list = ref([]);
const goldPriceDatas = ref<any>({});
const current = ref(0);
// tabActive: "jr", // jr 今日金价， hs 回收金价
const bannerClick = () => [];
const onChooseStore = () => [];
const change = () => [];
const onChangeTab = (e: any) => [e];
const richImage = (e: any) => [e];
</script>

<style scoped lang="scss">
.mC {
  color: var(--main-color);
}
.banner {
  position: unset;
  /deep/.u-indicator-item-dot-active {
    background-color: #ff547b !important;
  }
  /deep/.u-indicator-item-dot {
    width: 17rpx !important;
    height: 17rpx !important;
  }
}
.ttt {
  width: calc(100vw - 350rpx);
  text-overflow: -o-ellipsis-lastlist;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.bbb {
  width: calc(100vw - 350rpx);
  text-overflow: -o-ellipsis-lastlist;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.gold-price {
  padding: 30rpx;
  min-height: 100vh;
  background: #f5f5f5;
}
.shop {
  margin: 30rpx 0;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
  border-radius: 16rpx;
  .name {
    font-size: 28rpx;
    font-weight: 400;
    color: #323338;
  }
}

.empty-page {
  min-height: 410rpx;
}
.price-box {
  background: #ffffff;

  margin: 30rpx 0;
  border-radius: 16rpx;
  /deep/.u-tabs {
    border-radius: 16px;
  }
  .tab-hd {
    margin-top: -68rpx;
    display: flex;
    justify-content: space-around;
    .item {
      position: relative;
      font-size: 28rpx;
      font-weight: 400;
      color: #9697a2;
      padding: 30rpx 0;
      &.active {
        color: #323338;
        font-weight: 500;
        &::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 74rpx;
          height: 6rpx;
          background: #ff547b;
          border-radius: 3rpx;
        }
      }
    }
  }
  .tab-bd {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      border-top: 1px solid #ebedf0;
      .left {
        .t {
          font-size: 28rpx;
          font-weight: 400;
          color: #323338;
          line-height: 40rpx;
        }
      }
      .right {
        text-align: right;
        .t {
          font-size: 28rpx;
          font-weight: 800;
          color: #ff547b;
        }
      }
      .b {
        font-size: 24rpx;
        font-weight: 400;
        color: #9697a2;
        margin-top: 10rpx;
      }
    }
  }
}
.empty {
  margin: 0 auto;
  padding: 80rpx 0;
  text-align: center;
  color: #9697a2;
  font-size: 28rpx;
  font-weight: 400;
  width: 250rpx;
}
.remark-box {
  background: #ffffff;
  margin: 30rpx 0;
  padding: 30rpx;
  border-radius: 16rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #646771;
  .empty-wrapper {
    .empty {
      text-align: center;
      padding: 50rpx 0;
      font-size: 28rpx;
      color: #9697a2;
    }
  }
}
</style>
