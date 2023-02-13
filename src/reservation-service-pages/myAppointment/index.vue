<template>
  <CustomPage>
    <view class="myAppointment">
      <USticky offset-top="0" class="tabBar">
        <Tabs
          :list="list"
          :current="current"
          :bar-style="{ background: initBasicsData.mainColor }"
          inactive-color="#9697A2"
          :active-item-style="{ color: initBasicsData.mainColor }"
          :bar-width="40"
          @change="handleChangeTab"
        />
      </USticky>

      <view class="main">
        <template v-if="subscribeList.length">
          <view
            v-for="item in subscribeList"
            :key="item.id"
            class="item"
            @click="goDetail(item)"
          >
            <view class="item-top">
              <image class="img" mode="aspectFit" :src="item.imgUrl" />
              <view class="name">
                {{ item.name }}
                <view class="cost clM">
                  {{
                    !item.acctId
                      ? '免费预约'
                      : `${parseInt(item.value)}${item.acctName}`
                  }}
                </view>
              </view>
              <view
                :class="[
                  'status',
                  item.status === 'NEW' ? 'clM' : 'cB',
                  { cG: ['CFD', 'FTF'].includes(item.status) },
                ]"
              >
                {{
                  ['CFD', 'FTF'].includes(item.status)
                    ? '已预约'
                    : item.status === 'NEW'
                    ? '待确认'
                    : item.status === 'FIN'
                    ? '已完成'
                    : item.status === 'CLOSE'
                    ? '已关闭'
                    : '已取消'
                }}
              </view>
            </view>
            <view class="item-body">
              <view class="body-item">
                <view class="label"> 预约门店： </view>
                <view class="value break-word">
                  {{ item.storeName }}
                </view>
              </view>
              <view class="body-item">
                <view class="label"> 预约时间： </view>
                <view class="value">
                  {{ item.bookServTime }}
                </view>
              </view>
            </view>
            <view class="item-foot">
              <!-- showMessageEvent -->

              <view
                v-if="['NEW', 'CFD'].includes(item.status)"
                class="btn"
                @click.stop="cancel(item)"
              >
                取消预约
              </view>

              <view
                v-if="getShowBtn(item)"
                class="btn btn-msg"
                :class="showUnsub(item) ? 'btn-msg-lis' : ''"
                @click.stop="subscribeEnabled(item)"
              >
                {{ showUnsub(item) ? '已订阅' : '订阅提醒' }}
              </view>

              <view
                v-if="item.status === 'FTF'"
                class="btn"
                @click.stop="complete(item)"
              >
                已完成
              </view>
              <view
                v-if="item.boolShowAppraiseBtn === 'Y' && item.status === 'FIN'"
                class="btn"
                @click.stop="goEvaluate(item)"
              >
                评价
              </view>
            </view>
          </view>
          <u-loadmore :status="moreStatus" color="#D8D9E0" margin-top="20" />
        </template>
        <view v-else class="no-data">
          <image
            class="img"
            mode="aspectFit"
            :src="`${staticUrl}img/empty/prize.png`"
          />
          <view class="text"> 暂无预约记录 </view>
        </view>
      </view>

      <cancelReason
        v-model:popup-show="popupShow"
        :record-id="recordId"
        @ok="refreshData"
      />
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryServiceBookPageFront } from '@/api/reservation-service';
import { updateFinishBookingFront } from '../api/api';
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { Ref, ref } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
import Tabs from '@/components/Tabs/tab2.vue';
import USticky from '@/components/Tabs/u-sticky.vue';
import cancelReason from './component/cancel-reason.vue';
import Storage from '@/utils/storage';
import {
  // getByKindAndCode,
  getOperationMessageEventByCode,
  saveMiniAppSubscribeMessageEnabled,
} from '@/api/index';

const initBasicsData = useBasicsData();
const list = [
  { name: '全部' },
  { name: '待确认' },
  { name: '已预约' },
  { name: '已完成' },
  { name: '已取消' },
  { name: '已关闭' },
];
let curPage = 1;
let pageSize = 30;
const subscribeList: Ref<any[]> = ref([]);
const current = ref(0);
const popupShow = ref(false);
const recordId = ref('');
const moreStatus = ref('loadmore');
let tabKey = '';
let total = 0;

const subscribeEnabled = (item: any) => {
  //  unsubscribeTplIds subscribeTplIds
  if (!item.unsubscribeTplIds || item.unsubscribeTplIds.length === 0) {
    // uni.showToast({
    //   title: '订阅失败，请联系客服添加服务类目',
    //   duration: 3000,
    //   icon: 'none',
    // });
    return;
  }
  // .subscribeEnabled id
  uni.requestSubscribeMessage({
    tmplIds: item.unsubscribeTplIds,
    success(res: any) {
      const cssel = Object.values(res);
      if (cssel.includes('accept')) {
        setSaveMiniAppSubscribeMessageEnabled(item.id, item.unsubscribeTplIds);
      }
    },
  });
};

const getShowBtn = (item: any) => {
  if (
    item.unsubscribeTplIds?.length === 0 &&
    item.subscribeTplIds?.length === 0
  ) {
    return false;
  }
  return ['NEW', 'CFD'].includes(item.status) && showMessageEvent.value;
};
const showUnsub = (item: any) => !item.unsubscribeTplIds || item.unsubscribeTplIds?.length === 0;

