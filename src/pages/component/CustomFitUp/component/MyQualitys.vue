<template>
  <!--grid-price-none  -->
  <view
    class="grid-policy-act"
    :style="{
      ...props.items.param?.doOut?.style,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <view class="header">
      <view class="header-left">
        <text
          class="title"
          :style="{
            color: props.items?.param?.doOut?.special?.color,
            fontSize: props.items?.param?.doOut?.special?.fontSize,
          }"
          >{{ title || '质保单' }}</text
        >
        <view
          class="number"
          :style="{
            color: props.items?.param?.doOut?.special?.color,
          }"
        >
          ({{ policyList.totalRecord || 0 }})
        </view>
      </view>
      <view class="right" @click="toDetail">
        <text
          class="more"
          :style="{
            color: '#9697A2',
          }"
          >更多</text
        >
        <uni-icons type="arrowright" size="14" color="#9697A2"></uni-icons>
      </view>
    </view>
    <view
      class="policy-card"
      v-if="
        props.items.param.doOut.fixedStyle === 1 && policyList.records.length
      "
    >
      <view
        class="policy-card-item"
        v-for="(policy, index) in policyList.records"
        :key="index"
      >
        <view class="policy-card-item-text policy-card-item-one">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-011.png'"
            mode="aspectFill"
          />
          <text class="text">单号：</text>
          <text class="store-name">{{ policy.number }}</text>
        </view>
        <view class="policy-card-item-text">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-009.png'"
            mode="aspectFill"
          />
          <text class="text">门店：</text>
          <text class="store-name">{{ policy.storeName }}</text>
        </view>
        <view class="policy-card-item-text">
          <image
            class="icon-image"
            :src="staticUrl + 'img/icon-006.png'"
            mode="aspectFill"
          />
          <text class="text">时间：</text>
          <text class="text">{{ policy.bizTime }}</text>
          <text class="text-num">数量：</text>
          <text class="text">{{ getNum(policy.details) }}件</text>
        </view>
        <view class="policy-card-item-btn">
          <view class="policy-card-item-btn-info">
            <text>总计：</text>
            <text
              class="num-infos"
              :style="{ color: initBasicsData.mainColor }"
            >
              ￥
            </text>
            <text
              class="num-info-price"
              :style="{ color: initBasicsData.mainColor }"
            >
              {{ getPrice(policy.details) }}
            </text>
          </view>
          <view
            class="policy-card-item-btn-name"
            :style="{ background: initBasicsData.mainColor }"
            @click="goDetails(index, policy)"
          >
            详情
          </view>
        </view>
      </view>
    </view>
    <block v-if="props.items.param.doOut.fixedStyle === 0">
      <view
        class="content"
        v-for="(policy, index) in policyList.records"
        :key="index"
      >
        <view class="orderId">
          <view class="title">单号：</view>
          <view class="text">{{ policy.number }}</view>
        </view>
        <view class="shopName">
          <image
            class="image icon-image"
            :src="staticUrl + 'img/store.png'"
            mode="aspectFill"
          />
          <view class="name">{{ policy.storeName }}</view>
        </view>
        <view class="orderTime">
          <image
            class="image icon-image"
            :src="staticUrl + 'img/time.png'"
            mode="aspectFill"
          />
          <view class="time">{{ policy.bizTime }}</view>
        </view>
      </view>
    </block>
  </view>
  <uni-popup ref="popupModalRef" :mask-click="false">
    <view class="slot-content">
      <view class="slot-content-iamge">
        <image class="modal-img" :src="staticUrl + 'img/jinggao.png'"></image>
      </view>
      <view class="modal-text">抱歉</view>
      <view class="modal-text text-expire">商家该质保单已过期</view>
      <view class="slot-content-btn" @click="closePopupModal"> 关闭 </view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import Storage from '@/utils/storage';
// import NoneData from './NoneData.vue';
import { onShow } from '@dcloudio/uni-app';

const initBasicsData = useBasicsData();

interface Props {
  title?: string;
  item?: any;
  policyListNum?: number;
  items?: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '质保单',
  item: () => ({}),
  policyListNum: 0,
});
const popupModalRef = ref<any>(null);
const closePopupModal = () => {
  popupModalRef.value.close();
};

const goDetails = (type: any, item: any) => {
  if (type === 33) {
    popupModalRef.value.open();
  } else {
    const { warrantyCustUrl: url, id, warrantyKind: kind } = item;
    const path = '/my-assets-pages/quality/custom';
    uni.navigateTo({ url: `${path}?url=${url}&n=${id}&t=${Storage.getToken()}&a=${Storage.getJqzAppId()}&e=${Storage.getEpid()}&kind=${kind}` });
  }
};

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
    pageSize: props.policyListNum || 4,
  });
  if (res.code === 0 && res.data) {
    Object.assign(policyList, res.data);
  }
};
// policyListNum 有值再去请求
watch(
  () => props.policyListNum,
  () => {
    getPolicyList();
  },
  { immediate: true }
);
// 登录请求
watch(
  () => initBasicsData.checkLogin,
  (bool: boolean) => {
    if (bool) {
      getPolicyList();
    } else {
      policyList.records = [];
      policyList.totalRecord = 0;
    }
  }
);

