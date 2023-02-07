<template>
  <CustomScrollViewPage @scrolltolower="onLoadMore">
    <view class="quality-box" v-if="dataList.length > 0">
      <view class="quality-cell" v-for="item, index in dataList" :key="item.id">
        <view class="quality-cell-header">
          <view class="quality-cell-header-name">
            {{ item.storeName }}
          </view>
          <view class="quality-cell-header-time">
            {{ item.bizTime }}
          </view>
          <view class="quality-cell-header-num">
            单据号：{{ item.number }}
          </view>
        </view>

        <view class="quality-cell-list">
          <template v-for="goods, goodsIndex in item.list" :key="goods.id">
            <view v-if="goodsIndex <= 1 || item.expand" class="quality-cell-content-list-item">
              <image class="quality-cell-content-list-item-img" mode="widthFix" :src="goods.img[0]"
                @click="previewImage(goods)"></image>

              <view class="quality-cell-content-list-item-name">{{ goods.name }}</view>
              <view class="quality-cell-content-list-item-code">条形码{{ goods.code }}</view>
              <view class="quality-cell-content-list-item-status">{{ goods.status }}</view>
              <view class="quality-cell-content-list-item-value">￥{{ goods.value }}</view>

            </view>
          </template>
          <template v-if="item.list.length > 2">
            <view v-if="!item.expand" class="quality-cell-content-list-handle expand" @click="item.expand = true">展开全部
            </view>
            <view v-else class="quality-cell-content-list-handle collapse" @click="item.expand = false">收起全部</view>
          </template>
        </view>

        <view class="quality-cell-footer">
          <view class="quality-cell-footer-count">总计(数量)：{{ item.count }}</view>
          <view class="quality-cell-footer-value">
            合计：
            <text class="quality-cell-footer-value-content">
              ￥{{ item.value }}
            </text>
          </view>

          <view class="quality-cell-footer-handle">
            <view class="quality-cell-footer-handle-btn delete" @click="deleteItem">删除</view>
            <view class="quality-cell-footer-handle-btn detail" @click="goDetail(index, item)">查看详情</view>
          </view>
        </view>
      </view>

      <uni-load-more :status="status" color="#D8D9E0"></uni-load-more>
    </view>
    <view class="imagewu" v-else>
      <view class="view-image">
        <image class="tip-image" :src="staticUrl + 'img/noneStatus.png'" mode=""></image>
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

    <uni-popup ref="popupDeleteRef" type="dialog" class="popup-delete">
      <uni-popup-dialog :title="' '" :confirmText="'删除'" :before-close="true" @close="popupDeleteClose"
        @confirm="popupDeleteConfirm">
        <view class="content">
          确定删除列表中的该条数据吗？进行此操作可能影响售后体验。
        </view>
      </uni-popup-dialog>
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
  pageSize: 20,
});

const totalPage = ref(0);
const dataList = ref<any[]>([]);
const popupModalRef = ref<any>(null);
const popupDeleteRef = ref<any>(null);

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
  // FIXME
  res.data.records = [
    {
      expand: false,
      storeName: '小千金水贝店',
      bizTime: '2022-11-23 13:49:33',
      number: 'XS221123001',
      count: 3,
      value: 12000,
      list: [
        {
          img: ['https://img.dev.jqzplat.com/12D3868F/COMM/3a410740-20220519.png', 'https://img.dev.jqzplat.com/12D3868F/COMM/3a410740-20220519.png'],
          name: '钻石戒指',
          num: '条码号：AD1231411',
          status: '销售',
          value: '4000'
        },
        {
          img: ['https://img.dev.jqzplat.com/12D3868F/COMM/3a410740-20220519.png'],
          name: '钻石戒指',
          num: '条码号：AD1231411',
          status: '销售',
          value: '4000'
        },
        {
          img: ['https://img.dev.jqzplat.com/12D3868F/COMM/3a410740-20220519.png'],
          name: '钻石戒指',
          num: '条码号：AD1231411',
          status: '销售',
          value: '4000'
        },
      ]
    }
  ];
  const { records, totalPage: total, totalRecord } = res.data;
  totalPage.value = total;
  dataList.value =
    params.curPage === 1 ? records : [...dataList.value, ...records];

  if (dataList.value.length >= totalRecord) {
    status.value = 'no-more';
  } else {
    status.value = 'more';
  }
};

