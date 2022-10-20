<template>
  <CustomPage>
    <view class="useRbalance">
      <scroll-view
        class="content"
        :refresher-triggered="loadingTop"
        refresher-default-style="black"
        :scroll-y="false"
      >
        <!-- :refresher-enabled="true" -->
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
          <view class="rqi-cell-item" @click="picker">
            <view class="rqi-cell-item-left">
              {{ totalObj.name + '明细' }}</view
            >
            <view class="rqi-cell-item-right"
              >{{ timeValue }}
              <uni-icons type="bottom" size="14" color="#B7B8C4"></uni-icons>
            </view>
          </view>

          <view class="allList">
            <view class="tabs-list">
              <view
                class="tabs-list-item"
                :class="current === 0 ? 'tabs-list-item-action' : ''"
                @click="change(0)"
              >
                全部
              </view>
              <view
                class="tabs-list-item"
                :class="current === 1 ? 'tabs-list-item-action' : ''"
                @click="change(1)"
              >
                收入
              </view>
              <view
                class="tabs-list-item"
                :class="current === 2 ? 'tabs-list-item-action' : ''"
                @click="change(2)"
              >
                支出
              </view>
              <!-- <u-tabs
                class="u-tabs"
                :list="list"
                height="100"
                :is-scroll="false"
                :inactive-color="'#aaabb5'"
                :active-color="mainColor || '#323338'"
                bar-width="74"
                :current="current"
                @change="change"
                :bar-style="{ background: mainColor || '#FF547B' }"
              >
              </u-tabs> -->
            </view>
            <!-- 全部页面 -->
            <view class="boxList" v-if="current === 0">
              <view class="title">
                <view class="tit">
                  <view class="item">
                    <view class="left">
                      {{ totalData.time }}
                    </view>
                    <view class="right">
                      <view class="r1">
                        收入：<text class="yuan">{{
                          totalData.totalInOfMonth || 0
                        }}</text>
                      </view>
                      <view class="r2">
                        支出：<text class="yuan">{{
                          setTotalOutOfMonth(totalData.totalOutOfMonth) || 0
                        }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="jifei" v-if="dataList.length">
                  <view
                    class="item"
                    v-for="(item, index) in dataList"
                    @click="detail"
                    :key="index"
                  >
                    <view class="top">
                      <view class="left">
                        <text v-if="item.remark">{{
                          getText(item.remark) || ''
                        }}</text>
                      </view>
                      <!--     color: #f33030; -->
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
                      <!-- <view class="right"> {{ totalObj.name }} </view> -->
                    </view>
                  </view>
                </view>
                <view class="imagewu" v-else>
                  <image
                    :src="staticUrl + 'img/noIntegral.png'"
                    mode=""
                  ></image>
                  <view class="wujilu"> 暂无{{ totalObj.name }}记录 </view>
                </view>
              </view>
            </view>

            <view class="boxList" v-if="current === 1">
              <view class="title">
                <view class="tit">
                  <view class="item">
                    <view class="left">
                      {{ totalData.time }}
                    </view>
                    <view class="right">
                      <view class="r1">
                        收入：<text class="yuan">{{
                          totalData.totalInOfMonth || 0
                        }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="jifei" v-if="dataList.length">
                  <view
                    class="item"
                    v-for="(item, index) in dataList"
                    @click="detail"
                    :key="index"
                  >
                    <view class="top">
                      <view class="left">
                        <text v-if="item.remark">{{
                          getText(item.remark) || ''
                        }}</text>
                      </view>
                      <view class="bott">
                        {{ incomeFun(item.opKind) }}{{ item.realPoint }}
                      </view>
                    </view>
                    <view class="bottom">
                      <view class="left left-time">
                        {{ item.createTime }}
                      </view>
                      <!-- <view class="right"> {{ totalObj.name }} </view> -->
                    </view>
                  </view>
                </view>
                <view class="imagewu" v-else>
                  <image
                    :src="staticUrl + 'img/noIntegral.png'"
                    mode=""
                  ></image>
                  <view class="wujilu"> 暂无{{ totalObj.name }}记录 </view>
                </view>
              </view>
            </view>

            <view class="boxList" v-if="current === 2">
              <view class="title">
                <view class="tit">
                  <view class="item">
                    <view class="left">
                      {{ totalData.time }}
                    </view>
                    <view class="right">
                      <view class="r2">
                        支出：<text class="yuan">{{
                          setTotalOutOfMonth(totalData.totalOutOfMonth) || 0
                        }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="jifei" v-if="dataList.length">
                  <!--   @click="detail" -->
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
                      <view class="bottwo">
                        {{ incomeFun(item.opKind) }}{{ item.realPoint }}
                      </view>
                    </view>
                    <view class="bottom">
                      <view class="left left-time">
                        {{ item.createTime }}
                      </view>
                      <!-- <view class="right"> {{ totalObj.name }} </view> -->
                    </view>
                  </view>
                </view>
                <view class="imagewu" v-else>
                  <image
                    :src="staticUrl + 'img/noIntegral.png'"
                    mode=""
                  ></image>
                  <view class="wujilu"> 暂无{{ totalObj.name }}记录 </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- <u-picker
        mode="time"
        @cancel="cancel"
        @confirm="confirm"
        v-model="show"
        :params="params"
        :safe-area-inset-bottom="true"
        :start-year="getPassYearFormatDate()"
        :end-year="current_time()"
      ></u-picker> -->
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
      /> -->
      <!-- 底部信息 -->
      <!-- <footer-text></footer-text> -->
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { queryPointDetailPage, queryPointList } from '@/api/center';
import { staticUrl } from '@/utils/config';
import { onMounted, ref, Ref } from 'vue';
const indexBackgroundImage = `url(${staticUrl}quality/integar-bg.png) #ff547b  center center / 100% 100% no-repeat;`;

const loadingTop = ref(true);
const _freshing = ref(false);
const triggered = ref(true);
const time = ref(1); // 1 表示有数据 2表示无数据
const current = ref(0); // 0表示 全部页面， 1 表示 收入页面 ， 2 表示支出页面
const timeValue = ref('');
const opKind = ref('');
const show = ref(false);
const status = ref('loadmore');
const iconType = ref('circle');
const iconColor = ref('#FF547B');
const fontSize = ref('24');
const page = ref(1);
const totalPage = ref(0);
// 日期
const params = {
  year: true,
  month: true,
  day: false,
};
// tabs页面参数
const list = [{ name: '全部' }, { name: '收入' }, { name: '支出' }];
const loadText = {
  loadmore: '轻轻上拉',
  loading: '加载中...',
  nomore: '已经到底了',
};
//
const totalObj: Ref<any> = ref({
  clearTip: '',
  id: '',
});
const totalData: Ref<any> = ref({
  time: '',
  totalInOfMonth: '',
  totalOutOfMonth: '',
});
const dataList: Ref<any> = ref([]);

onLoad((options: any) => {
  const data = JSON.parse(options.item);
  totalObj.value = data;
  uni.setNavigationBarTitle({ title: `我的${data.name}` || '积分' });
  // console.log(JSON.stringify(data));
});

onMounted(() => {
  get_time();
  queryPointDetailPagFun();
});

const setTotalOutOfMonth = (num: any) => {
  const text = Number(num);
  if (text < 0) {
    return text * -1;
  }
  return text;
};

// const onRefresh = () => {
//   if (_freshing.value) return;
//   _freshing.value = true;
//   refreshPointListFun();
//   dataList.value = [];
//   queryPointDetailPagFun();
// };

// const onRestore = () => {
//   triggered.value = true; // 需要重置
// };

// 刷新接口
// const refreshPointListFun = async () => {
//   const res = await queryPointList('');
//   const arr = res?.data.filter((item: any) => item.id === totalObj.value.id);
//   totalObj.value.value = arr[0].value;
//   totalObj.value.clearTip = arr[0].clearTip;
//   setTimeout(() => {
//     triggered.value = false;
//     _freshing.value = false;
//   }, 2000);
// };

const get_time = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = add_zero(date.getMonth() + 1);
  timeValue.value = `${year}-${month}`;
  return `${year}-${month}`;
};
const current_time = () => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
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
    pageSize: 50,
  };
  const res: any = await queryPointDetailPage(body);
  const { detailList, totalData: totalList } = res?.data;
  totalPage.value = detailList.totalPage;
  totalData.value = totalList;
  timeValue.value = totalList.time;
  dataList.value = [...dataList.value, ...detailList.records];
  if (page.value >= totalPage.value) {
    status.value = 'nomore';
  } else {
    status.value = 'loading';
  }
  clearTimeout(setMIn);
};

