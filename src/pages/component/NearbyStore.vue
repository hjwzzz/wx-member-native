<template>
  <view class="nearby-store" :style="props.items.param.doOut.style">
    <view class="header">
      <view class="left">
        <text
          class="title"
          :style="{
            color: colorText,
            fontSize: props.items?.param?.doOut?.special?.fontSize,
          }"
          >{{ props.title }}</text
        >
        <text class="number"></text>
      </view>
      <view class="right" @click="onMall">
        <text
          class="more"
          :style="{
            color: colorText,
          }"
          >更多</text
        >
        <uni-icons
          type="arrowright"
          size="14"
          :color="colorText || '#B7B8C4'"
        ></uni-icons>
      </view>
    </view>

    <view class="nearby-store-box">
      <view class="nearby-store-image">
        <!-- aspectFit|aspectFill|widthFix -->
        <image
          class="nearby-store-image-show"
          :src="`${staticUrl}img/store/store-avatar-default.png`"
          mode="aspectFill"
        >
        </image>
      </view>

      <view class="nearby-store-info">
        <view
          class="nearby-store-info-name nowrap"
          :style="{
            color: colorText,
          }"
          >金千枝万山旗舰店
        </view>
        <view class="nearby-store-info-text">
          <view
            class="nearby-store-info-text-left"
            :style="{
              color: colorText,
            }"
          >
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-add.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap">
                深圳市罗湖区文锦北路文锦广场A座17层深圳市罗湖区文锦北路文锦广场A座17层
              </text>
            </view>
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-phone.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap"> 0755-89819966 </text>
            </view>
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-rl1.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap"> 周一至周日09:30-14:00，16:30-24:00 </text>
            </view>
          </view>
          <view
            class="nearby-store-info-text-right"
            :style="{
              color: colorText,
            }"
          >
            <view class="nearby-store-info-text-right-box">
              <view class="nearby-store-info-text-right-text">
                <image
                  class="nearby-store-info-store-dh"
                  :src="`${staticUrl}img/store-dh.png`"
                  mode="aspectFill"
                >
                </image>
              </view>
            </view>
            <view class="nearby-store-info-text-right-text">到这去 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { queryMemberRecommend } from '@/api/points-mall';
import { computed, onMounted, ref, Ref } from 'vue';
import Router from '@/utils/router';
import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';

interface Props {
  title?: string;
  items?: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '附近门店',
  items: () => ({}),
});
const initBasicsData = useBasicsData();

const colorText = computed(() => props.items?.param?.doOut?.special?.color || '');

// onMounted(() => {
//   getMemberRecommend();
// });

// const mallList: Ref<any> = ref([]);
// const getMemberRecommend = async () => {
//   const { data } = await queryMemberRecommend('');
//   mallList.value = data || [];
// };

const mallUrl = '/my-assets-pages/point-mall/index';
const onMall = () => {
  // Router
  if (!initBasicsData.checkLogin) {
    return Router.goLogin(mallUrl);
  }
  uni.navigateTo({ url: mallUrl });
};
const onMallDetail = (id: string) => {
  const url = `${mallUrl}?productId=${id}`;
  if (!initBasicsData.checkLogin) {
    return Router.goLogin(url);
  }
  uni.navigateTo({ url });
};
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.nearby-store {
  padding: 30rpx;
  // margin-bottom: 30rpx;
  // background: #fff;
  // border-radius: 16rpx;
  font-size: 28rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      .title {
        width: 160rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }
      .number {
        width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        line-height: 40rpx;
        color: #ff547b;
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

  .nearby-store-box {
    padding-top: 30rpx;
  }

  .nearby-store-image {
    // width: 325px;
    height: 248rpx;
    border-radius: 16rpx;
    overflow: hidden;
    .nearby-store-image-show {
      height: 248rpx;
      width: 100%;
    }
  }
  .nearby-store-info {
    margin-top: 24rpx;
    .nearby-store-info-name {
      line-height: 60rpx;
      font-weight: 700;
      color: #323338;
    }
    .nearby-store-info-text {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .nearby-store-info-text-left {
      // background-color: red;
      flex-grow: 1;
      font-size: 24rpx;
      color: #646771;
      .nearby-store-info-text-left-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50rpx;
        flex-grow: 1;

        .nowrap {
          width: 450rpx;
          // background-color: red;
        }

        .nearby-store-info-img {
          height: 32rpx;
          width: 32rpx;
          margin-right: 10rpx;
        }
      }
    }
    .nearby-store-info-text-right {
      width: 110rpx;
      flex-shrink: 0;
      font-size: 20rpx;
      color: #646771;
      border-left: 1rpx solid #e6e5e3;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .nearby-store-info-store-dh {
        height: 64rpx;
        width: 64rpx;
      }
      .nearby-store-info-text-right-box {
        // padding-left: 24rpx;
        display: flex;
        justify-content: center;
      }
      .nearby-store-info-text-right-text {
        display: flex;
        justify-content: center;
        padding-left: 24rpx;
      }
    }
  }
}
</style>