const previewImage = (goods: any) => {
  uni.previewImage({
    current: 0,
    urls: goods.img,
  });
};

const deleteItem = () => {
  popupDeleteRef.value.open();
};

const popupDeleteConfirm = async () => {
  popupDeleteRef.value.close();

};
const popupDeleteClose = () => {
  popupDeleteRef.value.close();
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
  padding: 30rpx 30rpx calc(30rpx + env(safe-area-inset-bottom));
  cursor: grabbing;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before {
    content: "";
    display: table;
  }

  .icon-style {
    color: var(--main-color);
    font-size: 40rpx;
  }

  border: initial;

  .quality-cell {
    padding: 24rpx 30rpx;
    background: #ffffff;
    border-radius: 16rpx;
    margin-bottom: 30rpx;

    .quality-cell-header {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      grid-gap: 10rpx;
      grid-template-areas:
        "name time"
        "num num";
      margin-bottom: 30rpx;

      .quality-cell-header-name {
        grid-area: name;
        font-size: 28rpx;
        font-weight: 700;
        color: #323338;
      }

      .quality-cell-header-time {
        grid-area: time;
        font-size: 24rpx;
        color: #9697a2;
        justify-self: flex-end;
      }

      .quality-cell-header-num {
        grid-area: num;
        font-size: 24rpx;
        color: #9697a2;
      }
    }

    .quality-cell-list {
      padding-bottom: 28rpx;
      border-bottom: 1rpx solid #ebedf0;
      margin-bottom: 18rpx;

      .quality-cell-content-list-item {
        display: grid;
        grid-template-columns: 84rpx 1fr auto;
        grid-template-rows: auto auto;
        grid-gap: 10rpx 20rpx;
        grid-template-areas:
          "img name status"
          "img code value";
        margin-bottom: 20rpx;

        .quality-cell-content-list-item-img {
          grid-area: img;
          border-radius: 16rpx;
          width: 100%;
          height: 100%;
        }

        .quality-cell-content-list-item-name {
          grid-area: name;
          font-size: 28rpx;
          color: #323338;
        }

        .quality-cell-content-list-item-code {
          grid-area: code;
          font-size: 24rpx;
          color: #9697a2;
        }

        .quality-cell-content-list-item-status {
          grid-area: status;
          justify-self: flex-end;
        }

        .quality-cell-content-list-item-value {
          grid-area: value;
          font-size: 28rpx;
          color: #323338;
          justify-self: flex-end;
        }
      }

      .quality-cell-content-list-handle {
        font-size: 24rpx;
        color: #9697a2;
        text-align: center;
      }
    }

    .quality-cell-footer {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto;
      grid-gap: 12rpx;
      grid-template-areas:
        "footerCount footerHandle"
        "footerValue footerHandle";

      .quality-cell-footer-count {
        font-size: 24rpx;
        color: #9697a2;
        grid-area: footerCount;
      }

      .quality-cell-footer-value {
        font-size: 24rpx;
        color: #9697a2;
        grid-area: footerValue;

        .quality-cell-footer-value-content {
          font-size: 28rpx;
          font-weight: 800;
          color: #ff547b;
        }
      }

      .quality-cell-footer-handle {
        grid-area: footerHandle;
        justify-self: flex-end;
        display: flex;
        align-items: center;

        .quality-cell-footer-handle-btn {
          border-radius: 34rpx;
          font-size: 24rpx;
          padding: 16rpx 32rpx;

          &:not(:last-child) {
            margin-right: 20rpx;
          }

          &.delete {
            background: #ffffff;
            border: 2rpx solid #ebedf0;
            color: #323338;
          }

          &.detail {
            background: #ff547b;
            color: #ffffff;
          }
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

<style lang="scss">
.popup-delete {
  .uni-dialog-title {
    display: none;
  }

  .uni-dialog-content {
    padding: 48rpx !important;
  }

  .content {
    font-size: 32rpx;
    text-align: center;
    color: #323338;
  }

  .uni-dialog-button-group {
    border-top-color: #ebedf0 !important;

    .uni-dialog-button {

      &.uni-border-left {
        border-left-color: #ebedf0 !important;
      }

      .uni-dialog-button-text {
        color: #323338 !important;
        font-size: 32rpx !important;

        &.uni-button-color {
          color: #ff547b !important;
        }
      }
    }


  }

}
</style>
