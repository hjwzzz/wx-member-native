<template>
  <CustomPage bottom>
    <view class="search-bar-bg">
      <uni-search-bar
        class="search-bar"
        v-model="keyward"
        @input="searchChange"
        radius="100"
        placeholder="搜索"
        bgColor="#F5F5F5"
        cancelButton="none"
      />
      <view class="sure-btn" @click="getData">搜索</view>
    </view>
    <view class="content" v-if="list.length">
      <view
        class="content-item"
        v-for="item in list"
        :key="item.uid"
        @click="selectedItem = item"
      >
        <view class="letter">{{ item.name }} </view>
        <view v-if="item?.zsResult === 'Y'" class="tag">专属</view>
        <view class="selected">
          <radio
            style="transform: scale(0.7)"
            :value="item.value"
            :checked="item.uid === selectedItem.uid"
            :color="initBasicsData.mainColor"
          />
        </view>
      </view>
    </view>
    <view class="empty-view" v-else>
      <NoneData icon="shoppers" text="暂无导购信息"></NoneData>
    </view>

    <view class="submit" @click="handleSelectedGuid">
      <view class="btn">确定</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import NoneData from '@/pages/component/NoneData.vue';
import { useBasicsData } from '@/store/basicsData';
import {
  getSalerByDistId,
  getServiceShoppersList,
} from '@/pages/api/appointment-store';
const initBasicsData = useBasicsData();

const props = defineProps<{
  id: string;
  uid: string;
  type: string;
}>();

// 加载列表
const keyward = ref('');
const list = ref<any[]>([]);
const getData = async () => {
  const requestUrl =
    { getServiceShoppersList }[props.type || ''] || getSalerByDistId;
  const { data } = await requestUrl({
    distId: props.id,
    name: keyward.value,
  });
  list.value = data ?? [];
  list.value.map((v: any) => {
    if (v.uid === props.uid) selectedItem.value = v;
  });
};
onLoad(getData);
const searchChange = (e: any) => {
  keyward.value = e;
  getData();
};

// 选中与确定
const selectedItem = ref({ uid: '' });
const handleSelectedGuid = () => {
  uni.$emit('updateGuide', selectedItem.value);
  uni.navigateBack();
};
</script>
<style lang="scss" scoped>
.content {
  width: 690rpx;
  background: #ffffff;
  border-radius: 16rpx;
  margin: 30rpx;

  .content-item {
    height: 98rpx;
    display: flex;
    box-sizing: border-box;
    padding: 30rpx;
    align-items: center;
    border-bottom: solid 1rpx #ebedf0;
    .tag {
      flex: none;
      margin-left: 12rpx;
      margin-right: 5rpx;
      display: inline-block;
      width: 66rpx;
      height: 32rpx;
      line-height: 32rpx;
      text-align: center;
      border-radius: 4rpx;
      font-size: 20rpx;
      color: #ffffff;
      background: var(--main-color);
    }
    .letter {
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #323338;
      line-height: 40rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .content-item:last-child {
    border-bottom: none;
  }
}

.submit {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .btn {
    width: 686rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: var(--main-color);
    border-radius: 200rpx;
    text-align: center;
    margin: 0 auto;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
:deep(.selected) {
  color: var(--main-color);
  flex: 1;
  text-align: right;
}
.search-bar-bg {
  background-color: #fff;
  display: flex;
  align-items: center;
  .search-bar {
    flex: 1;
  }
  :deep(.uni-searchbar__box) {
    height: 60rpx !important;
  }
  .sure-btn {
    color: var(--main-color);
    margin-left: 10rpx;
    width: 80rpx;
    font-size: 28rpx;
  }
}
.empty-view {
  height: calc(100vh - 310rpx - constant(safe-area-inset-bottom));
  height: calc(100vh - 310rpx - env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
