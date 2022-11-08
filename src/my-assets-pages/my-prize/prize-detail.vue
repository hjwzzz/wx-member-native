<template>
  <CustomPage bottom>
    <view class="toreceive">
      <!-- 订单状态 ：待领取、已发货、已领取、备货中、已失效 时候显示-->
      <view class="receive" v-if="detail.remindContent">
        <view class="left">
          <image
            class="img"
            :src="`${staticUrl}prize/${detail.status}.png`"
            mode=""
          />
        </view>
        <view class="right">
          <view class="title">{{ detail.statusName }}</view>
          <view class="text">{{ detail.remindContent }}</view>
        </view>
      </view>
      <!-- 核销码 -->
      <view
        class="Qrode"
        v-if="detail.statusName === '待领取' && detail.recvManner === '1'"
      >
        <view class="verification"> 核销码：{{ detail.vcode }} </view>
        <view class="erweima">
          <canvas canvas-id="myQrcode" style="width: 150px; height: 150px" />
        </view>
        <view class="owneweima">
          领取时，请向工作人员出示二维码 此码一次有效，请勿泄露
        </view>
        <view class="guoqi"> 有效期至：{{ detail.cutExpireTime }} </view>
      </view>
      <!-- 领取成功状态 -->
      <view class="Qrode" v-if="detail.statusName === '已领取'">
        <view class="erweima">
          <image :src="`${staticUrl}prize/lingquchenggong.png`" mode="" />
        </view>
        <view class="successful"> 奖品领取成功 </view>
        <view class="guoqi"> 领取时间：{{ detail.recvTime }} </view>
      </view>
      <!-- 收件人信息 -->
      <view
        v-if="
          detail.recvManner === '2' &&
          (detail.receiver || detail.phone || detail.fullAddress) &&
          detail.statusName !== '已失效'
        "
        class="youji"
      >
        <view class="left">
          <image :src="`${staticUrl}prize/shouhuo.png`" mode="" />
        </view>
        <view class="right rights">
          <view class="title nameTitle">
            <text style="margin-right: 10px">
              {{ detail.receiver || '--' }}
            </text>
            <text style="margin-right: 30rpx">
              {{ detail.phone }}
            </text>
          </view>
          <view class="text addr-show" style="margin-right: 30rpx">
            <text>
              {{ detail.fullAddress || '--' }}
            </text>
          </view>
        </view>
      </view>

      <Goods :item="detail" :status="false">
        <view class="addTime">
          兑换有效期：{{ detail.cutValidTime }}至{{ detail.cutExpireTime }}
        </view>
      </Goods>
      <!-- 兑奖方式 -->

      <Exchange :item="detail" v-if="detail.statusName === '待兑换'"></Exchange>
      <!-- 门店信息 -->
      <view
        class="information"
        v-if="
          detail.statusName !== '待兑换' &&
          !(detail.recvManner === '2' && !detail.fulldisAddress)
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
                {{ detail.fulldisAddress || '--' }}
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
          detail.statusName !== '待兑换' &&
          (detail.receiver || detail.phone || detail.bizTime)
        "
      >
        <view class="a1" v-for="{ k, v } in manInfoRow" :key="k">
          <view class="left"> {{ k }} </view>
          <view class="right">
            {{ detail[v as keyof IPrize] || '--' }}
          </view>
        </view>
      </view>
      <!-- 发货信息 -->
      <view
        v-if="
          ['已领取', '待领取', '已发货'].includes(detail.statusName) &&
          detail.recvManner === '2'
        "
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

      <view v-if="showSureButton(detail)" class="button">
        <button class="btn" type="button" @click="getPrize">确认领取</button>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import qrCode from '@/utils/qrcode.js';
import {
  getPrizeDetail,
  getPrizeInfoSend,
  getPrizeInfoToStore,
  updateReceiveSend,
  updateToStore,
} from '@/my-assets-pages/api/my-prize';
import type { IPrize } from '@/my-assets-pages/api/types/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import Goods from './component/Goods.vue';
import { useBasicsData } from '@/store/basicsData';
import Exchange from './component/Exchange.vue';
import { staticUrl } from '@/utils/config';
import { mergeFullAddress } from '@/utils/util';

const basicsData = useBasicsData();
const props = defineProps<{
  name: string;
  id: string;
  getWay: string;
}>();