// 上拉
// const refresherpulling = () => {
//   loadingTop.value = true;
//   page.value = 1;
//   let setMIn: any = null;
//   if (setMIn) {
//     clearTimeout(setMIn);
//   }
//   setMIn = setTimeout(() => {
//     queryPointDetailPagFun(setMIn);
//     loadingTop.value = false;
//   }, 1500);
// };

// 收入还是支出
const incomeFun = (opKind: any) => {
  if (opKind.code === 'IN') {
    return '+';
  }
  return '';
};

const picker = () => {
  show.value = true;
};

// 日期确认返回值
const confirm = res => {
  dataList.value = [];
  timeValue.value = `${res.year}-${res.month}`;
  queryPointDetailPagFun();
  // compareMonth(current_time(), timeValue.value);
  // this.getPassYearFormatDate();
};

// 切换页面
const change = (index: any) => {
  current.value = index;
  page.value = 1;
  dataList.value = [];
  switch (index) {
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
  dataList.value = [];
  queryPointDetailPagFun();
};

// 分页加载更多
// const onReachBottom = () => {
//   if (page.value >= totalPage.value) return;
//   status.value = 'loading';
//   page.value = ++page.value;
//   queryPointDetailPagFun();
// };

// const compareMonth = (d1: any, d2: any) => {
//   if (d2 > d1) {
//   } else if (getPassYearFormatDate() < d2) {
//   }
//   return d1 > d2;
// };

// 去年
const getPassYearFormatDate = () => {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() - 365);
  const year = nowDate.getFullYear();
  let month: any = nowDate.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  const currentdate = year;
  return currentdate;
};
</script>

