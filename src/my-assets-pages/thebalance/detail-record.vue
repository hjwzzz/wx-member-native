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
          <!-- <view class="mingcheng">
            {{ dataObj.remark || '' }}
          </view> -->
          <view class="yuermoss">
            {{ incomeFun(dataObj.opKind) }}{{ dataObj.realValue }}
          </view>
        </view>
        <view class="bottom">
          <view class="danhao">
            <view class="left"> 流水号 </view>
            <view class="right">
              {{ dataObj.relatedNo || "" }}
            </view>
          </view>
          <view class="shijian">
            <view class="left"> 交易时间 </view>
            <view class="right">
              {{ dataObj.createTime || "" }}
            </view>
          </view>
          <view class="shijian">
            <view class="left"> 交易类型 </view>
            <view class="right">
              {{ getType(dataObj.opReason) }}
            </view>
          </view>
          <view class="shijian">
            <view class="left"> 备注 </view>
            <view class="right">
              {{ dataObj.remark || "" }}
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

const typeMap = {
  XCHG: '兑现',
  REC: '收回',
  BACK: '返还',
  DIFF: '补差',
  PRF: '结息',
  MAN: '手动',
  IMP: '导入',
  CHRG: '充值',
  CHRG_RET: '充值退账',
  GIVE_RE: '赠送退账',
  CHRG_DEC: '充值扣减',
  GIVE_DEC: '赠送扣减',
  CHRG_REC: '充值退回',
  GIVE_REC: '赠送退回',
} as const;

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

const getType = (typeCode: keyof typeof typeMap) => typeMap[typeCode] ?? '';

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
    // height: 590rpx;
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
      padding: 0 30rpx 30rpx;
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
