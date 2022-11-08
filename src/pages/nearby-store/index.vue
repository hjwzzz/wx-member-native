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
          placeholder="搜索"
          bgColor="#F5F5F5"
          cancelButton="none"
        />
        <view class="sure-btn" @click="updateNearStorePost">搜索</view>
      </view>

      <view v-if="list.length > 0" class="themap">
        <view v-for="(item, index) in list" :key="index" class="t1">
          <view class="t1-box" @click="goDetail(item)">
            <image
              class="image left"
              :src="
                item.url || `${staticUrl}img/store/store-avatar-default.png`
              "
              mode="aspectFit"
            />
            <view class="right">
              <view class="t2">
                <view class="t2-box">
                  <view
                    class="flagship"
                    :style="{
                      maxWidth:
                        item.gsResult.code === 'Y'
                          ? 'calc(100% - 100rpx)'
                          : 'calc(100% - 28rpx)',
                    }"
                  >
                    {{ item.storeName || '--' }}
                  </view>
                  <view v-if="item.gsResult.code === 'Y'" class="attribution">
                    <text style="font-size: 20rpx">
                      {{ item.gsResult.name }}
                    </text>
                  </view>
                </view>
                <uni-icons
                  class="icon"
                  type="arrowright"
                  size="14"
                  color="#B7B8C4"
                />
              </view>
              <view class="t3">
                <text style="font-size: 24rpx" class="address">
                  {{ item.fullAddress || '--' }}
                </text>
              </view>
              <view class="distance">
                <image
                  :src="`${staticUrl}img/store/address.png`"
                  mode="aspectFit"
                />
                <text>
                  {{ item.rangeInfo }}
                </text>
              </view>
            </view>
          </view>
          <view class="t5">
            <view class="item1" @click="thephone(item)"> 电话 </view>
            <view
              class="item"
              style="color: #ff547b"
              bindtap="phoneLogin"
              @click="openLocation(item)"
            >
              <text> 地图 </text>
            </view>
          </view>
        </view>
      </view>
      <view class="empty-view" v-else>
        <NoneData icon="shop" text="暂未门店信息"></NoneData>
      </view>
    </view>
    <Tabbar code="nearby_store"> </Tabbar>
  </CustomPage>
</template>

<script setup lang="ts">
import Tabbar from '@/components/Tabbar/index.vue';
import NoneData from '@/pages/component/NoneData.vue';
import { computed, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { staticUrl } from '@/utils/config';
import { getNearStore } from '@/pages/api/store';
import { mergeFullAddress } from '@/utils/util';

// 店铺信息
interface storeType {
  url: string;
  opsId: string;
  storeName: string;
  range: number;
  rangeInfo: string;
  province: string;
  city: string;
  district: string;
  address: string;
  distId: string;
  tel: string;
  coord: string;
  fullAddress: string;
  gsResult: {
    code: string;
    name: string;
  };
}
const list = ref<storeType[]>([]);

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

const coordCur = computed(() => {
  const { lng, lat } = local.value;
  return [lng, lat].filter(Boolean)
    .join(',');
});
// 刷新列表
const updateNearStorePost = async () => {
  const { code, data } = await getNearStore({
    distId: '',
    storeName: keyward.value,
    coordCur: coordCur.value,
  });
  if (code === 0) {
    data.forEach((i: storeType) => {
      // 详细地址
      i.fullAddress = mergeFullAddress(i);
      // 距离
      const { range } = i;
      i.rangeInfo = `${range * 1000}m`;
      if (range >= 1) i.rangeInfo = `${range}km`;
      if (!range) i.rangeInfo = '未知';
    });

    list.value = data;
  }
};
// 搜索
const keyward = ref('');
const searchChange = (e: any) => {
  keyward.value = e;
  updateNearStorePost();
};

const thephone = (item: any) => uni.makePhoneCall({ phoneNumber: item.tel });
const openLocation = (item: storeType) => {
  const [lng, lat] = item.coord?.split?.(',') ?? [];
  uni.openLocation({
    latitude: Number(lat),
    longitude: Number(lng),
    name: item.storeName,
    address: item.fullAddress,
  });
};
const goDetail = (e: storeType) => {
  uni.navigateTo({ url: `detail?distId=${e.distId}&opsId=${e.opsId}&coordCur=${coordCur.value}` });
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
  .themap {
    min-height: calc(100vh - 330rpx - constant(safe-area-inset-bottom));
    min-height: calc(100vh - 330rpx - env(safe-area-inset-bottom));
    padding-left: 30rpx;
    padding-right: 30rpx;
    padding-top: 30rpx;
    background-color: #f5f5f5;

    .t1 {
      overflow: hidden;
      background-color: #ffffff;
      border-radius: 16rpx;
      margin-bottom: 30rpx;
      &-box {
        padding: 30rpx;
        display: flex;
        .left {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8px;
          margin-right: 20rpx;
        }
        .right {
          flex: 1;
          max-width: calc(100% - 180rpx);
          .t2 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 50rpx;
            line-height: 28rpx;
            &-box {
              width: calc(100% - 20rpx);
              display: flex;
            }
            .flagship {
              font-size: 28rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #323338;
              max-width: calc(100% - 100rpx);
            }
            .attribution {
              margin-left: 8rpx;
              padding: 2rpx 6rpx 2rpx 6rpx;
              background: #ff547b;
              border-radius: 4rpx;
              color: #ffffff;
              font-size: 20rpx;
              white-space: nowrap;
            }
            .icon {
              display: flex;
              align-items: center;
            }
          }
          .t3 {
            font-size: 24rpx;
            display: flex;
            align-items: center;
            margin: 12rpx 0;

            .address {
              color: #bbbcc3;
              font-size: 24rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              word-break: break-all;
            }
          }
          .distance {
            font-size: 24rpx;
            color: #9697a2;
            display: flex;
            align-items: center;
            image {
              width: 22rpx;
              height: 28rpx;
              margin-right: 10rpx;
              flex-shrink: 0;
            }
          }
        }
      }
    }

    .t5 {
      /*margin-top: 20rpx;*/
      border-top: 1px solid #f0f1f4;
      height: 88rpx;
      line-height: 88rpx;
      display: flex;
      text-align: center;

      .item1 {
        border-right: 1px solid #f0f1f4;
      }

      .item {
        color: var(--main-color);
      }

      .item,
      .item1 {
        width: 50%;
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
