<template>
  <view class="grid-gift">
    <view class="header">
      <view class="left">
        <text class="title">{{ props.title || '推荐礼品' }}</text>
        <text class="number"></text>
      </view>
      <view class="right" @click="onMall">
        <text class="more">更多</text>
        <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
      </view>
    </view>
    <view class="content-mall" v-if="mallList.length > 0">
      <!-- @click="toDetails(item.id)" -->
      <view
        class="mall-item"
        v-for="(item, index) in mallList"
        :key="index"
        @click="onMallDetail(item.id)"
      >
        <view class="img">
          <image class="image" :src="item.displayImgUrl" mode=""></image>
        </view>
        <view class="text">{{ item.name }}</view>
        <view class="text _price">
          <text>{{ item.displayPoint }}{{ item.acctName }}</text>
          <text v-if="Number(item.displayPrice) > 0">
            +{{ item.displayPrice }}元
          </text>
        </view>
      </view>
    </view>
    <NoneData v-else></NoneData>
  </view>
</template>

<script setup lang="ts">
import NoneData from './NoneData.vue';
import { queryMemberRecommend } from '@/api/points-mall';
import { onMounted, ref, Ref } from 'vue';

interface Props {
  title?: string;
}
const props = withDefaults(defineProps<Props>(), { title: '推荐礼品' });

onMounted(() => {
  getMemberRecommend();
});

const mallList: Ref<any> = ref([]);
const getMemberRecommend = async () => {
  const { data } = await queryMemberRecommend('');
  mallList.value = data || [];
};

const mallUrl = '/my-assets-pages/point-mall/index';
const onMall = () => {
  uni.navigateTo({ url: mallUrl });
};
const onMallDetail = (id: string) => {
  uni.navigateTo({ url: `${mallUrl}?productId=${id}` });
};
</script>

<style lang="scss" scoped>
.content-mall {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  // background-color: white;
  min-height: 300rpx;
  padding-top: 35rpx;
  padding-bottom: 10rpx;
  border-radius: 8px;

  .mall-item {
    width: 196rpx;
    margin-right: 20rpx;

    .img {
      width: 196rpx;
      height: 196rpx;
      margin-bottom: 15rpx;
      border: 2rpx solid #ebedf0;
      border-radius: 16rpx;

      .image {
        width: 192rpx;
        height: 192rpx;
        border-radius: 16rpx;
      }
    }

    .text {
      height: 45rpx;
      overflow: hidden;
      font-size: 24rpx;
      line-height: 45rpx;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    ._price {
      color: #ff547b;
    }
  }
}

.grid-gift {
  // width: 630rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  // height: 432rpx;
  background: #fff;
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

      // .icon {
      //   width: 10rpx;
      //   height: 18rpx;
      //   color: #b7b8c4;
      // }
    }
  }
}
</style>
