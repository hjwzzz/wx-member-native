<template>
  <CustomScrollViewPage @scrolltolower="onLoadMore">
    <view class="quality-box" v-if="dataList.length > 0">
      <view
        class="quality-cell"
        v-for="(item, index) in dataList"
        :key="item.id"
      >
        <view class="quality-cell-header">
          <view class="quality-cell-header-name">
            {{ item.storeName }}
          </view>
          <view class="quality-cell-header-time">
            {{ item.bizTime }}
          </view>
          <view class="quality-cell-header-num">
            <image
              class="quality-cell-header-num-icon"
              src="https://static.jqzplat.com/wx_%20applet/img/qualitynum.png"
              mode="aspectFit"
            ></image>
            单据号：{{ item.number }}
          </view>
        </view>

        <view class="quality-cell-list">
          <template v-for="(goods, goodsIndex) in item.details" :key="goods.id">
            <view
              v-if="goodsIndex <= 1 || item.expand"
              class="quality-cell-content-list-item"
            >
              <image
                class="quality-cell-content-list-item-img"
                mode="aspectFill"
                :src="goods.imgUrl"
                @click="previewImage(goods)"
              >
              </image>
              <view class="quality-cell-content-list-item-name">
                {{ goods.goodsName }}
              </view>
              <view class="quality-cell-content-list-item-code"
                >{{ getNumLabel(goods.billKindCode) }}：{{ goods.number }}
              </view>
              <view
                v-if="
                  ![PROD_CODE.GIFT, PROD_CODE.OMAT].includes(goods.prodCode)
                "
                :class="`quality-cell-content-list-item-status ${getStatusClass(
                  goods
                )}`"
              >
                {{ getStatusDesc(goods) }}
              </view>
              <view class="quality-cell-content-list-item-value"
                >￥{{ goods.amount }}
              </view>
            </view>
          </template>
          <template v-if="item.details?.length > 2">
            <view
              v-if="!item.expand"
              class="quality-cell-content-list-handle expand"
              @click="item.expand = true"
            >
              展开全部
              <uni-icons type="bottom" size="14"></uni-icons>
            </view>
            <view
              v-else
              class="quality-cell-content-list-handle collapse"
              @click="item.expand = false"
            >
              收起全部
              <uni-icons type="top" size="14"></uni-icons>
            </view>
          </template>
        </view>

        <view class="quality-cell-footer">
          <view class="quality-cell-footer-count">
            总计(数量)：{{ getQuantityCount(item.details) }}
          </view>
          <view class="quality-cell-footer-value">
            <text>合计：</text>
            <text
              class="quality-cell-footer-value-content"
              :style="{ color: initBasicsData.mainColor }"
            >
              ￥{{ item.realAmt || 0 }}
            </text>
          </view>

          <view class="quality-cell-footer-handle">
            <view
              class="quality-cell-footer-handle-btn delete"
              @click="deleteItem({ id: item.id })"
            >
              删除
            </view>
            <view
              class="quality-cell-footer-handle-btn detail"
              :style="{ background: initBasicsData.mainColor }"
              @click="goDetail(index, item)"
              >查看详情
            </view>
          </view>
        </view>
      </view>

      <uni-load-more :status="status" color="#D8D9E0"></uni-load-more>
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

    <uni-popup ref="popupDeleteRef" type="dialog" class="popup-delete">
      <uni-popup-dialog
        :title="' '"
        :confirmText="'删除'"
        :before-close="true"
        @close="popupDeleteClose"
        @confirm="popupDeleteConfirm"
      >
        <view class="content">
          确定删除列表中的该条数据吗？进行此操作可能影响售后体验。
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </CustomScrollViewPage>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import {
  queryWarrantyListPageFront,
  updateWarrantyStatusRequest,
} from '@/api/server';
import { staticUrl } from '@/utils/config';
import Storage from '@/utils/storage';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

const getStatusClass = (goods: any) => {
  if (goods.billKindCode === BILL_KIND_CODE.JXS) {
    if (goods.refunded === 'Y') {
      return 'B';
    }
    if (goods.reclaimed === 'Y') {
      return 'B';
    }
    return 'A';
  }
  return (BILL_KIND_CODE_DESC as any)[goods.billKindCode]?.className;
};

const getStatusDesc = (goods: any) => {
  if (goods.billKindCode === BILL_KIND_CODE.JXS) {
    if (goods.refunded === 'Y') {
      return '已销退';
    }
    if (goods.reclaimed === 'Y') {
      return '已回收';
    }

    return '销售';
  }

  return (BILL_KIND_CODE_DESC as any)[goods.billKindCode]?.desc;
};

const defaultGoodsImg = `${staticUrl}img/goods.png`;

const status = ref<'more' | 'loading' | 'no-more'>('no-more');

const getQuantityCount = (list: any[]) => list.reduce((acc, cur) => Number(acc) + Number(cur.quantity), 0);

const getNumLabel = (code: BILL_KIND_CODE) => {
  if ([BILL_KIND_CODE.REC, BILL_KIND_CODE.REF].includes(code)) {
    return '回收编号';
  }

  return '条形码';
};

const enum PROD_CODE {

  /** 饰品 */
  JW = 'JW',

  /** 首饰 */
  JWR = 'JWR',

  /** 礼物 */
  GIFT = 'GIFT',

  /** 旧料 */
  OMAT = 'OMAT',
}

const enum BILL_KIND_CODE {

  /** 首饰销售 */
  JXS = 'JXS',

  /** 首饰销退 */
  JXT = 'JXT',

  /** 饰品销售 */
  PXS = 'PXS',

  /** 饰品销退 */
  PXT = 'PXT',

  /** 旧料回收 */
  REC = 'REC',

  /** 旧料退客 */
  REF = 'REF',

  /** 礼品销退 */
  GXT = 'GXT',

  /** 礼品销售 */
  GXS = 'GXS',
}

const BILL_KIND_CODE_DESC = {

  /** 首饰销售 */
  [BILL_KIND_CODE.JXS]: {
    desc: '销售',
    className: 'A',
  },

  /** 首饰销退 */
  [BILL_KIND_CODE.JXT]: {
    desc: '销退',
    className: 'C',
  },

  /** 饰品销售 */
  [BILL_KIND_CODE.PXS]: {
    desc: '销售',
    className: 'A',
  },

  /** 饰品销退 */
  [BILL_KIND_CODE.PXT]: {
    desc: '销退',
    className: 'C',
  },

  /** 旧料回收 */
  [BILL_KIND_CODE.REC]: {
    desc: '已回收',
    className: 'B',
  },

  /** 旧料退客 */
  [BILL_KIND_CODE.REF]: {
    desc: '退客',
    className: '',
  },

  /** 礼品销退 */
  [BILL_KIND_CODE.GXT]: {
    desc: '销退',
    className: 'C',
  },

  /** 礼品销售 */
  [BILL_KIND_CODE.GXS]: {
    desc: '销售',
    className: 'A',
  },
};

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
  const { records, totalPage: total, totalRecord } = res.data;
  totalPage.value = total;

  records.forEach((item: any) => {
    item.details.forEach((goods: any) => {
      goods.imgUrl = goods.imgUrl ?? defaultGoodsImg;
    });
  });

  dataList.value =
    params.curPage === 1 ? records : [...dataList.value, ...records];

  if (dataList.value.length >= totalRecord) {
    status.value = 'no-more';
  } else {
    status.value = 'more';
  }
};

const previewImage = (goods: any) => {
  if (goods.imgUrl === defaultGoodsImg) {
    return;
  }

  uni.previewImage({
    current: 0,
    urls: [goods.imgUrl],
  });
};

const deleteInfo = reactive({ id: '' });

const deleteItem = ({ id }: any) => {
  deleteInfo.id = id;
  popupDeleteRef.value.open();
};

const popupDeleteConfirm = async () => {
  const { code, msg } = await updateWarrantyStatusRequest({
    id: deleteInfo.id,
    deleted: 'Y',
  });

  if (code !== 0) {
    uni.showToast({
      title: msg || '删除失败',
      icon: 'error',
    });
    return;
  }

  uni.showToast({
    title: '删除成功',
    icon: 'success',
  });
  setTimeout(() => {
    params.curPage = 1;
    getWarrantyList();
  }, 800);
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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
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
        display: flex;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;

        .quality-cell-header-num-icon {
          width: 32rpx;
          height: 32rpx;
          margin-right: 10rpx;
        }
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
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }

        .quality-cell-content-list-item-code {
          grid-area: code;
          font-size: 24rpx;
          color: #9697a2;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }

        .quality-cell-content-list-item-status {
          grid-area: status;
          justify-self: flex-end;
          padding: 0 20rpx;
          height: 32rpx;
          line-height: 32rpx;
          font-size: 20rpx;

          &.A {
            background-color: #0ec06020;
            color: #0ec060;
          }
          &.B {
            text-decoration: line-through;
            background-color: #9697a220;
            color: #9697a2;
          }
          &.C {
            background-color: #fa525220;
            color: #fa5252;
          }
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
      grid-template-columns: 1fr 1fr;
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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;

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
