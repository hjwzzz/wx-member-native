<template>
  <view class="wrap">
    <view>
      <view
        class="date-show"
        :style="{
          justifyContent:
            showData.notified === 'Y' ? 'space-between' : 'center',
        }"
      >
        <view class="left">
          <view class="lt-arrow" @click="lastMonth">
            <image
              :src="staticUrl + 'gift/arrow-l.png'"
              mode="aspectFit"
            ></image>
          </view>
          {{ year }}年{{ month }}月
          <view class="rt-arrow" @click="nextMonth">
            <image
              :src="staticUrl + 'gift/arrow-l.png'"
              mode="aspectFit"
            ></image>
          </view>
        </view>
        <view class="right" v-if="showData.notified === 'Y'">
          <text class="right-text">签到提醒</text
          ><switch
            class="right-switch"
            :checked="check"
            size="30"
            @change="change"
            color="#FF394E"
            style="transform: scale(0.56) translate(-25%, -42%)"
          ></switch>
        </view>
      </view>

      <view class="tips" v-if="showData.incred === 'Y' && !isEmpty">
        <view class="tips-con">
          <text>再连续签到</text
          ><text class="tips-con-color">{{
            showData.award.afterDay || ''
          }}</text
          ><text>天，额外赠送</text
          ><text class="tips-con-color gift" @click="clickGiftFun()"
            >{{ showData.award.seriesDay || '' }}天礼包</text
          >
        </view>
      </view>
    </view>
    <view class="header">
      <view v-for="item in week" :key="item">{{ item }} </view>
    </view>
    <view class="date-box">
      <view
        v-for="(item, index) in dateArr"
        :key="index"
        :class="
          today === item.date && !item.gift && !item.signIn ? 'nowDay' : ''
        "
      >
        <view class="date-head">
          <view
            v-if="today !== item.date && !item.gift && !item.signIn"
            :class="!item.thisMonth ? 'notThisMonth' : ''"
            >{{ item.dateNum }}</view
          >
          <view v-else-if="item.signIn" class="icon">
            <image
              :src="staticUrl + 'gift/signIn.png'"
              mode="aspectFit"
            ></image>
          </view>
          <view v-else-if="item.gift" @click="clickGiftFun(item)" class="icon">
            <image
              :src="staticUrl + 'gift/giftIcon.png'"
              mode="aspectFit"
            ></image>
          </view>
          <view v-else>今</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app';
import { ref, watch } from 'vue';
import { staticUrl } from '@/utils/config';

