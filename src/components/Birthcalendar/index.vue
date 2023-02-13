<template>
  <uni-popup ref="CalendarRef" type="bottom" background-color="#fff" :is-mask-click="false">
    <view
      class="content"
      @touchmove.stop.prevent=""
    >
        <view class="header">
          <view
            class="btn close"
            @click="closeDialog"
          >
            取消
          </view>
          <view class="header-desc">选择时间</view>
          <view
            class="btn confirm"
            @click="confirmDialog"
          >
            确定
          </view>
        </view>

        <view class="type" v-if="selectLunar">
          <view
            :class="['type-item', 'solar', type === CALENDAR_TYPE.SOLAR ? 'current' : '']"
            @click="tabCalendar(CALENDAR_TYPE.SOLAR)"
          >
            <view class="type-item-text">
              阳历
            </view>
          </view>
          <view
            :class="['type-item', 'lunar', type === CALENDAR_TYPE.LUNAR ? 'current' : '']"
            @click="tabCalendar(CALENDAR_TYPE.LUNAR)"
          >
            <view class="type-item-text">
              农历
            </view>
          </view>
        </view>

        <picker-view
          class="picker"
          :value="value"
          @change="bindChange"
          :immediate-change="false"
        >
          <picker-view-column>
            <view
              v-for="(item,index) in years"
              :key="index"
              class="picker-item"
            >
              {{ item.label }}
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item,index) in months"
              :key="index"
              class="picker-item"
            >
              {{ item.label }}
            </view>
          </picker-view-column>
          <picker-view-column>
            <view
              v-for="(item,index) in days"
              :key="index"
              class="picker-item"
            >
              {{ item.label }}
            </view>
          </picker-view-column>
        </picker-view>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, reactive } from 'vue';
import { CALENDAR_TYPE, CalendarPickItem, CalendarMonthPickItem } from './index.type';
import { useCalendar } from './useBirthcalendar';
import { calendar as formatCalendar } from './calendar';

const { initLunar, initSolar } = useCalendar();

let date = new Date();

const CalendarRef = ref<any>();

const props = withDefaults(defineProps<{
  calendarType?: CALENDAR_TYPE
  date?: string
  selectLunar?: boolean
}>(), {
  date: `${new Date()
    .getFullYear()}-${new Date()
    .getMonth() + 1}-${new Date()
    .getDate()}`,
  calendarType: CALENDAR_TYPE.SOLAR,
  selectLunar: true
});

const open = () => {
  init();
  CalendarRef.value.open();
};

const close = () => {
  CalendarRef.value.close();
};

defineExpose({
  open,
  close
});

const emits = defineEmits(['closeDialog', 'confirmDialog']);


const years = ref<CalendarPickItem[]>([]);
const months = ref<CalendarMonthPickItem[]>([]);
const days = ref<CalendarPickItem[]>([]);

const value = ref<[number, number, number]>([0, 0, 0]); // 当前选择的五类下标【可以是3类、3类】
const lastValue = ref<[number, number, number]>([0, 0, 0]); // 当前选择的五类下标【可以是3类、3类】

const calendarValue = reactive({
  year: 0,
  month: 0,
  day: 0,
});

const calendarIndex = reactive({
  year: 0,
  month: 0,
  day: 0,
});

const type = ref<CALENDAR_TYPE>(CALENDAR_TYPE.SOLAR);

const getSolarCalendar = (type: CALENDAR_TYPE) => {
  if (type === CALENDAR_TYPE.SOLAR) {
    return initSolar(calendarValue);
  }
  if (type === CALENDAR_TYPE.LUNAR) {
    return initLunar(calendarValue);
  }

};

const setSolarCalendar = (type: CALENDAR_TYPE) => {
  const res = getSolarCalendar(type);

  if (!res) {
    return;
  }

  years.value = res.range[0] ?? [];
  months.value = res.range[1] ?? [];
  days.value = res.range[2] ?? [];

  calendarIndex.year = res.index.year ?? 0;
  calendarIndex.month = res.index.month ?? 0;
  calendarIndex.day = res.index.day ?? 0;

  calendarValue.year = res.value.year;
  calendarValue.month = res.value.month;
  calendarValue.day = res.value.day;

  nextTick(() => {
    value.value = [calendarIndex.year, calendarIndex.month, calendarIndex.day];
    lastValue.value = [calendarIndex.year, calendarIndex.month, calendarIndex.day];
  });
};

