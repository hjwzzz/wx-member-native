<template>
  <CustomPage>
    <view class="top">
      <uni-segmented-control
        :current="current"
        :values="showItems"
        @clickItem="changeTab"
        styleType="text"
        :activeColor="basicsData.mainColor"
      ></uni-segmented-control>
      <view class="content" v-for="item in list" :key="item.id">
        <goods :item="item" status>
          <view class="bottom">
            <!-- 待兑换，显示兑换日期 -->
            <view class="b-texc">
              {{ dateLableString(item) }}
            </view>
            <!-- 确认领取按钮 -->
            <view
              v-if="
                (item.status.name == '待领取' ||
                  item.status.name == '已发货') &&
                ['1', '2'].includes(item.recvManner.code) &&
                item.param.allowGet === 'Y'
              "
              class="b1 button"
              :style="{ backgroundColor: basicsData.mainColor }"
              @click="determine(item)"
            >
              确认领取
            </view>
            <!-- 详情按钮 -->
            <view
              :class="[{ disabledBg: current === 1 && item.tommorry }, 'b2']"
              :style="`color:${basicsData.mainColor}`"
              @click="showDetail(item)"
            >
              {{ current === 0 ? '兑换' : '查看' }}
            </view>
          </view>
        </goods>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import { queryFront } from '@/api/my-prize';
import goods from './component/Goods.vue';

const basicsData = useBasicsData();
const items = reactive([
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
]);
const showItems = items.map(i => i.name);
const current = ref(0);
const page = ref(0);
interface prizeType {
  id: string;
  url: string;
  prizeName: string;
  quantity: string;
  cutValidTime: string;
  cutExpireTime: string;
  tommorry: boolean;
  relatedKind: { name: string };
  recvManner: { code: string };
  param: { allowGet: string };
  status: { name: string; code: string };
}

const list = ref<prizeType[]>([]);
const getData = async (curPage = 1) => {
  const params = {
    curPage,
    pageSize: 10,
    status: items[current.value].key,
    // status: ['TEXC'],
  };
  const {
    code,
    data: { records },
  } = await queryFront(params);
  if (code !== 0) return;
  page.value = curPage;
  if (curPage > 1) {
    list.value.push(...records);
    return;
  }
  list.value = records;
};
onLoad(() => {
  getData();
  // 奖品详情修改后，切换tab栏
  uni.$on('changeTab', changeTab);
});
onUnload(() => {
  uni.$off('changeTab');
});
// 截至日期显示内容
const dateLableString = (item: prizeType) => {
  const {
    cutValidTime,
    cutExpireTime,
    tommorry,
    recvManner,
    status: { code },
  } = item;
  if (code === 'TEXC') {
    if (!tommorry) return '尚未开放兑换日期';
    return `兑换有效期：${cutValidTime}至${cutExpireTime}`;
  }
  if (current.value === 1 && recvManner.code !== '2') {
    return `领取有效期至：${cutExpireTime}`;
  }
  return '';
};
const determine = (item: prizeType) => {
  console.log(item);
  console.log('确认领取');
};
const showDetail = (item: prizeType) => {
  uni.navigateTo({ url: `/pages/my-prize/prize-detail?name=${item.status.name}&id=${item.id}` });
};
const changeTab = (e: any) => {
  current.value = e?.currentIndex ?? e;
  list.value = [];
  getData();
};
</script>

<style lang="scss" scoped>
:deep(.segmented-control) {
  background-color: white;
}

.content {
  padding: 0 30rpx;
}
.bottom {
  margin-top: 25rpx;
  margin-bottom: 15rpx;
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

  .b2 {
    padding: 12rpx 24rpx;
    background: #ffffff;
    border-radius: 16px;
    border: 1px solid #ebedf0;
    font-size: 28rpx;
  }
}
</style>
