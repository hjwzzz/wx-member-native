<template>
  <CustomPage>
    <view class="useRbalance">
      <view>
        <view
          class="yuer"
          :style="{
            background: indexBackgroundImage,
          }"
        >
          <view class="top-title">
            <view class="bottom">{{ totalObj.value || 0 }}</view>
          </view>
          <view class="foolt">
            {{ totalObj.clearTip || '' }}
          </view>
        </view>

        <IncExpDetail
          :title="`${totalObj.name}明细`"
          v-model:time="timeValue"
          :tabList="[
            { key: 0, name: '全部' },
            { key: 1, name: '收入' },
            { key: 2, name: '支出' },
          ]"
          v-model:current="current"
          @changeDate="changeDate"
          @changeTabs="changeTabs"
        >
          <view class="tit-info">
            <view class="item">
              <view class="left">
                {{ timeValue }}
              </view>
              <view class="right">
                <view class="r1" v-if="current === 0 || current === 1">
                  <text> 收入：</text>
                  <text class="yuan">
                    {{ totalInOfMonth }}
                  </text>
                </view>
                <view class="r2" v-if="current === 0 || current === 2">
                  <text> 支出：</text>
                  <text class="yuan">
                    {{ setTotalOutOfMonth(totalOutOfMonth) }}
                  </text>
                </view>
              </view>
            </view>
          </view>
          <view class="content-box">
            <scroll-view
              class="content"
              :refresher-triggered="loadingTop"
              refresher-default-style="black"
              scroll-y
              @scrolltolower="onLoadMore"
            >
              <view class="boxList">
                <view class="title">
                  <view class="jifei" v-if="dataList.length">
                    <view
                      class="item"
                      v-for="(item, index) in dataList"
                      :key="index"
                    >
                      <view class="top">
                        <view class="left">
                          <text v-if="item.remark">{{
                            getText(item.remark) || ''
                          }}</text>
                        </view>
                        <view
                          class="bott"
                          :style="{
                            color:
                              Number(item.realPoint) < 0 ? '#f33030' : '#000',
                          }"
                        >
                          {{ incomeFun(item.opKind) }}{{ item.realPoint }}
                        </view>
                      </view>
                      <view class="bottom">
                        <view class="left left-time">
                          {{ item.createTime }}
                        </view>
                      </view>
                    </view>
                    <uni-load-more
                      :status="status"
                      color="#D8D9E0"
                    ></uni-load-more>
                  </view>
                  <view class="imagewu" v-else>
                    <image
                      class="image"
                      :src="staticUrl + 'img/noIntegral.png'"
                      mode=""
                    ></image>
                    <view class="wujilu"> 暂无{{ totalObj.name }}记录 </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
        </IncExpDetail>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
// import { queryPointDetailPage } from '@/api/center';
import {
  queryPointDetailPageFront,
  getPointHistoryTotalFront,
} from '@/my-assets-pages/api/integral';
import { staticUrl } from '@/utils/config';
import { onMounted, ref, Ref } from 'vue';
import IncExpDetail from '../component/IncomeExpenditureDetail/index.vue';

const indexBackgroundImage = `url(${staticUrl}quality/integar-bg.png) #ff547b  center center / 100% 100% no-repeat;`;

const loadingTop = ref(true);
// const _freshing = ref(false);
// const triggered = ref(true);
// const time = ref(1); // 1 表示有数据 2表示无数据
const current = ref(0); // 0表示 全部页面， 1 表示 收入页面 ， 2 表示支出页面
const timeValue = ref('');
const opKind = ref('');
const status = ref('loading');
const page = ref(1);
const totalPage = ref(0);
const totalObj: Ref<any> = ref({
  clearTip: '',
  id: '',
});
const pageSize = ref(50);
const totalData: Ref<any> = ref({ time: '' });
const totalInOfMonth = ref(0);
const totalOutOfMonth = ref(0);
const dataList: Ref<any> = ref([]);

onLoad((options: any) => {
  // const data = JSON.parse(options.item);
  // totalObj.value = data;
  let data = uni.getStorageSync('integral-record-item');
  if (!data) {
    data = JSON.parse(options.item);
  }
  totalObj.value = data;
  console.log(data);
  uni.setNavigationBarTitle({ title: `我的${data.name}` || '积分' });
});

onMounted(() => {
  // get_time();
  timeValue.value = current_time();
  queryPointDetailPagFun();
  getPointHistoryTotal();
});

// 加载更多
const onLoadMore = () => {
  if (status.value === 'no-more') {
    return;
  }
  page.value += 1;
  queryPointDetailPagFun();
  console.log('加载更多');
};

