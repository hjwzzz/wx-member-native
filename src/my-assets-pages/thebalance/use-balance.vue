<template>
  <CustomPage>
    <view class="balanceContent">
      <view class="useRbalance">
        <!-- refresher-enabled="true" -->
        <scroll-view
          :refresher-triggered="triggered"
          :refresher-threshold="100"
          refresher-default-style="black"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
        >
          <view
            class="yuer"
            :style="{
              background: styleObj.item,
            }"
          >
            <image
              class="card-bg"
              :src="`${staticUrl}quality/integar-bg.png`"
              alt=""
            >
            </image>
            <view class="title">
              <view class="top" :style="{ color: styleObj.top }">
                {{ styleObj.name }}总余额({{ styleObj.unit || '' }})
              </view>
              <view class="bottom" :style="{ color: styleObj.bottom }">
                {{ styleObj.totalValue || 0 }}
              </view>
            </view>
            <view class="foolt">
              <view class="left">
                <view class="topTo" :style="{ color: styleObj.topTo }">
                  累计充值
                </view>
                <view class="bottomTo" :style="{ color: styleObj.bottomTo }">
                  {{ styleObj.totalValueIn || 0 }}
                </view>
              </view>
              <view class="right">
                <view class="topTo" :style="{ color: styleObj.topTo }">
                  累计赠送
                </view>
                <view class="bottomTo" :style="{ color: styleObj.bottomTo }">
                  {{ styleObj.totalBonusIn || 0 }}
                </view>
              </view>
            </view>
          </view>

          <IncExpDetail
            title="交易明细"
            v-model:time="timeValue"
            :tabList="tabList"
            v-model:current="current"
            @changeDate="changeDate"
            @changeTabs="changeTabs"
          >
            <!-- 全部页面 -->
            <view class="boxList">
              <view class="tit">
                <view class="item">
                  <view class="left">
                    {{ timeValue }}
                  </view>
                  <view class="right">
                    <!-- v-if="current === 0 || current === 1" -->
                    <view class="r1">
                      收入：<text class="yuan">
                        {{ totalInOfMonth }}
                      </text>
                    </view>
                    <!--v-if="current === 0 || current === 2" -->
                    <view class="r2">
                      支出：<text class="yuan">
                        {{
                          current === 1 || current === 2 ? 0 : totalOutOfMonth
                        }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>
              <view v-if="dataList.length" class="xiaofei">
                <view
                  v-for="(item, index) in dataList"
                  :key="index"
                  class="item"
                  @click="detail(item)"
                >
                  <view class="top">
                    <view class="left">
                      <text v-if="item.opReason">
                        {{ getText(item.opReason) || '' }}
                      </text>
                    </view>
                    <view
                      class="bottwo"
                      :class="showColor(item.realValue) ? 'income' : ''"
                    >
                      {{ incomeFun(item.realValue) }}
                    </view>
                  </view>
                  <view class="bottom">
                    {{ item.createTime }}
                  </view>
                </view>
              </view>
              <view v-else class="imagewu">
                <image
                  class="image"
                  :src="`${staticUrl}img/wuyuer.png`"
                  mode="aspectFit"
                />
                <view class="wujilu"> 暂无交易记录 </view>
              </view>
            </view>
          </IncExpDetail>
        </scroll-view>
        <!-- 加载更多 -->
        <!-- <u-loadmore
            v-show="totalPage > 1"
            :status="status"
            :icon-type="iconType"
            :load-text="loadText"
            :icon-color="iconColor"
            :font-size="fontSize"
            margin-top="30"
            color="#D8D9E0"
          />
       -->
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
import { queryDepList } from '@/api/center';
import {
  getDepositHistoryTotalFront,
  queryDepositHistoryPageFront,
} from '@/my-assets-pages/api/thebalance';
//
// import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';
import { onMounted, ref, Ref } from 'vue';
import IncExpDetail from '../component/IncomeExpenditureDetail/index.vue';

// const initBasicsData = useBasicsData();
// const loadingTop = ref(true);
const _freshing = ref(false);
const triggered = ref(true);
// const time = ref(1); // 1 表示有数据 2表示无数据
const current = ref(0); // 0表示 全部页面， 1 表示 收入页面 ， 2 表示支出页面
const timeValue = ref('');
const opKind = ref('');
// const show = ref(false);
// const status = ref('loadmore');
// const iconType = ref('circle');
// const iconColor = ref('#FF547B');
// const fontSize = ref('24');
const status = ref('loading');
const pageSize = ref(50);
const page = ref(1);
const totalPage = ref(0);
const totalInOfMonth = ref(0);
const totalOutOfMonth = ref(0);
// 日期
// const params = {
//   year: true,
//   month: true,
//   day: false,
// };
// tabs页面参数
// const list = [{ name: '全部' }, { name: '收入' }, { name: '支出' }];
// const loadText = {
//   loadmore: '轻轻上拉',
//   loading: '加载中...',
//   nomore: '已经到底了',
// };
const tabList = [
  {
    name: '全部',
    key: 0,
  },
  {
    name: '充值',
    key: 1,
  },
  {
    name: '赠送',
    key: 2,
  },
];
const totalData: Ref<any> = ref({
  time: '',
  totalInOfMonth: 0,
  totalOutOfMonth: 0,
});
const dataList: Ref<any> = ref([]);
const styleObj: Ref<any> = ref({});
// onLoad((options: any) => {
//   // console.log(JSON.stringify(data));
// });

onMounted(() => {
  timeValue.value = current_time();
  const res = uni.getStorageSync('balance');
  styleObj.value = res || {};
  queryDepDetailPageFun();
  getPointHistoryTotal();
  // refreshDepListFun();
});

const onRefresh = () => {
  if (_freshing.value) return;
  _freshing.value = true;
  dataList.value = [];
  refreshDepListFun();
  queryDepDetailPageFun();
};

const onRestore = () => {
  triggered.value = true; // 需要重置
};

const current_time = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = add_zero(date.getMonth() + 1);
  return `${year}-${month}`;
};
const add_zero = (temp: string | number) => {
  if (temp < 10) return `0${temp}`;
  return temp;
};

