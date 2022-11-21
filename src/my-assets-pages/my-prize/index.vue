<template>
  <CustomPage>
    <view class="top">
      <Tabs
        :tabList="items"
        v-model:current="current"
        @change="changeTab"
        fixed
      />
      <view class="content" v-for="item in list" :key="item.id">
        <goods :item="item" status>
          <view class="bottom">
            <!-- 待兑换，显示兑换日期 -->
            <view class="b-texc">
              {{ dateLableString(item) }}
            </view>
            <!-- 确认领取按钮 -->
            <view
              v-if="showSureButton(item)"
              class="b1 button"
              :style="{ backgroundColor: basicsData.mainColor }"
              @click="determine(item)"
            >
              确认领取
            </view>
            <!-- 详情按钮 -->
            <view
              :class="[{ disabledBg: current === 0 && item.tommorry }, 'b2']"
              :style="`color:${basicsData.mainColor}`"
              @click="current === 0 && item.tommorry ? '' : showDetail(item)"
            >
              {{ current === 0 ? '兑换' : '查看' }}
            </view>
          </view>
        </goods>
      </view>
      <view class="bottom-empty" v-if="list.length === 0">
        <NoneData text="暂无奖品信息" icon="prize"> </NoneData>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import {
  onLoad,
  onPullDownRefresh,
  onReachBottom,
  onUnload,
} from '@dcloudio/uni-app';
import {
  getPrizeList,
  updateReceiveSend,
  updateToStore,
} from '../api/my-prize';
import type { IPrizeItem } from '@/my-assets-pages/api/types/my-prize';
import goods from './component/Goods.vue';
import NoneData from '@/pages/component/NoneData.vue';
import Tabs from '@/components/Tabs/index.vue';

const basicsData = useBasicsData();
const items = [
  {
    key: ['TEXC'],
    name: '待兑换',
  },
  {
    key: ['CONFIRMERD', 'DELIVERED', 'UNCLAIMED', 'SHIPPED', 'CHOICE'],
    name: '待领取',
  },
  {
    key: ['FINISHED'],
    name: '已领取',
  },
  {
    key: ['CLOSED'],
    name: '已失效',
  },
];
const current = ref(0);
const page = ref(0);

const list = ref<IPrizeItem[]>([]);

const getData = async (curPage = 1) => {
  const { key: status } = items[current.value];
  const params = {
    curPage,
    pageSize: 10,
    status,
  };
  const {
    code,
    data: { records, curPage: _curPage },
  } = await getPrizeList(params);
  if (code !== 0 || _curPage - page.value > 1) return;
  // 待领取列表，判断是否可领取tommorry
  if (status.includes('TEXC')) {
    const isAfterToday = (date: string) => {
      const getTime = (i?: string) => (i ? new Date(i) : new Date()).getTime();
      return getTime(date.replace(/-/g, '/')) > getTime();
    };
    records.forEach((i: IPrizeItem) => i.tommorry = isAfterToday(i.validTime));
  }

  page.value = curPage;
  if (curPage > 1) {
    list.value.push(...records);
    return;
  }
  list.value = records;
};
onLoad((e: any) => {
  changeTab(e?.tab ?? 0);
  // 奖品详情修改后，切换tab栏
  uni.$on('changeTab', changeTab);
});
onUnload(() => uni.$off('changeTab'));
onPullDownRefresh(() => {
  getData();
  uni.stopPullDownRefresh();
});
onReachBottom(() => getData(page.value + 1));

const showSureButton = (item: IPrizeItem) => {
  const {
    statusName, // 奖品状态
    recvManner, // 领取方式 邮寄、到店
    param,
  } = item;
  if (recvManner === '2') {
    return ['待领取', '已发货'].includes(statusName);
  }
  return (
    ['待领取', '已发货'].includes(statusName) &&
    ['1', '2'].includes(recvManner) &&
    JSON.parse(param || '{}')?.allowGet === 'Y'
  );
};
// 截至日期显示内容
const dateLableString = (item: IPrizeItem) => {
  const { cutValidTime, cutExpireTime, tommorry, recvManner, status } = item;
  if (status === 'TEXC') {
    if (tommorry) return '尚未开放兑换日期';
    return `兑换有效期：${cutValidTime}至${cutExpireTime}`;
  }
  if (current.value === 1 && recvManner !== '2') {
    return `领取有效期至：${cutExpireTime}`;
  }
  return '';
};
const determine = async (item: IPrizeItem) => {
  const { cancel }: any = await uni.showModal({
    content: '确认已领取该奖品',
    confirmColor: basicsData.mainColor,
  });
  if (cancel) return;
  const { recvManner, id } = item;
  const updateRequest = recvManner === '1' ? updateToStore : updateReceiveSend; // 1到店 2邮寄
  const { code } = await updateRequest({
    id,
    remark: '',
    status: 'FINISHED',
  });
  uni.showToast({
    title: code === 0 ? '领取成功' : '奖品已被领取',
    icon: 'success',
  });
  changeTab(2);
};
const showDetail = (item: IPrizeItem) => {
  uni.navigateTo({ url: `prize-detail?id=${item.id}` });
};
const changeTab = (e: any) => {
  current.value = Number(e?.index ?? e);
  list.value = [];
  getData();
};
</script>

<style lang="scss" scoped>
.content {
  padding: 0 30rpx;
}
.bottom {
  margin-top: 20rpx;
  // margin-bottom: 15rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  //  兑换有效期
  .b-texc {
    font-size: 24rpx;
    line-height: 28rpx;
    color: #b7b8c4;
    flex: 1;
  }

  .disabledBg {
    background: #f7f8fa !important;
    color: #d8d9e0 !important;
  }
  .b1 {
    margin-right: 15rpx;
    background: var(--main-color);
    border-radius: 16px;
    border: 1px solid #ebedf0;
    color: white;
    border: 1rpx var(--main-color) solid;
    font-size: 24rpx;
    padding: 12rpx 24rpx;
  }
  .b2 {
    padding: 12rpx 24rpx;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #ebedf0;
    font-size: 28rpx;
  }
}
.bottom-empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65vh;
}
</style>