<style lang="scss" scoped>
.content {
  min-height: calc(100vh - (150rpx + constant(safe-area-inset-bottom)));
  min-height: calc(100vh - (150rpx + env(safe-area-inset-bottom)));
}

.useRbalance {
  padding: 30rpx;
  background-color: #f5f5f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  .iconto {
    position: absolute;
    right: 24rpx;
    top: 40rpx;
    color: #c0c0c0;
  }

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

  .allList {
    background-color: #ffffff;
    margin-top: 30rpx;
    border-radius: 30rpx;
    overflow: hidden;
    padding-bottom: 60rpx;
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

    .boxList {
      margin-top: -4rpx;
      border-top: 1rpx solid #f6f7f8;
      .left {
        font-weight: 400;
        font-size: 28rpx;
        color: #323338;
        &.left-time {
          color: #b7b8c4;
        }
      }
    }

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
      image {
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

  .bottwo {
    padding-top: 8rpx;
    color: #f33030;
  }
}

scroll-view ::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: transparent;
}

// /deep/::-webkit-scrollbar {
//   display: none;
//   width: 0;
//   height: 0;
//   color: transparent;
//   background: transparent;
// }

// /deep/.uni-scroll-view ::-webkit-scrollbar {
//   display: none;
//   width: 0;
//   height: 0;
//   color: transparent;
//   background: transparent;
// }
</style>
