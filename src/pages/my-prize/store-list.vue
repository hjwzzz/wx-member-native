<template>
  <CustomPage bottom>
    <view class="storesList">
      <view class="search-bar-bg">
        <uni-search-bar
          class="search-bar"
          v-model="keyward"
          :focus="true"
          @input="searchChange"
          radius="100"
          placeholder="搜一搜门店"
          bgColor="#F5F5F5"
          cancelButton="none"
        />
        <view
          class="sure-btn"
          @click="updateNearStorePost"
          :style="`color:${initBasicsData.mainColor};`"
          >搜索</view
        >
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
              <view class="right">
                <text
                  v-if="item.range"
                  :style="{ color: initBasicsData.mainColor }"
                >
                  <text v-if="item.range >= 1">{{ item.range }}km</text>
                  <text v-else>{{ item.range * 1000 }}m</text>
                </text>
              </view>
            </view>
            <view class="item-three">
              <view class="left">
                <image
                  :src="`${staticUrl}/prize/store/address.png`"
                  mode=""
                ></image>
                <text style="font-size: 24rpx" class="address">
                  {{
                    item.province + item.city + item.district + item.address ||
                    '--'
                  }}
                </text>
              </view>
              <view class="right">
                <view
                  :class="['radio_box', { radio_box_none: isActive(item) }]"
                  :style="{
                    backgroundColor:
                      (isActive(item) && initBasicsData.mainColor) || '',
                  }"
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
              <image
                :src="`${staticUrl}/prize/store/phone.png`"
                mode=""
              ></image>
              <text style="font-size: 24rpx" class="address">
                {{ item.tel || '--' }}
              </text>
            </view>
          </view>
        </view>
        <view class="button">
          <button
            class="btn"
            :style="{ backgroundColor: initBasicsData.mainColor }"
            @click="confimStore"
          >
            确认
          </button>
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
import { updateNearStore } from '@/api/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { staticUrl } from '@/utils/config';
import { useBasicsData } from '@/store/basicsData';
const initBasicsData = useBasicsData();

const props = defineProps<{
  id: string;
  name: string;
  relatedId: string;
}>();

const local = ref({
  lat: 0,
  lng: 0,
});
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
}
const list = ref<storeType[]>([]);
const selected = ref<storeType>();
const isActive = (i: storeType) => i.distId === selected.value?.distId;

// 搜索
const keyward = ref('');
const searchChange = (e: any) => {
  keyward.value = e;
  updateNearStorePost();
};

// 刷新列表
const updateNearStorePost = async () => {
  function logValut({ lng, lat }: any) {
    return [lng, lat].filter(Boolean)
      .join(',');
  }
  const { code, data } = await updateNearStore({
    distId: '',
    storeName: keyward.value,
    coordCur: logValut(local.value),
    relatedId: props.relatedId,
  });
  if (code === 0) list.value = data;
};

onLoad(() => {
  uni.getLocation({
    type: 'wgs84',
    success: ({ latitude: lat, longitude: lng }) => {
      local.value = { lat, lng };
      uni.setStorageSync('location', local.value);
      updateNearStorePost();
    },
    fail: data => {
      local.value = uni.getStorageSync('location');
      console.warn('fail', data);
      updateNearStorePost();
      uni.showModal({
        title: '提示',
        content:
          '微信不能确定你的位置，你可以通过以下操作提高微信的定位精确度: 在位置设置中打开GPS和无线网络',
      });
    },
  });
});

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
  border: none;
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

        .right {
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff6a8c;
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
  height: calc(100vh - 300rpx);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
