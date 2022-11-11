<template>
  <CustomPage bottom>
    <view class="storesList">
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
        <view class="sure-btn" @click="updateNearStorePost">搜索</view>
      </view>

      <view v-if="list.length > 0">
        <view class="item item-page">
          <view
            class="list-item"
            v-for="(item, index) in list"
            :key="index"
            @click="selected = item"
          >
            <view class="top">
              <view class="left toE">
                {{ item.storeName }}
              </view>
              <view
                class="left-info"
                v-if="props.belong && item.gsResult.code == 'Y'"
                >归属</view
              >
              <view class="right">
                <text v-if="item.range">
                  <text v-if="item.range >= 1">{{ item.range }}km</text>
                  <text v-else>{{ item.range * 1000 }}m</text>
                </text>
              </view>
            </view>
            <view class="item-three">
              <view class="left">
                <image
                  :src="`${staticUrl}prize/store/address.png`"
                  mode=""
                ></image>
                <text style="font-size: 24rpx" class="address">
                  {{ mergeFullAddress(item) || '--' }}
                </text>
              </view>
              <view class="right">
                <view
                  :class="['radio_box', { radio_box_none: isActive(item) }]"
                >
                  <uni-icons
                    type="checkmarkempty"
                    color="#ffffff"
                    v-if="isActive(item)"
                    size="12"
                  ></uni-icons>
                </view>
              </view>
            </view>
            <view class="item-four">
              <image :src="`${staticUrl}prize/store/phone.png`" mode=""></image>
              <text style="font-size: 24rpx" class="address">
                {{ item.tel || '--' }}
              </text>
            </view>
          </view>
        </view>
        <view class="button">
          <button class="btn" @click="confimStore">确认</button>
        </view>
      </view>
      <view class="empty-view" v-else>
        <NoneData icon="shop" text="暂未门店信息"></NoneData>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import NoneData from '@/pages/component/NoneData.vue';
import { getServiceStore } from '@/pages/api/appointment-store';
import { getNearStore } from '@/pages/api/nearby-store';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { staticUrl } from '@/utils/config';
import { mergeFullAddress } from '@/utils/util';

const props = defineProps({
  id: { type: String },
  belong: { type: Boolean }, // 修改归属门店
  relatedId: { type: String },
  type: { type: String, defaulet: 'getNearStore' }, // 接口类型
});
if (props.belong) {
  uni.setNavigationBarTitle({ title: '归属门店' });
}
// 店铺信息
interface storeType {
  storeName: string;
  range: number;
  province: string;
  city: string;
  district: string;
  address: string;
  distId: string;
  tel: string;
  gsResult: {
    code: string;
  };
}
const list = ref<storeType[]>([]);
const selected = ref<storeType>();
const isActive = (i: storeType) => i.distId === selected.value?.distId;

onLoad(() => {
  uni.getLocation({
    type: 'wgs84',
    success: ({ latitude: lat, longitude: lng }) => {
      local.value = { lat, lng };
      uni.setStorageSync('location', local.value);
      updateNearStorePost();
    },
    fail: () => {
      local.value = uni.getStorageSync('location');

      updateNearStorePost();
      uni.showModal({
        title: '提示',
        content:
          '微信不能确定你的位置，你可以通过以下操作提高微信的定位精确度: 在位置设置中打开GPS和无线网络',
      });
    },
  });
});

const local = ref({
  lat: 0,
  lng: 0,
});

// 刷新列表
const updateNearStorePost = async () => {
  const requestUrl = { getServiceStore }[props.type || ''] || getNearStore;
  const geo = ({ lng, lat }: any) => [lng, lat].filter(Boolean)
    .join(',');
  const { code, data } = await requestUrl({
    id: props.id || '',
    distId: '',
    storeName: keyward.value,
    coordCur: geo(local.value) || '',
    relatedId: props.relatedId,
  });
  if (code === 0) {
    list.value = data;
    if (!selected.value?.distId && props.id) {
      selected.value = data.find((i: storeType) => i.distId === props.id) ?? {};
    }
  }
};
// 搜索
const keyward = ref('');
const searchChange = (e: any) => {
  keyward.value = e;
  updateNearStorePost();
};

const confimStore = () => {
  if (!selected.value) {
    uni.showToast({ title: '请选择门店!', icon: 'none' });
    return;
  }
  uni.$emit('chooseStore', selected.value);
  uni.navigateBack();
};
</script>

<style scoped lang="scss">
.toE {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.search-bar-bg {
  background-color: #fff;
  display: flex;
  align-items: center;
  .search-bar {
    flex: 1;
  }
  .sure-btn {
    color: var(--main-color);
    margin-left: 10rpx;
    width: 80rpx;
    font-size: 28rpx;
  }
}
.radio_box {
  border: 1px solid #cccccc;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  &.active {
    background-color: #ff547b;
  }
}
.radio_box_none {
  background-color: var(--main-color);
  border: 1px solid var(--main-color);
}
.button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  // height: 100rpx;
  background-color: #ffffff;

  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  .btn {
    background-color: var(--main-color);
    border-radius: 40rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #ffffff;
  }
}

.storesList {
  background-color: #f5f5f5;
  :deep(.u-action) {
    color: #ff6f90;
  }
  .item {
    padding: 0 30rpx;

    .list-item {
      padding: 30rpx;
      /* height: 192rpx; */
      background-color: #ffffff;
      border-radius: 16rpx;
      margin-top: 30rpx;

      .top {
        display: flex;
        justify-content: space-between;
        .left-info {
          margin-left: 10rpx;
          flex-shrink: 0;
          height: 40rpx;
          width: 60rpx;
          background-color: var(--main-color);
          border-radius: 4rpx;
          font-size: 24rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
        }
        .right {
          flex: 1;
          text-align: right;
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: var(--main-color);
          background-color: #ffffff;
          margin-left: 10rpx;
        }
      }

      .item-three {
        display: flex;
        justify-content: space-between;
        margin-top: 12rpx;

        image {
          width: 16rpx;
          height: 18rpx;
          margin-right: 16rpx;
        }

        .address {
          font-size: 20rpx;
          color: #bbbcc3;
        }
      }

      .item-four {
        margin-top: 12rpx;

        image {
          width: 16rpx;
          height: 18rpx;
          margin-right: 16rpx;
        }

        .address {
          font-size: 20rpx;
          color: #bbbcc3;
        }
      }
    }
  }
}
.empty-view {
  // height: calc(100vh - 300rpx);

  height: calc(100vh - 300rpx - constant(safe-area-inset-bottom));
  height: calc(100vh - 300rpx - env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