const manInfoRow = [
  {
    k: '领取人',
    v: 'receiver',
  },
  {
    k: '手机号',
    v: 'phone',
  },
  {
    k: '兑换时间',
    v: 'bizTime',
  },
  {
    k: '流水号',
    v: 'recvBillNo',
  },
];
const showSureButton = (item: IPrize) => {
  const {
    statusName, // 奖品状态
    recvManner, // 领取方式 邮寄、到店
    param,
  } = item;
  const p = JSON.parse(param || '{"allowGet":"N"}');
  return (
    ['待领取', '已发货'].includes(statusName) &&
    ['1', '2'].includes(recvManner) &&
    p.allowGet === 'Y'
  );
};
const detail = ref<IPrize>({} as IPrize);

const getData = async () => {
  const { data, code } = await getPrizeDetail(props.id);
  const { recvManner } = data;
  if (data.status !== 'TEXC') {
    const request = recvManner === '1' ? getPrizeInfoToStore : getPrizeInfoSend;
    const { data: d } = await request(props.id);
    Object.assign(data, d);
  }

  if (code === 0) {
    data.name ??= data.prizeName;

    // 提示标语
    const orderStatusRemindObj: any = {
      UNCLAIMED: ['请到指定门店领取', '商家已发货，请收到货后再确认收货'], // 待领取
      SHIPPED: ['请到指定门店领取', '请到指定门店领取'], // 已发货
      FINISHED: ['您已领取奖品', '您已确认收货并领取奖品'], // 已领取
      CHOICE: ['商家备货完成后即可到店领取', '商家备货完成后将发货'], // 备货中
      CONFIRMERD: ['商家备货完成后即可到店领取', '商家备货完成后将发货'], // 备货中
      DELIVERED: ['商家备货完成后即可到店领取', '商家备货完成后将发货'], // 备货中
      INVALID: ['您的奖品已超过领取时间', '您的奖品已超过兑换时间'], // 已失效
    };
    const remindArr = orderStatusRemindObj[data.status];
    data.remindContent = remindArr?.[+recvManner - 1];
    // 完整地址
    data.fullAddress = mergeFullAddress(data);
    data.fulldisAddress = mergeFullAddress(data, 'dis');
    detail.value = data;
    // 二维码;
    if (
      detail.value.statusName === '待领取' &&
      recvManner === '1' &&
      data.vcode
    ) {
      qrCode.draw(data.vcode, 'myQrcode', 150, 150);
    }
  }
};
const getPrize = async () => {
  const { cancel }: any = await uni.showModal({
    content: '确认已领取该奖品',

    confirmColor: basicsData.mainColor,
  });
  if (cancel) return;
  const { recvManner } = detail.value;
  let updateRequest = updateReceiveSend; // 2邮寄
  if (recvManner === '1') {
    updateRequest = updateToStore; // 1到店
  }
  const { code } = await updateRequest({
    id: props.id,
    remark: '',
    status: 'FINISHED',
  });
  uni.showToast({
    title: code === 0 ? '领取成功' : '奖品已被领取',
    icon: 'success',
  });
  uni.$emit('changeTab', 2);
  uni.navigateBack({ delta: 1 });
};
onLoad(() => {
  getData();
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
  margin-top: 30rpx;
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
      .dist-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

// 领取信息
.Qrode {
  margin-top: 30rpx;
  // height: 442rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 50rpx;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .verification {
    font-size: 32rpx;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    color: #414141;
  }
  .owneweima {
    font-size: 24rpx;
    margin: 20rpx 120rpx 20rpx;
    width: 360rpx;
    height: 80rpx;
    color: #b7b8c4;
  }

  .erweima {
    /* height: 310rpx; */
    // width: 310rpx;
    margin: 30rpx auto 10rpx auto;

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
    padding: 0 90rpx;
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
      width: 130rpx;
      color: #b0b0b8;
    }

    .right {
      width: 470rpx;
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
  .btn {
    background-color: var(--main-color);
    height: 80rpx;
    line-height: 80rpx;
    width: 100%;
    border-radius: 40rpx;
    color: #ffffff;
  }
}

.youji {
  margin-top: 30rpx;
  // min-height: 260rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 40rpx 40rpx 34rpx;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .left {
    image {
      width: 52rpx;
      height: 58rpx;
    }
  }
  .rights {
    width: calc(100vw - 200rpx);
    // background-color: red;
  }
  .right {
    margin-left: 34rpx;
    // width: 100%;

    .title {
      margin-bottom: 12rpx;
    }
    .nameTitle {
      margin-right: 30rpx;
      display: flex;
    }
    .text {
      color: #b0b0b8;
    }
  }
}
</style>
