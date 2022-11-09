<template>
  <view class="rank-list">
    <view class="rank-title-box">
      <view v-for="v in tableArr" :key="v.key" class="rank-title-item">
        {{ v.name }}
      </view>
    </view>
    <view v-for="(v, i) in list" :key="v.id" class="rank-item">
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
        <template v-if="td.key == 3">{{ v.createTime }}</template>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue';

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
    name: '序号',
  },
  {
    key: 2,
    name: '助力好友',
  },
  {
    key: 3,
    name: '助力时间',
  },
]);
// const sortIconList = ref([
//   'https://img.dev.jqzplat.com/12D3868F/COMM/2f6cdf52-20220526.png',
//   'https://img.dev.jqzplat.com/12D3868F/COMM/990ae03e-20220526.png',
//   'https://img.dev.jqzplat.com/12D3868F/COMM/50b65049-20220526.png',
// ]);

// const sortClassList = ref(['one', 'two', 'three']);
</script>
<style lang="scss" scoped>
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
  &:first-child {
    text-align: left;
  }
  &:nth-child(2) {
    flex: 1.5;
  }
  &:last-child {
    // text-align: right;
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
    // color: #333;
    // font-weight: bold;
    justify-content: center;
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
