<template>
  <CustomScrollViewPage @scrolltolower="onLoadMore">
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

      <uni-load-more
        :status="status"
        color="#D8D9E0"
      ></uni-load-more>
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
  </CustomScrollViewPage>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { queryWarrantyListPageFront } from '@/api/server';
import { staticUrl } from '@/utils/config';
import Storage from '@/utils/storage';


const status = ref<'more' | 'loading' | 'no-more'>('no-more');

const params = reactive({
  curPage: 1,
  pageSize: 20
})

const totalPage = ref(0);
const dataList = ref<any[]>([]);
const popupModalRef = ref<any>(null);

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
    const { warrantyCustUrl: url, id, warrantyKind: kind } = item;
    const path = '/my-assets-pages/quality/custom';
    uni.navigateTo({ url: `${path}?url=${url}&n=${id}&t=${Storage.getToken()}&a=${Storage.getJqzAppId()}&e=${Storage.getEpid()}&kind=${kind}` });
  }
};

// 查询列表
const getWarrantyList = async () => {
  const res = await queryWarrantyListPageFront(params);
  const { records, totalPage: total, totalRecord } = res.data;
  totalPage.value = total;
  dataList.value = params.curPage === 1 ? records : [...dataList.value, ...records]

  if (dataList.value.length >= totalRecord) {
    status.value = 'no-more';
  } else {
    status.value = 'more';
  }
};

// 加载更多
const onLoadMore = () => {
  if (status.value === 'no-more') {
    return;
  }
  params.curPage += 1;
  getWarrantyList();
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
</style>