// 列表明细
const queryDepDetailPageFun = async () => {
  // console.log('queryDepDetailPageFun timeValue.value', timeValue.value);
  const body = {
    acctId: styleObj.value.id,
    curPage: page.value,
    startTime: timeValue.value,
    opReason: opKind.value,
    pageSize: 5000,
  };
  dataList.value = [];
  const res: any = await queryDepositHistoryPageFront(body);
  const {
    // detailList,
    totalData: totalList,
    totalPage: total,
    records,
  } = res.data;
  totalPage.value = total;
  totalData.value = totalList;
  // timeValue.value = totalList.time;
  if (page.value === 1) {
    dataList.value = records;
  } else {
    dataList.value.push(...records);
  }
  // console.log('records.lengt  ', records.length);
  // console.log('total.value ', total);
  // console.log('page.value >= totalPage.value ', page.value >= totalPage.value);
  // console.log(' records.length < total ', records.length < total);
  if (pageSize.value >= totalPage.value) {
    status.value = 'no-more';
  } else {
    status.value = 'loading';
  }
};

//
const getPointHistoryTotal = async () => {
  // console.log('getPointHistoryTotal timeValue.value', timeValue.value);
  const body = {
    acctId: styleObj.value.id,
    curPage: page.value,
    pageSize: 5000,
    startTime: timeValue.value,
    opReason: opKind.value,
  };
  const res: any = await getDepositHistoryTotalFront(body);
  totalInOfMonth.value = res.data.totalInOfMonth || 0;
  totalOutOfMonth.value = res.data.totalOutOfMonth || 0;
};

