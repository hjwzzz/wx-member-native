<template>
  <view class="content">
    <uni-segmented-control
      :current="current"
      :values="showItems"
      @clickItem="(e:any) => (current = e.currentIndex)"
      styleType="text"
      :activeColor="basicsData.mainColor"
    ></uni-segmented-control>
    <view class="content" v-for="item in list" :key="item.id">
      <goods :item="item" status></goods>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import { onLoad } from '@dcloudio/uni-app';
import { queryFront } from '@/api/my-prize';
import goods from './component/goods.vue';

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
  relatedKind: { name: string };
  status: { name: string };
}

const list = ref<prizeType[]>([]);
const getData = async (curPage = 1) => {
  const params = {
    curPage,
    pageSize: 10,
    // status: items[current.value].key,
    status: ['TEXC'],
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
});
</script>

<style>
page {
  background-color: #f5f5f5;
}
</style>
<style lang="scss" scoped>
:deep(.segmented-control) {
  background-color: white;
}
</style>
