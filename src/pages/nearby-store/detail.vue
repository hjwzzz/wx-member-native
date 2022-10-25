<template>
  <CustomPage>
    <view class="content">
      <view class="top">
        <image
          class="img"
          mode="aspectFill"
          :src="
            (detail.storeDetailsImageUrl && detail.storeDetailsImageUrl[0]) ||
            ''
          "
        />
        <!-- '@/static/store-detail-default.png' -->
        <view class="top-box">
          <view v-if="getAddress" class="navigation" @click="ditu">
            <!-- <image class="navi-img" src="@/static/navitation.png" /> -->
            导航
          </view>
          <view class="top-box-main">
            <image
              class="main-store-img"
              mode="aspectFill"
              :src="detail.storeHeadImageUrl || defaultStoreImg"
            />
            <view class="top-box-name">
              {{ detail.storeName }}
            </view>
          </view>
          <view class="distance">
            <text>
              <text v-if="detail.range">
                <text v-if="detail.range * 1000 >= 1000">
                  {{ detail.range }}km
                </text>
                <text v-else> {{ detail.range * 1000 }}m </text>
              </text>
              <text v-else> 0m </text>
            </text>
          </view>
        </view>
      </view>
      <view class="main">
        <view v-if="detail.tel" class="tel item" @click="thephone">
          <!-- <image class="left-img" mode="aspectFill" src="@/static/tel.png" /> -->
          <text class="content">
            {{ detail.tel }}
          </text>
          <uni-icons
            class="icon-right"
            type="arrowright"
            size="14"
            color="#B7B8C4"
          />
        </view>
        <view v-if="getAddress" class="address item" @click="ditu">
          <!-- <image
            class="left-img"
            mode="aspectFill"
            src="@/static/address1.png"
          /> -->
          <text class="content">
            {{ getAddress }}
          </text>
          <uni-icons
            class="icon-right"
            type="arrowright"
            size="14"
            color="#B7B8C4"
          />
        </view>

        <!--				<view class="business-hours item" v-if="detail.businessTimeRange && detail.businessTimeRange.length">-->
        <view
          v-if="
            (detail.timeList && detail.timeList.length) ||
            (detail.businessTimeRange && detail.businessTimeRange.length)
          "
          class="business-hours item"
        >
          <!-- <image
            class="left-img"
            mode="aspectFill"
            src="@/static/calendar.png"
          /> -->
          <text class="content">
            <text v-if="detail.businessTimeRange">
              {{ detail.businessTimeRange }}
            </text>
            <text
              v-if="
                detail.timeList &&
                detail.timeList.length &&
                detail.businessTimeRange &&
                detail.businessTimeRange.length
              "
            >
              ，
            </text>
            {{ detail.timeList ? detail.timeList.join('，') : '' }}
          </text>
        </view>

        <view class="store-info item">
          <view class="info-title">
            <!-- <image
              class="left-img"
              mode="aspectFill"
              src="@/static/store.png"
            /> -->
            <text class="title"> 门店介绍 </text>
          </view>
          <template
            v-if="
              detail.description ||
              (detail.storeDetailsImageUrl &&
                detail.storeDetailsImageUrl.length > 1)
            "
          >
            <view class="content">
              {{ detail.description || '' }}
            </view>
            <image
              v-for="(item, index) in detail.storeDetailsImageUrl &&
              detail.storeDetailsImageUrl.slice(1)"
              :key="index"
              class="info-img"
              mode="widthFix"
              :src="item"
            />
          </template>
          <view v-else class="noData">
            <!-- <image
              class="noData-img"
              mode="aspectFit"
              src="@/static/Noprize.png"
            /> -->
            <view class="text"> 暂无相关信息 </view>
          </view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryStoreDetails } from '@/api/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const detail = ref<any>({});

onLoad((e: any) => {
  getData(e);
});
const getData = async (params: any) => {
  const res = await queryStoreDetails(params);
  detail.value = res.data;
};
</script>

<style scoped lang="scss">
.content {
  height: calc(100% - 92rpx);
  .top {
    width: 100%;
    height: 400rpx;
    position: relative;
    .img {
      width: 100%;
      height: 100%;
    }
    &-box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.2);
      .navigation {
        width: 134rpx;
        height: 64rpx;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 32rpx;
        font-size: 24rpx;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 30rpx;
        top: 30rpx;
        .navi-img {
          width: 24rpx;
          height: 24rpx;
          margin-right: 10rpx;
        }
      }
      .top-box-main {
        padding: 0 30rpx;
        display: flex;
        margin-top: 120rpx;
        .main-store-img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 16rpx;
          margin-right: 20rpx;
        }
        .top-box-name {
          flex: 1;
          max-width: calc(100% - 120rpx);
          font-size: 36rpx;
          font-weight: 700;
          color: #ffffff;
          position: relative;
          word-break: break-word; /* 文本行的任意字内断开 */
          word-wrap: break-word; /* IE */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
      .distance {
        padding: 10rpx 30rpx 0 30rpx;
        text-align: right;
        font-size: 24rpx;
        font-weight: 700;
        text {
          color: #fff;
        }
        /*position: absolute;*/
        /*right: 0;*/
        /*bottom: 0;*/
      }
    }
  }
  .main {
    background: #ffffff;
    border-radius: 16rpx;
    margin: 0 30rpx;
    position: relative;
    top: -116rpx;
    .item {
      width: 100%;
      padding: 30rpx;
      display: flex;
      align-items: center;
      .content {
        flex: 1;
        font-size: 28rpx;
        color: #323338;
      }
      .left-img {
        width: 24rpx;
        height: 26rpx;
        margin-right: 20rpx;
      }
    }
    .item + .item {
      border-top: 2rpx solid #ebedf0;
    }
    .address,
    .business-hours {
      align-items: baseline;
    }
    .store-info {
      width: 100%;
      display: block;
      .info-title {
        display: flex;
        align-items: center;
        .left-img {
          width: 34rpx;
          height: 34rpx;
        }
        .title {
          font-size: 32rpx;
          font-weight: bold;
          color: #323338;
        }
      }
      .content {
        margin: 30rpx 0;
        font-size: 28rpx;
        color: #646771;
        line-height: 52rpx;
      }
      .info-img {
        width: 100%;
      }
      .info-img + .info-img {
        margin-top: 30rpx;
      }
      .noData {
        text-align: center;
        padding-bottom: 70rpx;
        .noData-img {
          width: 320rpx;
        }
        .text {
          font-size: 28rpx;
          color: #9697a2;
          line-height: 40rpx;
        }
      }
    }
  }
}
</style>
