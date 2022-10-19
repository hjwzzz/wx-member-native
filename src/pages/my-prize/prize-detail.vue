<template>
  <CustomPage bottom>
    <view class="toreceive">
      <!-- 状态 -->
      <view
        class="receive"
        v-if="remindObj[detail.recvManner?.code]?.[
            statusName as keyof typeof remindObj[1]
          ]"
      >
        <view class="left">
          <image class="img" :src="`${imageUrl}prize/dailingqu.png`" mode="" />
        </view>
        <view class="right">
          <view class="title">{{ statusName }}</view>
          <view class="text">{{
            remindObj[detail.recvManner.code][
              statusName as keyof typeof remindObj[1]
            ]
          }}</view>
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
      <!-- 领取成功状态 -->
      <view class="Qrode" v-if="statusName === '已领取'">
        <view class="erweima">
          <image :src="`${imageUrl}prize/lingquchenggong.png`" mode="" />
        </view>
        <view class="successful"> 奖品领取成功 </view>
        <view class="guoqi"> 领取时间：{{ detail.recvTime }} </view>
      </view>
      <!-- 收件人信息 -->
      <!-- <view
      v-if="
        detail.receiver !== null ||
        detail.phone !== null ||
        detail.province !== null ||
        detail.city !== null
      "
      class="youji"
    >
      <view class="left">
        <image src="../../../../static/shouhuo.png" mode="" />
      </view>
      <view class="right rights">
        <view class="title nameTitle">
          <text
            style="
              margin-right: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ detail.receiver || '--' }} </text
          ><text style="margin-right: 30rpx">
            {{ detail.phone }}
          </text>
        </view>
        <view class="text addr-show" style="margin-right: 30rpx">
          <text>
            {{ detail.province || '--' }}
          </text>
          <text>
            {{ detail.city || '--' }}
          </text>
          <text>
            {{ detail.district || '--' }}
          </text>
          <text>
            {{ detail.address || '--' }}
          </text>
        </view>
      </view>
    </view> -->

      <Goods :item="detail" :status="false">
        <view class="addTime">
          兑换有效期：{{ detail.cutValidTime }}至{{ detail.cutExpireTime }}
        </view>
      </Goods>
      <!-- 兑奖方式 -->
      <Exchange :item="detail" v-if="statusName === '待兑换'"></Exchange>
      <!-- 门店信息 -->
      <view
        class="information"
        v-if="
          detail.distName !== null ||
          detail.disCity !== null ||
          detail.disAddress !== null
        "
      >
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
      <!-- 领取人信息 -->
      <view
        class="foohead"
        v-if="
          detail.receiver !== null ||
          detail.phone !== null ||
          detail.bizTime !== null
        "
      >
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
      <!-- 发货信息 -->
      <view
        v-if="['已领取', '待领取', '已发货'].includes(statusName)"
        class="foohead"
        style="border-radius: 12rpx"
      >
        <view class="title ttt" style="margin-bottom: 30rpx"> 发货信息 </view>
        <view class="a1">
          <view class="left"> 快递单号 </view>
          <view class="right">
            {{ detail.expNo || '--' }}
          </view>
        </view>
        <view class="a1">
          <view class="left"> 快递公司 </view>
          <view class="right">
            {{ detail.express || '--' }}
          </view>
        </view>
        <view class="a1">
          <view class="left"> 发货时间 </view>
          <view class="right">
            {{ detail.shipTime || '--' }}
          </view>
        </view>
      </view>

      <view
        v-if="true || statusName === '待领取' || statusName === '已发货'"
        class="button"
      >
        <button
          :style="{ backgroundColor: basicsData.mainColor }"
          type="button"
          @click="getPrize"
        >
          确认领取
        </button>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryDetail, queryStatus, updateReceiveSend } from '@/api/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { ref, toRef } from 'vue';
import Goods from './component/Goods.vue';
import { useBasicsData } from '@/store/basicsData';
import Exchange from './component/Exchange.vue';
import { staticUrl } from '@/utils/config';
const imageUrl = staticUrl;