// <a-select-option value="XCHG">兑现</a-select-option>
// <a-select-option value="REC">收回</a-select-option>
// <a-select-option value="BACK">返还</a-select-option>

// <a-select-option value="DIFF">补差</a-select-option>
// <a-select-option value="PRF">结息</a-select-option>
// <a-select-option value="MAN">手动</a-select-option>
// <a-select-option value="IMP">导入</a-select-option>
// <a-select-option value="CHRG">充值</a-select-option>
// <a-select-option value="GIVE">赠送</a-select-option>
// <a-select-option value="CHRG_RET">充值退账</a-select-option>
// <a-select-option value="GIVE_RET">赠送退账</a-select-option>
// <a-select-option value="CHRG_DEC">充值扣减</a-select-option>
// <a-select-option value="GIVE_DEC">赠送扣减</a-select-option>
// <a-select-option value="CHRG_REC">充值退回</a-select-option>
//  <a-select-option value="GIVE_REC">赠送退回</a-select-option>

// 截取字符串
const getText = (str: any) => {
  const showText: any = {
    XCHG: '兑现',
    REC: '收回',
    BACK: '返还',
    DIFF: '补差',
    PRF: '结息',
    MAN: '手动',
    IMP: '导入',
    CHRG: '充值',
    GIVE: '赠送',
    CHRG_RET: '充值退账',
    GIVE_RET: '赠送退账',
    CHRG_DEC: '充值扣减',
    GIVE_DEC: '赠送扣减',
    CHRG_REC: '赠送退回',
    GIVE_REC: '赠送退回',
  };

  // let result = '';
  // result = str.substring(0, 12);
  // if (result.length >= 12) {
  //   return `${result}...`;
  // }
  return showText[str] || '--';
};

// 刷新接口
const refreshDepListFun = async () => {
  const res = await queryDepList('');
  const arr = res?.data.filter((item: any) => item.id === styleObj.value.id);
  styleObj.value.value = arr[0].value;
  styleObj.value.totalValue = arr[0].totalValue;
  styleObj.value.bonus = arr[0].bonus;
  styleObj.value.unit = arr[0].unit;
  setTimeout(() => {
    triggered.value = false;
    _freshing.value = false;
  }, 2000);
};

// 收入还是支出
const incomeFun = (val: any) => {
  if (Number(val) > 0) {
    return `+${val}`;
  }
  return val;
};
// 收入还是支出
const showColor = (val: any) => Number(val) > 0;

// 日期确认返回值
const changeDate = (time: string) => {
  // dataList.value = [];
  timeValue.value = time;
  queryDepDetailPageFun();
  getPointHistoryTotal();
};
const changeTabs = ({ index }: any) => {
  current.value = index;
  page.value = 1;
  dataList.value = [];
  // CHRG：充值 GIVE：赠送
  opKind.value = index === 0 ? '' : index === 1 ? 'CHRG' : 'GIVE';
  dataList.value = [];
  queryDepDetailPageFun();
};

// 跳转到 明细记录页面
const detail = (item: any) => {
  uni.setStorageSync('balanceRecord', item);
  uni.navigateTo({ url: '/my-assets-pages/thebalance/detail-record' });
};
</script>