const props = defineProps({
  showData: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(['getMonth', 'clickGift', 'openNotice']);

const year = ref(0);
const month = ref(0);
const week = ref(['日', '一', '二', '三', '四', '五', '六']);
const dateArr = ref<any[]>([]);
const today = ref('0');
const dateWeek = ref(false);
const todayIndex = ref(0);
const check = ref(false);
const isEmpty = ref(false);
watch(
  () => props.showData,
  val => {
    setStatus(dateArr.value, val.giftDate || [], 'gift');
    setStatus(dateArr.value, val.signInDate || [], 'signIn');
    check.value = val.userNotified === 'Y';
    isEmpty.value = !val.award;
  }
);
const setStatus = (arr: any[], val: any, name: any) => {
  arr.forEach(item => {
    if (val.includes(item.date)) {
      item[name] = true;
    } else {
      item[name] = false;
    }
  });
};

const init = () => {
  const now = new Date();
  year.value = now.getFullYear();
  month.value = now.getMonth() + 1;
  today.value = `${year.value}-${
    month.value >= 10 ? month.value : `0${month.value}`
  }-${now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`}`;
  dateInit();
};
const dateInit = (setYear = 0, setMonth = 0) => {
  // 全部时间的月份都是按0~11基准，显示月份才+1
  const dateArrNew = []; // 需要遍历的日历数组数据
  let arrLen = 0; // dateArr的数组长度
  const now = setYear ? new Date(setYear, setMonth) : new Date();
  const year = setYear || now.getFullYear();
  let nextYear = 0;
  const month = setMonth || now.getMonth(); // 没有+1方便后面计算当月总天数
  const nextMonth = month + 1 > 11 ? 1 : month + 1;
  const startWeek = new Date(`${year}/${month + 1}/${1}`)
    .getDay(); // 目标月1号对应的星期
  let dayNums = new Date(year, nextMonth, 0)
    .getDate(); // 获取目标月有多少天
  let obj = {};
  let num = 0;
  const firstDayOfMonth = new Date(year, month, 1)
    .getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0)
    .getDate();
  const lastDayOfPreMonth =
    month === 0
      ? new Date(year - 1, 11, 0)
        .getDate()
      : new Date(year, month, 0)
        .getDate();
  if (month + 1 > 11) {
    nextYear = year + 1;
    dayNums = new Date(nextYear, nextMonth, 0)
      .getDate();
  }
  arrLen = startWeek + dayNums;
  console.log('arrLen', arrLen);
  let day = 0;
  for (let i = 0; i < 42; i++) {
    num = i - startWeek + 1;
    if (i >= startWeek && num <= lastDateOfMonth) {
      obj = {
        date: `${year}-${month + 1 >= 10 ? month + 1 : `0${month + 1}`}-${
          num >= 10 ? num : `0${num}`
        }`,
        dateNum: num,
        thisMonth: true,
      };
    } else {
      // obj = {}
      const k = lastDayOfPreMonth - firstDayOfMonth + 1;
      if (i < 6) {
        obj = {
          date: `${year}-${month >= 10 ? month : `0${month}`}-${
            k + i >= 10 ? k + i : `0${k + i}`
          }`,
          dateNum: k + i,
          thisMonth: false,
        };
      } else {
        day++;
        obj = {
          date: `${year}-${month + 2 >= 10 ? month + 2 : `0${month + 2}`}-${
            day >= 10 ? day : `0${day}`
          }`,
          dateNum: day,
          thisMonth: false,
        };
      }
    }
    dateArrNew[i] = obj;
  }
  let arr = [...dateArrNew];
  const lastDayIndex = dateArrNew.findIndex((item: any) => item.date ===
      `${year}-${month + 1 >= 10 ? month + 1 : `0${month + 1}`}-${
        lastDateOfMonth >= 10 ? lastDateOfMonth : `0${lastDateOfMonth}`
      }`);
  if ((lastDayIndex + 1) % 7 === 0) {
    arr = arr.slice(0, lastDayIndex + 1);
  } else if (lastDayIndex + 1 < 35) {
    arr = arr.slice(0, 35);
  }
  dateArr.value = arr;
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowWeek = nowDate.getDay();
  const getYear = setYear || nowYear;
  const getMonth = setMonth >= 0 ? setMonth + 1 : nowMonth;

  if (nowYear === getYear && nowMonth === getMonth) {
    dateWeek.value = true;
    todayIndex.value = nowWeek;
  } else {
    dateWeek.value = false;
    todayIndex.value = -1;
  }
};
const lastMonth = () => {
  // 全部时间的月份都是按0~11基准，显示月份才+1
  year.value = month.value - 2 < 0 ? year.value - 1 : year.value;
  const monthNew = month.value - 2 < 0 ? 11 : month.value - 2;
  month.value = monthNew + 1;
  dateInit(year.value, monthNew);
  emits(
    'getMonth',
    `${year.value}-${month.value >= 10 ? month.value : `0${month.value}`}`
  );
};
const nextMonth = () => {
  // 全部时间的月份都是按0~11基准，显示月份才+1
  year.value = month.value > 11 ? year.value + 1 : year.value;
  const monthNew = month.value > 11 ? 0 : month.value;
  month.value = monthNew + 1;
  dateInit(year.value, monthNew);
  emits(
    'getMonth',
    `${year.value}-${month.value >= 10 ? month.value : `0${month.value}`}`
  );
};
const clickGiftFun = (item: any = null) => {
  if (item) {
    emits('clickGift', item.date);
  } else {
    emits('clickGift', props.showData.award);
  }
};
const change = (val: any) => {
  emits('openNotice', val);
};
onShow(() => {
  init();
});
</script>
<style lang="scss" scoped>
.wrap {
  background: #fff;
  border-radius: 16rpx;
  padding-top: 40rpx;
}

.date-show {
  font-family: PingFang-SC-Regular;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin: 0rpx auto 10rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  .right {
    width: 170rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #b7b8c4;
    display: flex;
    align-items: center;
    &-text {
      flex: 1;
      margin-right: 10rpx;
    }
    &-switch {
      flex: none;
      width: 64rpx;
      height: 36rpx;
    }
  }
  .left {
    width: 330rpx;
    position: relative;
  }
  .lt-arrow,
  .rt-arrow {
    position: absolute;
    top: -10rpx;
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lt-arrow image,
  .rt-arrow image {
    width: 28rpx;
    height: 28rpx;
  }

  .rt-arrow {
    right: 0;
    transform: rotate(180deg);
  }
}

.tips {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b7b8c4;
  text-align: center;
  padding: 10rpx 30rpx;
  &-con {
    padding: 16rpx;
    background: #fafafa;
    border-radius: 8rpx;

    &-color {
      color: #ff394e;
    }
    .gift {
      text-decoration: underline;
    }
  }
}
.header > view {
  display: inline-block;
  width: 14.285%;
  text-align: center;
  padding: 39rpx 0;
  color: #b7b8c4;
  font-size: 24rpx;
}

.weekMark {
  position: relative;
}

.weekMark view {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #22a7f6;
}

.date-box {
  font-size: 0;
  padding: 10rpx 0;
}

.date-box > view {
  position: relative;
  display: inline-block;
  width: 14.285%;
  color: #020202;
  font-size: 40rpx;
  text-align: center;
  vertical-align: middle;
  margin: 15rpx 0;
}

.date-head {
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  color: #666666;
  font-family: PingFangSC-Regular, PingFang SC;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 60rpx;
  height: 60rpx;
}

.icon image {
  width: 48rpx;
  height: 48rpx;
}

.nowDay .date-head {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  text-align: center;
  color: #ff394e;
  border-radius: 100rpx;
  border: 4rpx solid #ff394e;
  margin: 0 auto;
}

.notThisMonth {
  color: #b7b8c4;
}

.date-weight {
  font-size: 22rpx;
  padding: 15rpx 0;
}

.nowDay .date-weight {
  color: #22a7f6;
}

.one {
  position: absolute;
  bottom: 0;
  right: 5rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: red;
}

.two {
  position: absolute;
  bottom: 30rpx;
  right: 5rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: blue;
}
</style>