onShow(() => {
  if (initBasicsData.checkLogin) {
    getPolicyList();
    return;
  }
  policyList.records = [];
  policyList.totalRecord = 0;
});

const getNum = (list: any) => {
  let num = 0;
  list.map((item: any) => {
    num += Number(item.quantity) || 0;
  });
  return num;
};
const getPrice = (list: any) => {
  let num = 0;
  list.map((item: any) => {
    num += Number(item.amount) || 0;
  });
  return num;
};
</script>

<style lang="scss" scoped>
.slot-content {
  width: 622rpx;
  min-height: 329rpx;
  background: #ffffff;
  border-radius: 16px;

  .modal-img {
    height: 107rpx;
    width: 107rpx;
    object-fit: contain;
    margin-bottom: 26rpx;
  }

  .modal-text {
    text-align: center;
    font-size: 32rpx;
    color: #323338;
  }

  .text-expire {
    margin-bottom: 48rpx;
  }

  .slot-content-iamge {
    display: flex;
    justify-content: center;
    padding-top: 60rpx;
  }

  .slot-content-btn {
    border-top: 1rpx solid #fafafa;
    width: 100%;
    height: 96rpx;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: 96rpx;
    color: var(--main-color);
  }
}

.policy-card {
  padding-top: 25rpx;
  padding-bottom: 30rpx;

  // margin-right: -30rpx;
  // width: 350px;
  // display: flex;
  // justify-content: flex-start;
  // flex-wrap: nowrap;
  // overflow-x: auto;
  // overflow-y: hidden;
  display: flex;
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .policy-card-item {
    // width: 600rpx;
    width: calc(90%);
    height: 300rpx;
    background: #ffffff;
    border: 2rpx solid #f4f5f7;
    border-radius: 16rpx;
    flex-shrink: 0;
    margin-right: 20rpx;
  }
  .store-name {
    width: calc(60%);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .policy-card-item-btn {
    margin-top: 28rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    height: 100rpx;
    border-top: 1rpx solid #ebebeb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .policy-card-item-btn-info {
      color: #9697a2;
      font-size: 24rpx;
      .num-infos {
        color: #e04838;
      }
      .num-info-price {
        font-weight: 700;
        font-size: 28rpx;
        color: #e04838;
      }
    }
    .policy-card-item-btn-name {
      width: 128rpx;
      height: 60rpx;
      background: #e04838;
      border-radius: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      // color: #fbe7c3;
      color: #ffffff;
    }
  }
  .policy-card-item-text {
    height: 50rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 24rpx;
    color: #9697a2;
    .icon-image {
      margin-left: 30rpx;
      margin-right: 30rpx;
    }
    .text-num {
      margin-left: 40rpx;
    }
  }

  .policy-card-item-one {
    margin-top: 20rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #323338;
  }
}

.icon-image {
  height: 24rpx;
  width: 24rpx;
}
.grid-price-none {
  padding-bottom: 30rpx !important;
}
.grid-policy-act {
  // width: 690rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  // margin: 30rpx 0rpx;
  // background: #fff;
  // border-radius: 16rpx;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    .header-left {
      display: flex;
      align-items: center;
      height: 50rpx;

      .title {
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        color: #323338;
      }

      .number {
        // width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        color: var(--main-color);
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

      .icon {
        width: 10rpx;
        height: 18rpx;
        color: #b7b8c4;
      }
    }
  }

  .content {
    padding-bottom: 20rpx;
    // padding: 30rpx 0;
    margin-top: 20rpx;
    margin-bottom: 10rpx;

    .orderId {
      display: flex;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 800;
      line-height: 40rpx;
      color: #323338;
    }

    .shopName {
      display: flex;
      align-items: center;
      margin: 16rpx 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      // .icon {
      //   flex-shrink: 0;
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .name {
        height: 40rpx;
        margin-left: 20rpx;
        overflow: hidden;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .orderTime {
      display: flex;
      align-items: center;
      // height: 50rpx;
      // .icon {
      //   width: 30rpx;
      //   height: 30rpx;
      //   margin-right: 5rpx;
      //   // overflow: hidden;

      //   .image {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .time {
        height: 40rpx;
        margin-left: 20rpx;
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #323338;
      }
    }
  }

  .content {
    border-bottom: solid 2rpx #f8f8f8;
  }
  .content:last-child {
    border-bottom: solid 0rpx white;
  }
}
</style>
