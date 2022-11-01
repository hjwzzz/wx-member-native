<template>
  <CustomPage>
    <view class="detail">
      <view class="coupon-box">
        <CouponItem
          :item="ticketData"
          :showStatus="ticketData.couponStatus === 'EFFECTIVE'"
        >
          <template #btn>
            <view
              @click.stop=""
              v-if="
                ticketData.couponStatus === 'EFFECTIVE' &&
                ticketData.present.code === 'Y'
              "
            >
              <button
                class="share-btn"
                :style="{
                  color: ticketData.style.topBgColorTop,
                  background: ticketData.style.mainColor,
                }"
                open-type="share"
                :data-couponMemberId="ticketData.couponMemberId"
                :data-donateId="initBasicsData.useMid"
                :data-couponName="ticketData.couponName"
                :data-prodCode="ticketData.prodCode?.code"
                :data-discount="ticketData.paramVo?.discount"
                :data-randomAmount="ticketData.memberCouponParam?.randomAmount"
              >
                转赠
              </button>
            </view>
          </template>
          <template #image>
            <image
              v-if="ticketData.couponStatus === 'EXPIRED'"
              :src="staticUrl + 'img/overTime.png'"
              class="status-image"
              mode=""
            ></image>
            <image
              v-else-if="ticketData.couponStatus === 'USED'"
              :src="staticUrl + 'img/over.png'"
              class="status-image"
              mode=""
            ></image>
          </template>
          <template #bottom-left>
            <text> 等后端处理 </text>
          </template>
        </CouponItem>
      </view>
      <view class="hasMask">
        <view
          class="code-qr"
          v-if="
            ticketData.couponStatus === 'USED' ||
            ticketData.couponStatus === 'EFFECTIVE'
          "
        >
          <view class="code-top">
            <view class="code-text">核销码：{{ vcode }}</view>
            <view style="height: 150rpx">
              <canvas class="bar_code" canvas-id="Brcode">
                <cover-image
                  v-if="ticketData.couponStatus === 'USED'"
                  style="height: 150rpx"
                  src="https://static.jqzplat.com/img/a9bef644-dada-4c19-88d5-59ac6c045bee.png"
                ></cover-image>
              </canvas>
            </view>
          </view>
          <view class="code-bottom">
            <canvas
              :style="{ width: '300rpx', height: '300rpx' }"
              canvas-id="myGiftQrcode"
            >
              <cover-image
                v-if="ticketData.couponStatus === 'USED'"
                src="https://static.jqzplat.com/img/c4d7cc39-c91f-486e-aff4-8f64c147aace.png"
              ></cover-image>
            </canvas>
            <view class="code2-text"> 请展示二维码使用优惠券 </view>
          </view>
        </view>
      </view>
      <view class="descBox">
        <view class="title">
          <text class="letter">使用说明</text>
        </view>
        <view class="content" v-if="ticketData.description">
          <view v-html="richImage(ticketData.description)"></view>
        </view>
      </view>
      <view class="shop">
        <view class="title">
          <text class="letter">适用门店</text>
          <view
            v-if="shopNames.length > 10"
            @click="moreDetail(shopNames)"
            class="more-text"
          >
            更多<uni-icons type="arrowright" size="14" color="#B7B8C4">
            </uni-icons>
          </view>
        </view>
        <view class="content" v-if="shopNames.length <= 10">
          <view v-for="(item, i) in shopNames" :key="i">
            {{ item }}
          </view>
        </view>
        <view class="content" v-if="shopNames.length > 10">
          <view v-for="(item, i) in shopNames.slice(0, 10)" :key="i">
            {{ item }}
          </view>
        </view>
        <view
          class="content"
          style="text-align: center"
          v-if="!shopNames.length"
        >
          暂无数据
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script lang="ts" setup>
import { onShareAppMessage, onLoad } from '@dcloudio/uni-app';
import CouponItem from '@/my-assets-pages/component/CouponItem/index.vue';
import { computed, onMounted, ref, Ref } from 'vue';
import { richImage, onShareCoupon } from '@/utils/util';
import { queryMyCouponList } from '@/api/coupon-center';
import { useBasicsData } from '@/store/basicsData';
import qrCode from '@/utils/qrcode.js';
import BrCode128 from '@/utils/barcode.js';
import { staticUrl } from '@/utils/config';
// eslint-disable-next-line no-duplicate-imports
onLoad(() => {
  uni.hideShareMenu({ hideShareItems: ['shareAppMessage', 'shareTimeline'] });
});
// 分享或者转赠优惠券
onShareAppMessage((res: any) => onShareCoupon(res));

