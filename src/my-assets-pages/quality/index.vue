<template>
  <CustomPage>
    <view class="quality-box" v-if="dataList.length > 0">
      <view
        class="quality-cell"
        v-for="(item, index) in dataList"
        :key="item.id"
        @click="goDetail(index, item)"
      >
        <view class="quality-title">
          <view class="quality-left flex">
            <text class="iconfont icon-style icon-dan"> </text>
            <text class="title-type">{{ item.number || '' }}</text>
          </view>
          <view class="quality-left flex">
            <text class="detail-text">详情</text>
            <uni-icons type="arrowright" size="14" color="#B7B8C4"></uni-icons>
          </view>
        </view>
        <view class="quality-content">
          <view class="content-text">
            <text class="shop-title">门店：</text>
            <text class="shop-name">{{ item.storeName || '' }}</text>
          </view>
          <view class="content-text">
            <text class="shop-title">日期：</text>
            <text class="shop-name">{{ item.bizTime || '' }}</text>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <!-- <u-loadmore
        v-show="this.totalPage >= 1"
        :status="status"
        :icon-type="iconType"
        :load-text="loadText"
        :icon-color="iconColor"
        :font-size="fontSize"
        margin-top="30"
        color="#D8D9E0"
      /> -->
    </view>
    <view class="imagewu" v-else>
      <view class="view-image">
        <image
          class="tip-image"
          :src="staticUrl + 'img/noneStatus.png'"
          mode=""
        ></image>
      </view>
      <view class="wujilu"> 暂无质保单 </view>
    </view>
    <!-- 弹窗 -->
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
  </CustomPage>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { warrantyList } from '@/api/quality';
import { staticUrl } from '@/utils/config';

// const showModal = ref(false);
// 分页所需参数配置
const status = ref('loadmore');
// const iconType = 'circle';
// const iconColor = '#FF547B';
// const fontSize = ref('24');
// const loadText = {
//   loadmore: '轻轻上拉',
//   loading: '加载中...',
//   nomore: '已经到底了',
// };
const page = ref(1);
const totalPage = ref(0);
const dataList: Ref<any> = ref([]);
const popupModalRef: Ref<any> = ref(null);

onMounted(() => {
  getWarrantyList();
});
const closePopupModal = () => {
  popupModalRef.value.close();
};

const goDetail = (type: any, item: any) => {
  if (type === 33) {
    popupModalRef.value.open();
  } else {
    uni.navigateTo({
      url: `/pages/center/quality/custom?url=${item.warrantyCustUrl}&n=${
        item.id
      }&t=${uni.getStorageSync(`token${uni.getStorageSync('jqzAppid')}`)}&a=${uni.getStorageSync('jqzAppid')}&e=${uni.getStorageSync(`epid${uni.getStorageSync('jqzAppid')}`)}&kind=${item.warrantyKind}`,
    });
  }
};

// 查询列表
const getWarrantyList = async () => {
  const body = {
    curPage: 1,
    pageSize: 1000,
  };
  const res = await warrantyList(body);
  dataList.value = [];
  const { records, totalPage: total } = res.data;
  totalPage.value = total;
  dataList.value = dataList.value.concat(records);
  if (page.value >= totalPage.value) {
    status.value = 'nomore';
  } else {
    status.value = 'loading';
  }
};

// 分页加载更多
// const onReachBottom = () => {
//   if (page.value >= totalPage.value) return;
//   status.value = 'loading';
//   page.value = ++page.value;
//   getWarrantyList();
// };
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

.quality-box {
  background: #f5f5f5;
  // box-sizing: border-box;
  // min-height: 91vh;
  cursor: grabbing;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &::before {
    content: '';
    display: table;
  }
  .icon-style {
    color: var(--main-color);
    font-size: 40rpx;
  }
  border: initial;
  .quality-cell {
    padding: 30rpx 0;
    background: #ffffff;
    border-radius: 16rpx;
    margin: 30rpx;
    .quality-title {
      display: flex;
      justify-content: space-between;
      border-bottom: 2rpx solid #ebedf0;
      padding: 0 30rpx 30rpx;
      .quality-left {
        display: flex;
        align-items: center;
        .title-type {
          margin-left: 18rpx;
          color: '#000';
          font-size: 28rpx;
          width: 400rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .detail-text {
          color: #b7b8c4;
          font-size: 24rpx;
          margin-right: 4rpx;
        }
      }
    }
    .quality-content {
      padding: 0 30rpx;
      .content-text {
        font-size: 28rpx;
        padding-top: 30rpx;
        .shop-title {
          color: #9697a2;
        }
        .shop-name {
          color: #323338;
        }
      }
    }
  }
}

.imagewu {
  text-align: center;
  padding-top: 200rpx;
  .view-image {
    display: flex;
    justify-content: center;
  }
  .tip-image {
    height: 320rpx;
    width: 320rpx;
  }

  .wujilu {
    font-size: 28rpx;
    color: #9697a2;
    margin: 40rpx 0 148rpx 0;
  }
}
// .empty-container {
//   display: flex;
//   width: 100%;
//   height: 100vh;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 0rpx 0 12vh;
//   .no-date {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     min-height: calc(100vh - 160rpx);
//     image {
//       width: 320rpx;
//       height: 320rpx;
//     }
//     .wujilu {
//       font-size: 28rpx;
//       color: #9697a2;
//       margin: 40rpx 0 148rpx 0;
//     }
//   }
// }
</style>
