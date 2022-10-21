<template>
  <CustomPage>
    <view class="integral">
      <view class="integral-item" v-if="dataList.length">
        <view
          class="item"
          v-for="(item, index) in dataList"
          @click="userintegral(item)"
          :key="index"
        >
          <view class="left">
            <view class="img">
              <image :src="item.imgUrl" mode=""></image>
            </view>
            <view class="jifei">
              <view class="userjf"> 我的{{ item.name }} </view>
              <view class="shuliang">
                {{ item.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="imagewu" v-else>
        <image :src="staticUrl + 'img/noIntegral.png'" mode=""></image>
        <view class="wujilu"> 暂无积分记录 </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryPointList } from '@/api/center';
import { onLoad } from '@dcloudio/uni-app';
import { onMounted, ref, Ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';
const initBasicsData = useBasicsData();
const dataList: Ref<any> = ref([]);
const selectId = ref('');

onLoad((options: any) => {
  const { selectId: id = '' } = options;
  selectId.value = id;
});

onMounted(() => {
  queryPointListFun();
});

const userintegral = (item: any, type = '') => {
  const data = JSON.stringify(item);
  const url = `/my-assets-pages/integral/use-ril-record?item=${data}`;
  if (type === 'redirectTo') {
    uni.redirectTo({ url });
    return;
  }
  uni.navigateTo({ url });
};

const queryPointListFun = async () => {
  const res = await queryPointList(initBasicsData.useMid);
  dataList.value = res?.data || [];
  if (selectId.value) {
    dataList.value.map((v: any) => {
      // console.log('id', v.acctId, this.selectId);
      if (v.acctId === selectId.value) userintegral(v, 'redirectTo');
    });
  }
};
</script>

<style lang="scss" scoped>
.integral {
  // padding: 30rpx;
  padding-top: 30rpx;
  background-color: #f5f5f5;
  // .integral-item {
  //   min-height: calc(100vh - 150rpx - constant(safe-area-inset-bottom));
  //   min-height: calc(100vh - 150rpx - env(safe-area-inset-bottom));
  // }
  .item {
    width: calc(100vw - (60rpx));
    margin-left: 30rpx;
    height: 170rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 30rpx 30rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    .left {
      display: flex;
      align-items: center;
      .img image {
        width: 88rpx;
        height: 88rpx;
      }
      .jifei {
        margin-left: 30rpx;
        .userjf {
          margin-top: -12rpx;
          font-size: 28rpx;
          color: #9697a2;
          width: calc(100vw - 400rpx);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .shuliang {
          margin-top: 6rpx;
          font-size: 48rpx;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: var(--main-color);
        }
      }
    }
    .right {
      width: 128rpx;
      height: 60rpx;
      // line-height: 60rpx;
      // text-align: center;
      background: #ffffff;
      border-radius: 30rpx;
      border: 2rpx solid #ff547b;
      font-size: 28rpx;
      color: #ff547b;
    }
    .right-detail {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .imagewu {
    text-align: center;
    margin-top: 80rpx;
    // min-height: 1000rpx;
    height: calc(100vh - 240rpx);

    /* margin-bottom: ; */
    image {
      width: 320rpx;
      height: 320rpx;
    }

    .wujilu {
      font-size: 28rpx;
      color: #9697a2;
      margin: 40rpx 0 148rpx 0;
    }
  }
}
</style>