const initBasicsData = useBasicsData();
const vcode = ref('');
const couponId = ref('');
const couponName = ref('');
const couponStatus = ref('');
const ticketData: Ref<any> = ref({});

onLoad((options: any) => {
  couponId.value = options.id;
  couponName.value = options.name;
  couponStatus.value = options.status;
});

const shopNames = computed(() => ticketData.value.shopNames || []);
// 分享或者转赠优惠券

onMounted(() => {
  createdtatus();
});
//
const createdtatus = async () => {
  if (couponId.value) {
    const params = {
      id: couponId.value,
      curPage: 1,
      mid: initBasicsData.useMid,
      pageSize: 1,
      sort: {
        field: '',
        sort: '',
      },
    };
    const res = await queryMyCouponList(params);
    // console.log('res', res);
    const { records = [] } = res.data;
    if (records.length > 0) ticketData.value = records[0];
    vcode.value = ticketData.value.vcode;
    return;
  }
  ticketData.value = uni.getStorageSync('ticketInfo');
  vcode.value = ticketData.value.vcode;

  qrCode.draw(vcode.value, 'myGiftQrcode', 155, 155);
  BrCode128(uni.createCanvasContext('Brcode'), vcode.value, '300', '64');
};

const moreDetail = (item: any) => {
  const str = JSON.stringify(item);
  uni.setStorageSync('shopInfo', str);
  uni.navigateTo({ url: '/my-assets-pages/my-coupon/detail-store' });
};
</script>

<style lang="scss" scoped>
.share-btn {
  font-size: 24rpx;
  padding: 0 30rpx;
  line-height: 48rpx;
  font-weight: 400;
  height: 48rpx;
  background: #ffffff;
  border-radius: 28rpx;

  &::after {
    border: none;
  }
}
.detail {
  // width: 100%;
  // height: 100%;
  // min-height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}
.hasMask {
  position: relative;

  .code-qr {
    background: #ffffff;
    border-radius: 16rpx;
    margin: 30rpx;
    padding: 24rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .code-top {
      margin-top: 20rpx;
      .code-text {
        font-size: 16px;
        font-weight: 800;
        color: #414141;
        text-align: center;
        margin-bottom: 30rpx;
      }
    }
    .code-bottom {
      margin: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .code2-text {
        margin-top: 30rpx;
        font-weight: 400;
        color: #b7b8c4;
        font-size: 24rpx;
        text-align: center;
      }
    }
  }
}

.descBox {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 24rpx 30rpx;
  box-sizing: border-box;

  .title {
    .letter {
      // width: 128rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #323338;
      line-height: 44rpx;
    }
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: #9697a2;
    line-height: 52rpx;
    margin-top: 20rpx;

    .content-text {
      display: inline-block;
    }
  }
}

.shop {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 30rpx;
  padding: 24rpx 30rpx;
  box-sizing: border-box;

  .title {
    display: flex;
    justify-content: space-between;
    .more-text {
      color: #b7b8c4;
      // margin-right: 10rpx;
    }
    .letter {
      // width: 128rpx;
      height: 44rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #323338;
      line-height: 44rpx;
    }
  }

  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: #9697a2;
    line-height: 52rpx;
    margin-top: 20rpx;
  }
}

.coupon-box {
  padding: 30rpx 30rpx 0;
}
</style>