const basicsData = useBasicsData();
const props = defineProps<{
  name: string;
  id: string;
}>();
interface prizeType {
  // 奖品信息
  id: string;
  url: string;
  quantity: string;
  recvTime: string;
  cutValidTime: string;
  prizeName: string;
  cutExpireTime: string;
  // 是否开放兑换
  tommorry: boolean;
  // 获取途径
  relatedKind: { name: string };
  // 领取方式 1到店 2邮寄
  recvManner: { code: '1' | '2' };
  param: { allowGet: string };
  status: { name: string; code: string };
  // 二维码
  vcode: string;
  // 店铺信息
  distName: string;
  disProvince: string;
  disCity: string;
  disDistrict: string;
  disAddress: string;
  // 领取人信息
  tel: string;
  receiver: string;
  phone: string;
  bizTime: string;
  recvBillNo: string;
  // 快递信息
  expNo: string;
  express: string;
  shipTime: string;
}
// 提示标语
const remindObj = {
  '1': {
    // 到店状态
    待领取: '请到指定门店领取',
    已发货: '请到指定门店领取',
    已领取: '您已领取奖品',
    备货中: '商家备货完成后即可到店领取',
  },
  '2': {
    // 邮寄状态
    待领取: '商家已发货，请收到货后再确认收货',
    已发货: '请到指定门店领取',
    已领取: '您已确认收货并领取奖品',
    备货中: '商家备货完成后将发货',
  },
};
const detail = ref<prizeType>({} as prizeType);
const statusName = toRef(props, 'name');

const createdtatus = async () => {
  const { data, code } = await queryDetail(props.id || '80D98B4D-FF73-D8D4-FE07-07FCC9EBB251');
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
const getPrize = async () => {
  const { cancel } = await uni.showModal({
    content: '确认已领取该奖品',
    confirmColor: basicsData.mainColor,
  });
  if (cancel) return;
  uni.showToast({
    title: '领取成功',
    icon: 'success',
  });
  const { code } = await updateReceiveSend({
    id: props.id,
    remark: '',
    status: 'FINISHED',
  });
  if (code === 0) {
    uni.$emit('changeTab', 2);
    uni.navigateBack({ delta: 1 });
  }
};
onLoad(() => {
  createdtatus();
});
</script>

<style scoped lang="scss">
.toreceive {
  box-sizing: border-box;
  font-size: 28rpx;
  padding: 0 30rpx;
}
// top 状态栏目
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
// 兑奖有效期
.addTime {
  font-size: 12px;
  font-weight: 400;
  color: #b7b8c4;
  margin-top: 30rpx;
}
// 兑换信息
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

// 领取信息
.Qrode {
  margin-top: 30rpx;
  height: 442rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 50rpx;
  text-align: center;
  box-sizing: border-box;
  .verification {
    font-size: 32rpx;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #414141;
  }

  .erweima {
    /* height: 310rpx; */
    width: 310rpx;
    margin: 30rpx 0rpx 10rpx 150rpx;

    image {
      width: 106rpx;
      height: 106rpx;
    }
  }

  .successful {
    font-size: 36rpx;
    margin: 40rpx 0 20rpx 0;
    font-weight: 800;
    color: #323338;
  }

  .guoqi {
    margin-top: 40rpx;
    /* padding: 90rpx; */
    margin: 0 56rpx;
    height: 64rpx;
    line-height: 64rpx;
    background: #f7f8fa;
    border-radius: 32rpx;
    font-size: 28rpx;
    color: #9697a2;
  }
}

// 领取人信息
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

// 领取按钮
.button {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0rpx;
  // height: 100rpx;
  // padding: 10rpx 32rpx;
  background-color: #ffffff;
  width: 100%;
  padding-right: 32rpx;
  padding-left: 32rpx;
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  button {
    height: 80rpx;
    line-height: 80rpx;
    width: 100%;
    border-radius: 40rpx;
    color: #ffffff;
  }
}
</style>
