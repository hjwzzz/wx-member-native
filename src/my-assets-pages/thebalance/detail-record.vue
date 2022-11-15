<template>
  <CustomPage>
    <view class="Detail_record">
      <view class="mcDetail">
        <view class="top">
          <view class="image">
            <image
              :src="staticUrl + 'img/shourumingxi.png'"
              mode=""
              v-if="dataObj.opKind.code === 'BON_IN'"
            ></image>
            <image
              :src="staticUrl + 'img/yuerzhichu.png'"
              mode=""
              v-else
            ></image>
          </view>
          <view class="mingcheng">
            {{ dataObj.remark || '' }}
          </view>
          <view class="yuermoss">
            {{ incomeFun(dataObj.opKind) }}{{ dataObj.realValue }}
          </view>
        </view>
        <view class="bottom">
          <view class="danhao">
            <view class="left"> 单号 </view>
            <view class="right">
              {{ dataObj.relatedNo || '' }}
            </view>
          </view>
          <view class="shijian">
            <view class="left"> 时间 </view>
            <view class="right">
              {{ dataObj.createTime || '' }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { staticUrl } from '@/utils/config';

const dataObj: Ref<any> = ref({
  createTime: '',
  opKind: {},
  realValue: '',
  relatedKind: '',
  relatedNo: '',
});

onMounted(() => {
  const res = uni.getStorageSync('balanceRecord');
  dataObj.value = res;
});

// 收入还是支出
const incomeFun = (opKind: any) => {
  if (opKind === 'BON_IN') {
    return '+';
  }
  return '-';
};
</script>

<style lang="scss" scoped>
.Detail_record {
  padding: 30rpx;
  background-color: #f5f5f5;
  // height: 100vh;
  .mcDetail {
    height: 590rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    .top {
      padding: 80rpx 30rpx 40rpx 30rpx;
      text-align: center;
      .image {
        image {
          width: 100rpx;
          height: 100rpx;
        }
      }
      .mingcheng {
        margin-top: 30rpx;
        font-size: 32rpx;
      }
      .yuermoss {
        margin-top: 20rpx;
        font-size: 48rpx;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: #323338;
      }
    }
    .bottom {
      margin-top: 40rpx;
      padding: 0 30rpx;
      .shijian {
        margin-top: 40rpx;
      }
      .danhao,
      .shijian {
        display: flex;
        justify-content: space-between;
        .left {
          color: #9d9ea8;
        }
      }
    }
  }
}
</style>
