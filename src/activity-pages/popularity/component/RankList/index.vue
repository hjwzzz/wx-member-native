<template>
  <view class="rank-list">
    <view v-if="hasTop" class="rank-top-box">
      <template v-for="(v, i) in list">
        <view
          v-if="i < 3"
          :key="v.id"
          class="rank-top-item"
          :class="sortClassList[i]"
        >
          <view class="rank-top-bg">
            <text class="rank-top-key">{{ i + 1 }}</text>
            <image
              class="rank-top-sort"
              :src="sortIconList[i]"
              mode="widthFix"
            ></image>
            <image
              class="rank-top-avatar"
              :src="v.avatarUrl"
              mode="aspectFill"
            ></image>
          </view>
          <view class="rank-top-name">
            {{ v.wxNickName }}
          </view>
          <view class="rank-top-num"> 人气值 {{ v.inviteNum }} </view>
        </view>
      </template>
    </view>
    <view class="rank-title-box">
      <view v-for="v in tableArr" :key="v.key" class="rank-title-item">
        {{ v.name }}
      </view>
    </view>
    <template v-for="(v, i) in list">
      <view v-if="(i >= 3 && hasTop) || !hasTop" :key="v.id" class="rank-item">
        <view v-for="td in tableArr" :key="td.key" class="rank-item-td">
          <view v-if="td.key == 1" class="rank-item-sort">
            {{ i + 1 }}
          </view>
          <template v-if="td.key == 2">
            <image
              class="rank-item-avatar"
              :src="v.avatarUrl"
              mode="aspectFill"
            ></image>
            <view class="rank-item-name text-line-one">{{ v.wxNickName }}</view>
          </template>
          <view v-if="td.key == 3" class="rank-item-num">{{
            v.inviteNum
          }}</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';

defineProps({
  list: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  hasTop: {
    type: Boolean,
    default: false,
  },
});

const tableArr = ref([
  {
    key: 1,
    name: '排名',
  },
  {
    key: 2,
    name: '微信昵称',
  },
  {
    key: 3,
    name: '人气值',
  },
]);
const sortIconList = ref([
  'https://img.dev.jqzplat.com/12D3868F/COMM/2f6cdf52-20220526.png',
  'https://img.dev.jqzplat.com/12D3868F/COMM/990ae03e-20220526.png',
  'https://img.dev.jqzplat.com/12D3868F/COMM/50b65049-20220526.png',
]);

const sortClassList = ref(['one', 'two', 'three']);
</script>
<style lang="scss" scoped>
.rank-top-box {
  position: relative;
  height: 308rpx;
}
.rank-top-bg {
  position: relative;
  padding: 6rpx;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
}
.rank-top-key {
  position: absolute;
  top: -8rpx;
  left: 50%;
  z-index: 2;
  color: #fff;
  font-size: 20rpx;
  line-height: 1;
  transform: translate(-50%, -50%);
}
.rank-top-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.rank-top-sort {
  position: absolute;
  top: 4rpx;
  left: 50%;
  width: 58rpx;
  transform: translate(-50%, -100%);
}
.rank-top-name {
  margin: 14rpx 0 8rpx;
  color: #333;
}
.rank-top-item {
  position: absolute;
  bottom: 32rpx;
  font-size: 24rpx;
  font-weight: bold;
  line-height: 34rpx;
  text-align: center;
  &.one {
    left: 50%;
    color: #ffb94e;
    transform: translateX(-50%);
    .rank-top-bg {
      width: 128rpx;
      height: 128rpx;
      background: linear-gradient(90deg, #ffda8a 0%, #ffb94e 100%);
    }
    .rank-top-sort {
      width: 64rpx;
    }
    .rank-top-key {
      top: -10rpx;
      font-size: 24rpx;
    }
  }
  &.two {
    left: 0;
    color: #7db5f6;
    .rank-top-bg {
      background: linear-gradient(90deg, #b2e6ff 0%, #7db5f6 100%);
    }
  }
  &.three {
    right: 0;
    color: #fc4c39;
    .rank-top-bg {
      background: linear-gradient(90deg, #ffbfa8 0%, #fc4c39 100%);
    }
  }
}

.rank-title-box {
  display: flex;
  margin-bottom: 6rpx;
  font-size: 24rpx;
  line-height: 32rpx;
}
.rank-title-item {
  flex: 1;
  color: #999;
  text-align: center;
  box-sizing: border-box;
  &:first-child {
    text-align: left;
  }
  &:nth-child(2) {
    flex: 1.5;
  }
  &:last-child {
    text-align: right;
  }
}
.rank-item {
  display: flex;
}
.rank-item-td {
  flex: 1;
  display: flex;
  padding: 12rpx 0;
  color: #999;
  line-height: 34rpx;
  align-items: center;
  overflow: hidden;
  &:nth-child(2) {
    flex: 1.5;
  }
  &:last-child {
    color: #333;
    font-weight: bold;
    justify-content: flex-end;
  }
}
.rank-item-sort {
  display: flex;
  min-width: 48rpx;
  justify-content: center;
}
.rank-item-avatar {
  flex: none;
  margin-right: 24rpx;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}
.rank-item-name {
  color: #333;
  font-size: 28rpx;
  font-weight: 400;
}
</style>
