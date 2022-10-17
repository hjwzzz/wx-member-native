<template>
  <view class="toreceive">
    <!-- 状态 -->
    <view class="receive">
      <view class="left">
        <image class="img" src="@/static/prize/dailingqu.png" mode="" />
      </view>
      <view class="right">
        <view class="title"> 待领取 </view>
        <view class="text"> 请到指定门店领取 </view>
      </view>
    </view>
    <!-- 核销码 -->
    <!-- <view class="Qrode">
      <view class="verification"> 核销码：{{ detail.vcode }} </view>
      <view class="erweima">
        <tkiQrcode val="2222"></tkiQrcode>
        <canvas canvas-id="myQrcode" style="width: 300rpx" />
      </view>
      <view class="owneweima">
        领取时，请向工作人员出示二维码 此码一次有效，请勿泄露
      </view>
      <view class="guoqi"> 有效期至：{{ detail.cutExpireTime }} </view>
    </view> -->
    <goods :item="detail" :status="false"> </goods>
    <view class="information">
      <view class="title"> 兑换信息 </view>
      <view class="address">
        <view class="a1">
          <view class="left"> 领取门店 </view>
          <view class="right dist-name">
            <text>{{ detail.distName || '--' }}</text>
          </view>
        </view>
        <view class="a1">
          <view class="left"> 门店地址 </view>
          <view class="right dist-name1" style="text-align: justify">
            <text>
              {{
                detail.disProvince +
                  detail.disCity +
                  detail.disDistrict +
                  detail.disAddress || '--'
              }}
            </text>
          </view>
        </view>
        <view class="a1">
          <view class="left"> 门店电话 </view>
          <view class="right">
            {{ detail.tel || '--' }}
          </view>
        </view>
      </view>
    </view>

    <view class="foohead">
      <view class="a1">
        <view class="left" style="width: 130rpx"> 领取人 </view>
        <view class="right" style="width: 470rpx">
          {{ detail.receiver || '--' }}
        </view>
      </view>
      <view class="a1">
        <view class="left" style="width: 130rpx"> 手机号 </view>
        <view class="right">
          {{ detail.phone || '--' }}
        </view>
      </view>
      <view class="a1">
        <view class="left" style="width: 130rpx"> 兑换时间 </view>
        <view class="right">
          {{ detail.bizTime || '--' }}
        </view>
      </view>
      <view class="a1">
        <view class="left" style="width: 130rpx"> 流水号 </view>
        <view class="right">
          {{ detail.recvBillNo || '--' }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { queryStatus } from '@/api/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import goods from './component/goods.vue';
// import tkiQrcode from '../../../node_modules/tki-qrcode/components/tki-qrcode/tki-qrcode.vue';

const props = defineProps<{
  name: string;
  id: string;
}>();
interface prizeType {
  id: string;
  url: string;
  prizeName: string;
  quantity: string;
  cutValidTime: string;
  cutExpireTime: string;
  tommorry: boolean;
  relatedKind: { name: string };
  recvManner: { code: string };
  param: { allowGet: string };
  status: { name: string; code: string };
  vcode: string;
  distName: string;
  disProvince: string;
  disCity: string;
  disDistrict: string;
  disAddress: string;
  tel: string;
  receiver: string;
  phone: string;
  bizTime: string;
  recvBillNo: string;
}
const detail = ref<prizeType>({} as prizeType);

const createdtatus = async () => {
  const { data, code } = await queryStatus(props.id);
  data.param = JSON.parse(data.param);
  if (code === 0) {
    data.name ??= data.prizeName;
    detail.value = data;
  }

  // drawQrcode({
  //   width: 155,
  //   height: 155,
  //   canvasId: 'myQrcode',
  //   text: res.data.vcode,
  // });
};
onLoad(() => {
  createdtatus();
});
</script>

<style scoped lang="scss">
.toreceive {
  font-size: 28rpx;
  padding: 30rpx;
}
.receive {
  padding-left: 30rpx;
  height: 180rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  .left {
    .img {
      width: 60rpx;
      height: 60rpx;
    }
  }
  .right {
    margin-left: 30rpx;

    .title {
      font-size: 36rpx;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: #323338;
    }

    .text {
      margin-top: 10rpx;
      color: #9697a2;
    }
  }
}

.information {
  padding: 30rpx 32rpx 40rpx 30rpx;
  margin-top: 30rpx;
  /* height: 354rpx; */
  background: #ffffff;
  border-radius: 16rpx 16rpx 0 0;
  border-bottom: 2rpx solid #f5f5f5;

  .title {
    font-size: 32rpx;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #414141;
  }

  .address {
    margin-top: 30rpx;

    .a1 {
      margin-bottom: 30rpx;
      display: flex;

      .left {
        color: #b0b0b8;
      }

      .right {
        margin-left: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        // width: 470rpx;
        width: calc(100vw - 300rpx);
      }
    }
  }
}

.foohead {
  margin-bottom: 30rpx;
  /* height: 298rpx; */
  background-color: #ffffff;
  border-radius: 0 0 16rpx 16rpx;
  padding: 30rpx;

  .a1 {
    margin-bottom: 30rpx;
    display: flex;
    font-size: 28rpx;

    .left {
      /* width: 150rpx;*/
      color: #b0b0b8;
    }

    .right {
      margin-left: 20rpx;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* .rightto {
					margin-left: 52rpx;
				} */
  }
}
</style>