const setTotalOutOfMonth = (num: any) => {
  const text = Number(num);
  if (text < 0) {
    return text * -1;
  }
  return text;
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

// 截取字符串
const getText = (str: any) => {
  let result = '';
  result = str.substring(0, 12);
  if (result.length >= 12) {
    return `${result}...`;
  }
  return result;
};

// 列表明细
const queryPointDetailPagFun = async (setMIn?: any) => {
  const body = {
    acctId: totalObj.value.id,
    curPage: page.value,
    startTime: timeValue.value,
    opKind: opKind.value,
    pageSize: pageSize.value,
  };

  const res: any = await queryPointDetailPageFront(body);
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
  clearTimeout(setMIn);
};

const getPointHistoryTotal = async () => {
  const body = {
    acctId: totalObj.value.id,
    curPage: page.value,
    startTime: timeValue.value,
    opKind: opKind.value,
  };
  const res: any = await getPointHistoryTotalFront(body);
  totalInOfMonth.value = res.data.totalInOfMonth || 0;
  totalOutOfMonth.value = res.data.totalOutOfMonth || 0;
};

// 收入还是支出
const incomeFun = (opKind: any) => {
  if (opKind.code === 'IN') {
    return '+';
  }
  return '';
};

// 日期确认返回值
const changeDate = (date: string) => {
  console.log('changeDate', date);
  page.value = 1;
  dataList.value = [];
  timeValue.value = date;
  getPointHistoryTotal();
  queryPointDetailPagFun();
};

// 切换页面
const changeTabs = (obj: any) => {
  current.value = obj.index;
  page.value = 1;
  dataList.value = [];
  switch (obj.index) {
    case 0:
      opKind.value = '';
      break;
    case 1:
      opKind.value = 'IN';
      break;
    case 2:
      opKind.value = 'OUT';
      break;
  }
  queryPointDetailPagFun();
};
</script>

<style lang="scss" scoped>
.content-box {
  border-bottom-left-radius: 30rpx;
  border-bottom-right-radius: 30rpx;
  overflow: hidden;
}
.content {
  height: calc(100vh - (755rpx + constant(safe-area-inset-bottom)));
  height: calc(100vh - (755rpx + env(safe-area-inset-bottom)));
}
scroll-view::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: transparent;
}
.tit-info {
  height: 88rpx;
  padding: 20rpx 15rpx 0 15rpx;
  background-color: white;
  border-top: 1rpx solid #f6f7f8;
  .item {
    font-size: 24rpx;
    // margin-top: 28rpx;
    height: 60rpx;
    line-height: 60rpx;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    .left {
      font-weight: 400;
      font-size: 28rpx;
      color: #323338;
      .left-time {
        color: #b7b8c4;
      }
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

.useRbalance {
  padding: 30rpx;
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-title {
    padding-top: 40rpx;
    line-height: 100rpx;
  }
  .yuer {
    // padding: 40rpx;
    background-color: #ff547b;
    text-align: center;
    border-radius: 16rpx;
    margin-bottom: 30rpx;
    height: 234rpx;

    .bottom {
      margin-top: 4rpx;
      font-size: 72rpx;
      color: #ffffff;
    }

    .foolt {
      padding: 0 74rpx;
      margin-top: 20rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }

  :deep(.income-expenditure-detail) {
    .tabs-list {
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;
    }
  }

  .boxList {
    // margin-top: -4rpx;
    border-top: 1rpx solid #f6f7f8;
    min-height: calc(100vh - 850rpx);
    background-color: #fff;
    // border-bottom-left-radius: 30rpx;
    // border-bottom-right-radius: 30rpx;
    margin-bottom: 50rpx;

    .jifei {
      margin-top: -24rpx;
      .item:nth-child(1) {
        border-top: 0 solid #007aff;
      }
      .item {
        padding: 30rpx;
        // height: 131rpx;
        border-top: 2rpx solid #f7f8f9;
        color: #323338;
        .top {
          font-size: 28rpx;
          // font-weight: 800;
          display: flex;
          justify-content: space-between;

          .bott {
            padding-top: 8rpx;
          }
        }

        .bottom {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #b7b8c4;
          display: flex;
          justify-content: space-between;
        }
      }
    }

    .imagewu {
      text-align: center;
      margin-top: 80rpx;

      /* margin-bottom: ; */
      .image {
        width: 320rpx;
        height: 320rpx;
      }

      .wujilu {
        font-size: 28rpx;
        color: #9697a2;
        margin: 40rpx 0 148rpx 0;
      }
    }
  }
}
</style>
