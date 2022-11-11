<template>
  <CustomPage bottom>
    <view class="dateTime">
      <view class="wrapper">
        <view class="calendar" v-if="showCalendar">
          <uni-calendar
            :insert="true"
            :showMonth="false"
            :date="selectedTime"
            :start-date="startDate"
            :end-date="endDate"
            :selected="fullList"
            @change="change"
          />
        </view>
        <view class="select-time" v-if="timeList.length">
          <view class="title">选择时间段</view>
          <view class="box">
            <view
              class="item"
              v-for="item in timeList"
              :key="item.id"
              :class="{
                full: item.bookCnt - item.alreadyBookCnt === 0,
                active: timeId === item.id,
              }"
              @click="selectItem(item)"
            >
              <view class="time"
                >{{ item.beginTime }} - {{ item.endTime }}</view
              >
              <view class="num">{{ item.tips }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="footer">
        <button class="btn bgCM" @click="confirm">确认</button>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryBookingTimeCaseListFront } from '../api/api';
import { onLoad } from '@dcloudio/uni-app';
import { Ref, ref } from 'vue';

const data: Ref<any> = ref('');
const startDate = ref('');
const timeId = ref('');
const endDate = ref('');
const showCalendar = ref(false);
const selectedTime = ref('');
const fullList: Ref<any[]> = ref([]);
const timeList: Ref<any[]> = ref([]);
let list: any[] = [];
let time = '';
onLoad((_data: any) => {
  data.value = _data;
  startDate.value = _data.startTime;
  timeId.value = _data.timeId;
  endDate.value = _data.endTime;
  showCalendar.value = true;
  selectedTime.value = _data.selectedTime || _data.startTime;
  queryTimeCaseList();
});
const queryTimeCaseList = async () => {
  const { data: _data } = await queryBookingTimeCaseListFront({
    distId: data.value.distId,
    beginTime: startDate.value,
    endTime: endDate.value,
    svcId: data.value.id,
  });
  list = _data;

  fullList.value = list
    .filter((i: any) => i.status === 'Y')
    .map((i: any) => ({
      date: i.date,
      info: '已约满',
    }));
  timeList.value = list.find((item: { date: string }) => item.date === selectedTime.value).timeList;
  timeList.value.forEach(item => {
    if (item.id === timeId.value && item.tips === '已满') {
      timeId.value = '';
    }
  });
};

// 选择日期
const change = (e: { fulldate: string }) => {
  selectedTime.value = e.fulldate;
  timeId.value = '';
  timeList.value = list.find(item => item.date === e.fulldate).timeList;
};
// 选择时间段
const selectItem = (obj: {
  bookCnt: number;
  alreadyBookCnt: number;
  id: string;
  beginTime: any;
  endTime: any;
}) => {
  if (obj.bookCnt - obj.alreadyBookCnt > 0) {
    timeId.value = obj.id;
    time = `${obj.beginTime}-${obj.endTime}`;
  }
};
// 提交
const confirm = () => {
  try {
    if (!selectedTime.value) {
      throw '请选择日期';
    }
    if (!timeId.value) {
      throw '请选择时间段';
    }
    uni.$emit('chooseDateTime', {
      selectedTime: selectedTime.value,
      timeId: timeId.value,
      dataTime: `${selectedTime.value} ${time}`,
    });
    uni.navigateBack();
  } catch (err: any) {
    setTimeout(() => {
      uni.showToast({
        title: err,
        icon: 'none',
        duration: 3000,
      });
    }, 500);
  }
};
</script>

<style scoped lang="scss">
.dateTime {
  .wrapper {
    .calendar {
      background: #fff;
      :deep(.uni-calendar) {
        .uni-calendar__content {
          border-radius: 16rpx;
          .uni-calendar__backtoday {
            display: none;
          }
          .uni-calendar__header {
            border-bottom-color: transparent;
            .uni-calendar__header-text {
              font-weight: bold;
            }
          }
          .uni-calendar__box {
            .uni-calendar__weeks-item {
              .uni-calendar-item--checked {
                background-color: var(--main-color);
                border-radius: 50%;
              }
              .uni-calendar-item__weeks-box {
                width: 100rpx;
                height: 100rpx;
                .uni-calendar-item__weeks-lunar-text {
                  color: var(--main-color);
                }
                .uni-calendar-item__weeks-box-circle {
                  display: none;
                }
              }
              .uni-calendar-item--isDay {
                background: var(--main-color);
                color: #fff;
                border-radius: 50%;
                .uni-calendar-item__weeks-lunar-text {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
    .select-time {
      margin: 30rpx 30rpx 0 30rpx;
      padding: 30rpx;
      background: #fff;
      border-radius: 16rpx;
      .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #323338;
        margin-bottom: 30rpx;
      }
      .box {
        display: grid;
        grid-template-columns: 194rpx 194rpx 194rpx;
        grid-row-gap: 24rpx;
        grid-column-gap: 24rpx;
        // max-height: 300rpx;
        overflow: auto;
        .item {
          box-sizing: border-box;
          height: 120rpx;
          border-radius: 16rpx;
          border: 2rpx solid #ebedf0;
          padding: 20rpx 0;
          font-size: 24rpx;
          text-align: center;
          .num {
            margin-top: 8rpx;
          }
        }
        .full {
          background: #f5f5f5;
        }
        .active {
          color: #fff;
          background: var(--main-color);
          border: 2rpx solid var(--main-color);
        }
      }
    }
  }

  .footer {
    box-sizing: border-box;
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 10rpx 30rpx;
    padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
    .btn {
      color: white;
      font-size: 28rpx;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
    }
  }
}
</style>
