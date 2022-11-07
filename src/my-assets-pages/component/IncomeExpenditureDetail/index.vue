<template>
  <view class="income-expenditure-detail">
    <picker
      mode="date"
      fields="month"
      :value="time"
      :start="start || getPassYearFormatDate()"
      :end="end || current_time()"
      @change="changeDate"
    >
      <view class="picker-wrapper">
        <view class="picker-left">{{ title }}</view>
        <view class="picker-right">
          <text>
            {{ time }}
          </text>
          <uni-icons type="bottom" size="14" color="#B7B8C4"></uni-icons>
        </view>
      </view>
    </picker>

    <Tabs
      :tabList="tabList"
      :current="current"
      :fixed="fixed"
      @change="handleChange"
    ></Tabs>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue';
import Tabs from '@/components/Tabs/index.vue';

interface Props {
  title?: string;
  time: string;
  current: number;
  tabList: any[];
  fixed?: boolean;
  start?: string;
  end?: string;
}
const props = withDefaults(defineProps<Props>(), {
  time: '',
  start: '',
  end: '',
  title: '明细',
  current: 0,
  tabList: () => [],
  fixed: false,
});

// console.log('props', props);

const emits = defineEmits([
  'update:time',
  'changeDate',
  'update:current',
  'changeTabs',
]);

// 补零
const add_zero = (temp: string | number) => {
  if (temp < 10) return `0${temp}`;
  return temp;
};
// 开始时间
const getPassYearFormatDate = () => {
  const nowDate = new Date();
  nowDate.setDate(nowDate.getDate() - 365);
  const year = nowDate.getFullYear();
  let month: any = nowDate.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  const currentdate = `${year}-${month}`;
  return currentdate;
};
// 结束时间
const current_time = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = add_zero(date.getMonth() + 1);
  return `${year}-${month}`;
};
const changeDate = (event: any) => {
  emits('update:time', event.detail.value);
  emits('changeDate', event.detail.value);
};

const handleChange = ({ index, item }: any) => {
  emits('update:current', index);
  emits('changeTabs', { index, item });
};

// onMounted(() => {});
</script>

<style lang="scss" scoped>
.income-expenditure-detail {
  .picker-wrapper {
    height: 100rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    position: relative;
    padding: 0 40rpx 0 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    .picker-left {
      font-weight: 800;
      font-size: 28rpx;
      color: #323338;
    }
    .picker-right {
      color: #909399;
      font-size: 26rpx;
    }
  }
}
</style>