const setSaveMiniAppSubscribeMessageEnabled = async (
  id: string,
  tplIds: any
) => {
  await saveMiniAppSubscribeMessageEnabled({
    enabled: true,
    relatedId: id,
    templateIds: tplIds,
  });
  uni.showToast({
    title: '订阅成功',
    duration: 3000,
    icon: 'none',
  });
  setTimeout(() => {
    curPage = 1;
    subscribeList.value = [];
    querySubscribeList();
  }, 1000);
};

// const tmplIdsValue = ref([]);
// const getKindAndCode = async () => {
//   const res: any = await getByKindAndCode({
//     codes: ['booking_service_notice'],
//     kind: 'WM',
//   });
//   tmplIdsValue.value = res.data.map((item: any) => item.tplId) || [];
// };

const showMessageEvent = ref(false);
const getMessageEvent = async () => {
  const { data: { enabled } } = await getOperationMessageEventByCode({
    evtCode: 'booking_service_notice',
    kind: 'WX',
    templateKind: 'WM',
  });
  showMessageEvent.value = enabled === 'Y';
};

onShow(() => {
  curPage = 1;
  if (subscribeList.value.length === 0) {
    querySubscribeList();
  } else {
    pageSize = subscribeList.value.length;

    subscribeList.value = [];
    querySubscribeList();
  }
  getMessageEvent();
  // getKindAndCode();
});

const handleChangeTab = (index: number) => {
  current.value = index;
  const arr = ['', 'NEW', 'CFD', 'FIN', 'CANCEL', 'CLOSE'];
  subscribeList.value = [];
  tabKey = arr[index];
  curPage = 1;
  querySubscribeList();
};
const cancel = (obj: { id: any }) => {
  popupShow.value = true;
  recordId.value = obj.id;
};
const complete = (obj: { id: any }) => {
  uni.showModal({
    title: '完成服务',
    content: '是否确认完成服务',
    success: res => {
      if (res.confirm) {
        // 完成服务逻辑
        updateFinishBookingFront({ id: obj.id })
          .then(async () => {
            subscribeList.value = [];
            await querySubscribeList();
            setTimeout(() => {
              uni.showToast({
                icon: 'none',
                title: '操作完成',
                duration: 3000,
              });
            }, 500);
          });
      }
    },
  });
};
const goEvaluate = ({ id }: any) => {
  uni.navigateTo({ url: `/reservation-service-pages/myAppointment/evaluate?id=${id}` });
};
const refreshData = () => {
  subscribeList.value = [];
  querySubscribeList();
};
const goDetail = (obj: { id: any }) => {
  uni.navigateTo({ url: `/reservation-service-pages/myAppointment/detail?id=${obj.id}` });
};
onPullDownRefresh(() => {
  curPage = 1;
  querySubscribeList();
  uni.stopPullDownRefresh();
});
onReachBottom(() => {
  if (moreStatus.value === 'nomore') {
    return;
  }
  curPage++;
  querySubscribeList();
});

const querySubscribeList = async () => {
  const res = await queryServiceBookPageFront({
    curPage,
    pageSize,
    mid: Storage.getMid(),
    status: tabKey,
  });
  if (curPage === 1) {
    subscribeList.value = [];
  }
  subscribeList.value = [...subscribeList.value, ...res.data.records];
  total = res.data.totalRecord;
  moreStatus.value = subscribeList.value.length < total ? 'loadmore' : 'nomore';
};
</script>

<style scoped lang="scss">
.myAppointment {
  .main {
    min-height: calc(100% - 114rpx);
    padding: 30rpx 30rpx 0;
    .item + .item {
      margin-top: 30rpx;
    }
    .item {
      background: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;

      .item-top {
        display: flex;
        position: relative;
        .img {
          width: 84rpx;
          height: 84rpx;
          border-radius: 16rpx;
          margin-right: 20rpx;
        }
        .name {
          font-size: 28rpx;
          font-weight: bold;
          color: #323338;
          line-height: 40rpx;
          .cost {
            font-size: 24rpx;
            font-weight: normal;
            /*color: #FF547B;*/
            margin-top: 10rpx;
          }
        }
        .status {
          font-size: 28rpx;
          position: absolute;
          top: 0;
          right: 0;
          &.cG {
            color: #0ec060;
          }
          &.cB {
            color: #b7b8c4;
          }
        }
      }
      .item-body {
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #9697a2;
        line-height: 40rpx;
        .body-item {
          display: flex;
          .label {
            width: 120rpx;
            flex-shrink: 0;
          }
        }
        .body-item + .body-item {
          margin-top: 16rpx;
        }
      }
      .item-foot {
        display: flex;
        justify-content: flex-end;
        /*margin-top: 20rpx;*/
        color: #323338;
        .btn-msg {
          background-color: var(--main-color);
          color: white;
          border: 2rpx solid var(--main-color);
        }
        .btn-msg-lis {
          opacity: 0.5;
        }
        .btn {
          box-sizing: border-box;
          height: 64rpx;
          min-width: 150rpx;
          padding-left: 10rpx;
          padding-right: 10rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 32rpx;
          border: 2rpx solid #ebedf0;
          // padding: 14rpx 32rpx 16rpx;
          margin-left: 20rpx;
          font-size: 24rpx;
        }
      }
    }
    .no-data {
      text-align: center;
      padding-top: 100rpx;
      .img {
        width: 300rpx;
        height: 300rpx;
      }
      .text {
        font-size: 28rpx;
        color: #9697a2;
      }
    }
  }
}
</style>
