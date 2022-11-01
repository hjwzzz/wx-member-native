<template>
  <CustomPage>
    <view class="integral">
      <view
        class="integral-item"
        v-for="(item, index) in dataList"
        @click="userintegral(item)"
        :key="index"
      >
        <image class="integral-item-image" :src="item.imgUrl" mode=""></image>
        <view class="integral-item-info">
          <view class="integral-item-name"> 我的{{ item.name }} </view>
          <view class="integral-item-price">
            {{ item.value }}
          </view>
        </view>
      </view>
      <view class="none-data" v-if="!dataList.length">
        <NoneData icon="noIntegral" text="暂无积分记录" />
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { queryPointList } from '@/api/center';
import { onLoad } from '@dcloudio/uni-app';
import { onMounted, ref, Ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import NoneData from '@/pages/component/NoneData.vue';
const initBasicsData = useBasicsData();
const dataList: Ref<any> = ref([]);
const selectId = ref('');

onLoad((options: any) => {
  const { selectId: id = '' } = options;
  selectId.value = id;
});

onMounted(() => {
  queryPointListFun();
});

const userintegral = (item: any, type = '') => {
  const data = JSON.stringify(item);
  const url = `/my-assets-pages/integral/use-ril-record?item=${data}`;
  if (type === 'redirectTo') {
    uni.redirectTo({ url });
    return;
  }
  uni.navigateTo({ url });
};

const queryPointListFun = async () => {
  const res = await queryPointList(initBasicsData.useMid);
  dataList.value = res?.data || [];
  if (selectId.value) {
    dataList.value.map((v: any) => {
      // console.log('id', v.acctId, this.selectId);
      if (v.acctId === selectId.value) userintegral(v, 'redirectTo');
    });
  }
};
</script>

<style lang="scss" scoped>
.integral {
  padding-top: 30rpx;
  padding-left: 30rpx;
  background-color: #f5f5f5;
  .integral-item {
    width: calc(100vw - 118rpx);
    height: 170rpx;
    background-color: white;
    border-radius: 16rpx;
    padding: 30rpx 30rpx 20rpx;
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    .integral-item-image {
      width: 88rpx;
      height: 88rpx;
    }
    .integral-item-info {
      margin-left: 30rpx;
    }
    .integral-item-name {
      margin-top: -12rpx;
      font-size: 28rpx;
      color: #9697a2;
      width: calc(100vw - 250rpx);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .integral-item-price {
      margin-top: 6rpx;
      font-size: 48rpx;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: var(--main-color);
    }
  }

  .none-data {
    margin-top: 20vh;
  }
}
</style>
