<template>
  <view class="grid-prize" :style="props.items?.param?.doOut?.style">
    <view class="header" @click="emits('handle', 0)">
      <view class="left">
        <text
          class="title"
          :style="{
            color: props.items?.param?.doOut?.special?.color,
            fontSize: props.items?.param?.doOut?.special?.fontSize,
          }"
          >{{ props.title }}</text
        >
      </view>
      <!-- @click="handleSysUrl(item)" -->
      <view class="right">
        <text
          class="more"
          :style="{ color: props.items?.param?.doOut?.special?.color }"
          >更多</text
        >
        <uni-icons
          type="arrowright"
          size="14"
          :color="props.items?.param?.doOut?.special?.color || '#B7B8C4'"
        ></uni-icons>
      </view>
    </view>
    <view class="content">
      <view
        class="content-item"
        v-for="(prize, index) in prizeList"
        :key="index"
        @click="emits('handle', index)"
      >
        <view class="content-header">
          <view class="circel">
            <image class="image" :src="showImage(index)" mode="scaleToFill" />
            <view class="badge" v-if="prize.status === 0 && texcCnt > 0">
              {{ texcCnt > 99 ? '99+' : texcCnt }}
            </view>
            <view class="badge" v-else-if="prize.status === 1 && notGetCnt > 0">
              {{ notGetCnt > 99 ? '99+' : notGetCnt }}
            </view>
          </view>
          <!-- <view class="icon iconfont icon-color" :class="prize.img"></view> -->
        </view>
        <view
          class="content-footer"
          :style="{ color: props.items?.param?.doOut?.special?.color }"
          >{{ prize.name }}</view
        >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { staticUrl } from '@/utils/config';

import { computed } from 'vue';

// const imageUrl = `${staticUrl}img/circle.png`;
// icon-012 icon-018  icon-017  icon-016
const baseIcon = ['012', '018', '017', '016'];
const showImage = (index: number) => `${staticUrl}img/icon-${baseIcon[index]}.png`;

interface Props {
  title?: string;
  item?: any;
  items?: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '我的奖品',
  item: () => ({}),
  items: () => ({}),
});

const emits = defineEmits(['handle']);

const texcCnt = computed(() => props.item.param.texcCnt);
const notGetCnt = computed(() => props.item.param.notGetCnt);

const prizeList = [
  {
    id: Math.random(),
    name: '待兑换',
    img: 'icon-daiduihuan',
    status: 0,
  },
  {
    id: Math.random(),
    name: '待领取',
    img: 'icon-dailingqu',
    status: 1,
  },
  {
    id: Math.random(),
    name: '已领取',
    img: 'icon-yilingqu',
    status: 2,
  },
  {
    id: Math.random(),
    name: '已失效',
    img: 'icon-yishixiao',
    status: 3,
  },
];
</script>

<style lang="scss" scoped>
.grid-prize {
  min-height: 190rpx;
  padding: 30rpx;
  // margin: 30rpx 0rpx;
  // background: #fff;
  border-radius: 16rpx;

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

  .content {
    display: flex;
    justify-content: space-around;
    margin-top: 40rpx;

    .content-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .content-header {
        position: relative;
        width: 48rpx;
        height: 48rpx;
        text-align: center;
        .icon-color {
          color: var(--main-color);
        }
        .circel {
          position: relative;
          width: 48rpx;
          height: 48rpx;

          /* overflow: hidden; */
          color: red;

          .badge {
            position: absolute;
            top: -16rpx;
            left: 30rpx;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: nowrap;
            width: 36rpx;
            height: 36rpx;
            font-size: 20rpx;
            color: #fff;
            background-color: #ff4c4c;
            border-radius: 50%;
          }

          .image {
            width: 100%;
            height: 100%;
          }
        }

        .icon {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 48rpx;
        }
      }

      .content-footer {
        height: 24rpx;
        margin-top: 20rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 24rpx;
        color: #333;
      }
    }
  }
}
</style>
