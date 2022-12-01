<template>
  <view
    class="timer"
    v-if="data.isOpenActCountdown || data.isShowJoinNum"
    :style="{ color: color, backgroundColor: bgColor }"
  >
    <view class="timer-left" v-if="data.isOpenActCountdown">
      {{ timeText }}
      <text class="timer-left-black">{{ time.d }}</text
      >天 <text class="timer-left-black">{{ time.h }}</text
      >时 <text class="timer-left-black">{{ time.m }}</text
      >分 <text class="timer-left-black">{{ time.s }}</text
      >秒
    </view>
    <view class="timer-right" v-if="data.isShowJoinNum"
      >已有{{ data.number }}人参与</view
    >
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      date: new Date(),
      isOpenActCountdown: true,
      isShowJoinNum: true,
      number: 0,
    }),
  },
  color: {
    // 文字主色
    type: String,
    default: '#ffe554',
  },
  bgColor: {
    // 背景色
    type: String,
    default: 'rgba(0, 0, 0, 0.55)',
  },
  timeText: {
    type: String,
    default: '距离结束',
  },
});

const time = reactive({
  status: 1,
  d: 10,
  h: 23,
  m: 34,
  s: 32,
});
const timer = ref<any>(null);
const getCountDownTime = (startTime: string) => {
  timer.value = setInterval(() => {
    const transedPreTime = startTime.replace(/-/g, '/');
    const nowTime = new Date()
      .getTime();
    const preTime = new Date(transedPreTime)
      .getTime();
    if (preTime - nowTime > 0) {
      const timeNew = (preTime - nowTime) / 1000;
      const day = parseInt(String(timeNew / (60 * 60 * 24)));
      const hou = parseInt(String(timeNew % (60 * 60 * 24) / 3600));
      const min = parseInt(String(timeNew % (60 * 60 * 24) % 3600 / 60));
      const sec = parseInt(String(timeNew % (60 * 60 * 24) % 3600 % 60));
      Object.assign(time, {
        d: day < 10 ? `0${day}` : day,
        h: hou < 10 ? `0${hou}` : hou,
        m: min < 10 ? `0${min}` : min,
        s: sec < 10 ? `0${sec}` : sec,
        status: 1,
      });
    } else {
      Object.assign(time, {
        d: '00',
        h: '00',
        m: '00',
        s: '00',
        status: 2,
      });
      clearInterval(timer.value);
    }
  }, 1000);
};
watch(
  () => props.data,
  (val: any) => {
    if (timer.value) clearInterval(timer.value);
    getCountDownTime(val.date);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.timer {
  background: rgba(0, 0, 0, 0.55);
  color: #ffe554;
  overflow: hidden;
  padding: 15rpx 20rpx;
  font-size: 24rpx;
  &-left {
    display: flex;
    align-items: center;
    float: left;
    &-black {
      min-width: 35rpx;
      height: 35rpx;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 6rpx;
      margin: 0 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-right {
    float: right;
  }
}
</style>
