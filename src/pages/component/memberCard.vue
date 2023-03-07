<template>
  <view class="member-card">
    <view class="member-card-top">
      <view class="member-card-top-user">
        <view class="member-card-avatar">
          <image
            class="member-card-avatar-image"
            :src="staticUrl + 'img/person.png'"
            mode="scaleToFill"
          />
        </view>
        <text class="member-card-name nowrap">
          金千枝金千枝金千枝金千枝金千枝
        </text>
      </view>
      <view class="member-card-top-right">
        <view class="member-card-top-right-sing">
          <image
            class="member-card-top-right-sing-image"
            :src="staticUrl + 'img/sign-icon1.png'"
            mode="scaleToFill"
          />
          <text class="member-card-top-right-sing-text"> 签到</text>
        </view>
        <image
          class="member-card-top-right-image"
          :src="staticUrl + 'img/qr-icon2.png'"
          mode="scaleToFill"
        />
        <image
          class="member-card-top-right-image"
          :src="staticUrl + 'img/set-icon2.png'"
          mode="scaleToFill"
        />
      </view>
    </view>
    <view class="member-card-list">
      <view class="member-card-list-item">
        <view class="member-card-list-item-price nowrap"> 2.12w </view>
        <view class="member-card-list-item-name"> 积分 </view>
      </view>
      <view class="member-card-list-item">
        <view class="member-card-list-item-price nowrap"> 10000.00 </view>
        <view class="member-card-list-item-name"> 余额 </view>
      </view>
      <view class="member-card-list-item">
        <view class="member-card-list-item-price nowrap"> 99+ </view>
        <view class="member-card-list-item-name"> 优惠券 </view>
      </view>
      <view class="member-card-list-item">
        <view class="member-card-list-item-price nowrap"> 2.12w </view>
        <view class="member-card-list-item-name"> 积分 </view>
      </view>
    </view>
    <view class="member-card-bottom">
      <view class="card-start-center">
        <image
          class="member-card-bottom-member-icon"
          :src="staticUrl + 'img/member-icon1.png'"
          mode="scaleToFill"
        />
        <text class="member-card-bottom-member-name nowrap"
          >黄金会员黄金会员黄金会员黄金会员黄金会员
        </text>
      </view>
      <view class="card-start-center">
        <text class="member-card-bottom-member-ri-text"> 查看权益</text>
        <image
          class="member-card-bottom-member-ri"
          :src="staticUrl + 'img/member-r2.png'"
          mode="scaleToFill"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import { onShow } from '@dcloudio/uni-app';

const initBasicsData = useBasicsData();

interface Props {
  title?: string;
  item?: any;
  policyListNum?: number;
}
const props = withDefaults(defineProps<Props>(), {
  item: () => ({}),
  policyListNum: 0,
});

const policyList: any = reactive({ totalRecord: 0, records: [] });

const toDetail = () => {
  //  uni.navigateTo({ url });
  Router.goCodePage('warranty');
};

const getPolicyList = async () => {
  if (!initBasicsData.checkLogin) {
    return;
  }
  const res = await queryWarrantyListPageFront({
    mid: initBasicsData.useMid,
    curPage: 1,
    pageSize: props.policyListNum,
  });
  if (res.code === 0 && res.data) {
    Object.assign(policyList, res.data);
  }
};

onShow(() => {
  if (initBasicsData.checkLogin) {
    getPolicyList();
    return;
  }
  policyList.records = [];
  policyList.totalRecord = 0;
});
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

.member-card {
  margin-bottom: 30rpx;
  font-size: 28rpx;
  // width: 355px;
  min-height: 360rpx;
  background: linear-gradient(90deg, #ffeed3, #ffe1bc);
  border-radius: 8px;

  .card-start-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .member-card-top {
    padding-top: 10rpx;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24rpx;
    padding-right: 24rpx;

    .member-card-top-user {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .member-card-avatar {
      width: 80rpx;
      height: 80rpx;
      border: 4rpx solid #ffffff;
      border-radius: 70rpx;
      .member-card-avatar-image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .member-card-name {
      font-size: 32rpx;
      font-weight: 700;
      color: #323338;
      margin-left: 20rpx;
      width: 250rpx;
    }
    .member-card-top-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .member-card-top-right-image {
      width: 48rpx;
      height: 48rpx;
      margin-left: 24rpx;
    }
    .member-card-top-right-sing {
      width: 130rpx;
      height: 60rpx;
      background: #f8e1b6;
      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .member-card-top-right-sing-image {
      width: 32rpx;
      height: 32rpx;
    }
    .member-card-top-right-sing-text {
      font-size: 24rpx;
      font-weight: 400;
      color: #965b10;
      margin-left: 8rpx;
    }
  }
  .member-card-list {
    padding-bottom: 20rpx;
    height: 130rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12rpx;
    padding-right: 12rpx;
    .member-card-list-item {
      width: 25%;
    }
    .member-card-list-item-price {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50rpx;
      font-size: 32rpx;
      font-weight: 700;
      color: #323338;
    }
    .member-card-list-item-name {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #32333869;
    }
  }
  .member-card-bottom {
    padding-left: 24rpx;
    padding-right: 24rpx;
    // width: 355px;
    height: 88rpx;
    background: linear-gradient(0deg, #0b0b0d, #474138);
    border-radius: 0px 0px 8px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fbe7c3;
    .member-card-bottom-member-icon {
      height: 40rpx;
      width: 40rpx;
    }
    .member-card-bottom-member-name {
      font-weight: 800;
      color: #fbe7c3;
      margin-left: 12rpx;
      width: 280rpx;
    }
    .member-card-bottom-member-ri {
      height: 24rpx;
      width: 24rpx;
    }
    .member-card-bottom-member-ri-text {
      font-size: 24rpx;
      font-weight: 400;
      color: #fbe7c3;
      margin-right: 12rpx;
    }
  }
}
</style>