const init = () => {
  date = props.date ? new Date(`${props.date.replace(/-/g, '/')}`) : new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  calendarValue.year = year;
  calendarValue.month = month;
  calendarValue.day = day;

  // if (type.value === CALENDAR_TYPE.LUNAR) {
  //   console.log(year, month, day);
  //   const res = formatCalendar.lunar2solar(year, month, day);
  //   console.log('init', res);
  //   if (res === -1) {
  //     return;
  //   }

  //   calendarValue.year = res.cYear;
  //   calendarValue.month = res.cMonth;
  //   calendarValue.day = res.cDay;
  // }

  setSolarCalendar(type.value);
};

const bindChange = (e: any) => {

  const year = years.value[e.detail.value[0]].value;
  const month = months.value[e.detail.value[1]].value;
  const day = days.value[e.detail.value[2]].value;


  if (type.value === CALENDAR_TYPE.LUNAR) {
    const isLeapMonth = months.value[e.detail.value[1]].isLeap;
    let SolarRes: any;
    if (e.detail.value[0] !== lastValue.value[0]) {
      SolarRes = formatCalendar.lunar2solar(year, 1, 1);
    } else if (e.detail.value[1] !== lastValue.value[1]) {
      SolarRes = formatCalendar.lunar2solar(year, month, 1, isLeapMonth);
    } else if (e.detail.value[2] !== lastValue.value[2]) {
      SolarRes = formatCalendar.lunar2solar(year, month, day, isLeapMonth);
    }
    if (SolarRes === -1) {
      return;
    }
    calendarValue.year = SolarRes.cYear;
    calendarValue.month = SolarRes.cMonth;
    calendarValue.day = SolarRes.cDay;
  } else {
    calendarValue.year = year;
    calendarValue.month = month;
    calendarValue.day = day;
  }

  setSolarCalendar(type.value);

  nextTick(() => {
    calendarIndex.year = e.detail.value[0];
    calendarIndex.month = e.detail.value[1];
    calendarIndex.day = e.detail.value[2];
  });
};


const tabCalendar = (tab: CALENDAR_TYPE) => {
  if(type.value === tab) return false;// 同类不能重复转换
  type.value = tab;
  setSolarCalendar(tab);
};

const closeDialog = () => {
  emits('closeDialog');
};

const confirmDialog = () => {
  const SolarRes = formatCalendar.solar2lunar(calendarValue.year, calendarValue.month, calendarValue.day);

  let lunarDesc = '';

  if (SolarRes !== -1) {
    lunarDesc = `${SolarRes.lYear}-${SolarRes.IMonthCn}-${SolarRes.IDayCn}`;
  }

  emits('confirmDialog', {
    value: calendarValue,
    type: type.value,
    lunarDesc
  });

  // if(type.value === CALENDAR_TYPE.SOLAR) {
  //   solarDate.value = `${year.value}年${month.value}月${day.value}日`;
  //   returnDate.value = `${year.value}-${month.value}-${day.value}`;

  //   const toValues = render.submit(type.value, year.value, month.value, day.value);
  //   lunarDate.value = toValues.text;
  //   returnTime.value = `${toValues.hour}-${toValues.min}`;
  // }else{
  //   lunarDate.value = `${year.value}年${month.value}月${day.value}日`;

  //   const toValues = render.submit(type.value, year.value, month.value, day.value);
  //   solarDate.value = toValues.text;
  //   returnDate.value = `${toValues.year}-${toValues.month}-${toValues.day}`;
  //   returnTime.value = `${toValues.hour}-${toValues.min}`;
  // }
};

watch([() => props.calendarType], () => {
  type.value = props.calendarType;
  init();
}, { immediate: true });

watch([() => props.date], () => {
  init();
}, { immediate: true });

</script>

<style scoped lang="scss">
.content{
  background: #FFFFFF;
  border-radius: 20rpx/0;
  .header {
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
    padding: 0rpx 20rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    display: flex;
    justify-content: space-between;

    .header-desc {
      font-weight: 500;
      color: #323233;
    }

    .btn {
      font-size: 28rpx;
    }
    .close {
      color: #9697a2;
    }

    .confirm  {
      color: #ff547b;
    }
  }
  .type {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 64rpx;

    .type-item {
      color: #969799;
      font-size: 28rpx;
      height: 96rpx;
      line-height: 96rpx;
      box-sizing: border-box;

      &:not(:last-child) {
        margin-right: 76rpx;
      }

      .type-item-text {
        padding: 0 10rpx;
        box-sizing: border-box;
      }

      &.current {
        .type-item-text {
          color: #323233;
          position: relative;

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 6rpx;
            background: #ee0a24;
            border-radius: 200rpx;
            content: '';
            display: block;
          }
        }
      }
    }
  }

  .picker {
    width: 100%;
    height: 540rpx;

    .picker-item {
      font-size: 36rpx;
      font-weight: 500;
      text-align: center;
      color: #323338;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