<style lang="scss" scoped>
.balanceContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .rqi-cell-item {
    height: 100rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    position: relative;
    padding: 0 40rpx 0 40rpx;

    display: flex;
    justify-content: space-between;
    align-items: center;
    .rqi-cell-item-left {
      font-weight: 800;
      font-size: 28rpx;
      color: #323338;
    }
    .rqi-cell-item-right {
      color: #909399;
      font-size: 26rpx;
    }
  }
  .useRbalance {
    padding: 30rpx 30rpx 0;
    background-color: #f5f5f5;
    .iconto {
      position: absolute;
      right: 24rpx;
      top: 40rpx;
      color: #c0c0c0;
    }

    .yuer {
      padding: 30rpx;
      background-color: #191919;
      text-align: center;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      position: relative;
      .card-bg {
        width: calc(100vw - (60rpx));
        height: 300rpx;
        position: absolute;
        top: 0;
        left: 0;
      }

      .top {
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #ffffff;
      }

      .bottom {
        margin-top: 4rpx;
        font-size: 72rpx;
        color: #e2b87c;
      }

      .foolt {
        padding: 0 74rpx;
        margin-top: 20rpx;
        display: flex;
        justify-content: space-between;

        .topTo {
          font-size: 24rpx;
          color: #ffffff;
        }

        .bottomTo {
          margin-top: 8rpx;
          font-size: 32rpx;
          color: #e2b87c;
        }
      }
    }

    .rqi {
      height: 100rpx;
      background-color: #ffffff;
      border-radius: 16rpx;
      position: relative;
      padding: 0 40rpx 0 0;

      .u-cell_title {
        font-size: 70rpx;
      }
    }

    .allList {
      background-color: #ffffff;
      margin-top: 30rpx;
      border-radius: 30rpx;
      overflow: hidden;
      min-height: calc(100vh - 560rpx);

      .tabs-list {
        display: flex;
        justify-content: space-around;
        .tabs-list-item {
          min-width: 180rpx;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #aaabb5;
          font-size: 28rpx;
        }
        .tabs-list-item-action {
          position: relative;
          font-weight: bold;
          color: var(--main-color);
          &::after {
            position: absolute;
            bottom: 0px;
            content: '';
            height: 6rpx;
            width: 40rpx;
            background-color: var(--main-color);
          }
        }
      }
      .remark {
        width: 378rpx;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        text-overflow: ellipsis;
      }
    }

    :deep(.income-expenditure-detail) {
      .tabs-list {
        border-top-left-radius: 30rpx;
        border-top-right-radius: 30rpx;
      }
    }

    .boxList {
      margin-top: -4rpx;
      border-top: 1rpx solid #f6f7f8;
      min-height: calc(100vh - 800rpx);
      background-color: #fff;
      border-bottom-left-radius: 30rpx;
      border-bottom-right-radius: 30rpx;
      .tit {
        height: 88rpx;
        padding: 0 15rpx 0 15rpx;

        .item {
          font-size: 24rpx;
          margin-top: 28rpx;
          height: 60rpx;
          line-height: 60rpx;
          background-color: #fafafa;
          display: flex;
          justify-content: space-between;
          padding: 0 20rpx;

          .left {
            font-weight: 400;
          }

          .right {
            display: flex;

            .r1 {
              .yuan {
                color: #71d8a1;
              }
            }

            .r2 {
              margin-left: 20rpx;

              .yuan {
                color: #fa7777;
              }
            }
          }
        }
      }

      .xiaofei {
        margin-top: -24rpx;

        .item:nth-child(1) {
          border-top: 0 solid #007aff;
        }

        .item {
          padding: 30rpx;
          // height: 131rpx;
          border-top: 2rpx solid #f7f8f9;
          .top {
            font-size: 28rpx;
            font-weight: 800;
            display: flex;
            justify-content: space-between;

            .bott {
              padding-top: 8rpx;
              flex: 1;
            }
          }

          .bottom {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #b7b8c4;
          }
        }
      }

      .imagewu {
        text-align: center;
        margin-top: 50rpx;

        /* margin-bottom: ; */
        .image {
          width: 280rpx;
          height: 280rpx;
        }

        .wujilu {
          font-size: 28rpx;
          color: #9697a2;
          margin: 40rpx 0 148rpx 0;
        }
      }

      .left {
        font-weight: 400;
        font-size: 28rpx;
      }
    }

    .bottwo {
      padding-top: 8rpx;
      color: #fa5252;
    }
    .bottwo.income {
      color: #323338;
    }

    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 64rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #d8d9e0;
      line-height: 64rpx;
      text-align: center;
    }
  }
}
</style>
