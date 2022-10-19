<template>
  <view>
    <view v-if="list.length > 0">
      <view class="item item-page">
        <view
          class="list-item"
          v-for="(item, index) in list"
          :key="index"
          @click="onChecked(item)"
        >
          <view class="top">
            <view
              class="left"
              style="
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              "
            >
              {{ item.storeName }}
            </view>
            <view class="right">
              <text v-if="item.range">
                <text
                  :style="{ color: mainColor }"
                  v-if="item.range * 1000 >= 1000"
                  >{{ item.range }}km</text
                >
                <text :style="{ color: mainColor }" v-else
                  >{{ item.range * 1000 }}m</text
                >
              </text>
            </view>
          </view>
          <view class="item-three">
            <view class="left">
              <image src="@/static/prize/store/address.png" mode=""></image>
              <text style="font-size: 24rpx" class="address">
                {{
                  item.province + item.city + item.district + item.address ||
                  '--'
                }}
              </text>
            </view>
            <view class="right">
              <view
                :class="[
                  'radio_box',
                  item.distId === idword ? 'radio_box_none' : '',
                ]"
                :style="{
                  backgroundColor: item.distId === idword ? mainColor : '',
                }"
              >
                <!--  top="-4" -->
                <u-icon
                  style="font-size: 24rpx"
                  color="#ffffff"
                  v-if="item.distId === idword"
                  name="checkbox-mark"
                ></u-icon>
              </view>
            </view>
          </view>
          <view class="item-four">
            <image src="/static/phone.png" mode=""></image>
            <text style="font-size: 24rpx" class="address">
              {{ item.tel || '--' }}
            </text>
          </view>
        </view>
      </view>
      <view class="footer">
        <text>技术支持：金千枝数智云</text>
      </view>
      <view class="button">
        <button
          type="error"
          :style="{ backgroundColor: mainColor }"
          @click="toprize"
        >
          确认
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { updateNearStore } from '@/api/my-prize';
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

const idword = '';
const mainColor = '';

const props = defineProps<{
  id: string;
  name: string;
  relatedId: string;
}>();
const local = reactive({
  lat: 0,
  lng: 0,
});
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

function onChecked(item) {
  console.log(item);

  // this.storeName = item.storeName;
  // this.idword = item.distId;
  // this.selected = item;
  // store.setStore('guid', {});
  // // 导购选中的值
  // this.nameLIst = {};
}

const updateNearStorePost = async () => {
  // 判断是否有坐标 显示距离
  // this.locationObj = uni.getStorageSync('locationObj');
  // 判断是否有坐标 显示距离

  function logValut() {
    const { lng, lat } = local;
    return [lng, lat].filter(Boolean)
      .join(',');
  }
  const body = {
    distId: '',
    storeName: '',
    coordCur: logValut(),
    relatedId: props.relatedId,
  };
  const { code, data } = await updateNearStore(body);
  if (code === 0) list.value = data;
};
const location = () => {
  uni.getLocation({
    type: 'wgs84',
    success: res => {
      local.lat = res.latitude;
      local.lng = res.longitude;
      uni.setStorageSync('location', res);
      updateNearStorePost();
    },
    fail: data => {
      console.log('fail', data);
      updateNearStorePost();
      uni.showModal({
        title: '提示',
        content:
          '微信不能确定你的位置，你可以通过以下操作提高微信的定位精确度: 在位置设置中打开GPS和无线网络',
      });
    },
  });
};
onLoad(() => {
  location();
});
</script>

<style scoped lang="scss">
.item-page {
  min-height: calc(100vh - 220rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 220rpx - env(safe-area-inset-bottom));
}
.footer {
  // margin-bottom: 185rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #d8d9e0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 40rpx;
}
.radio_box {
  border: 1px solid #cccccc;
  width: 38rpx;
  height: 38rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  // height: 100rpx;
  background-color: #ffffff;

  padding-left: 30rpx;
  padding-right: 30rpx;
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  button {
    background-color: #ff547b;
    border-radius: 40rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
    color: #ffffff;
  }
}

.foolt {
  margin-bottom: 60rpx;
}

.storesList {
  background-color: #f5f5f5;
  /* height: 91vh; */
  // min-height: calc(100vh - 200rpx - constant(safe-area-inset-bottom));
  // min-height: calc(100vh - 200rpx - env(safe-area-inset-bottom));

  :deep(.u-action) {
    color: #ff6f90;
  }

  .serch {
    position: fixed;
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    z-index: 999;
    height: 100rpx;
    line-height: 100rpx;
    margin-bottom: 200rpx;
    :deep(.uicon-search) {
      color: #b7b8c4 !important;
    }
  }

  .item {
    padding: 100rpx 30rpx 0rpx 30rpx;
    padding-bottom: 100px;

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

  .stop {
    height: 100vh;
    background-color: #f2f2f2;
    text-align: center;
    .stop-img {
      min-height: calc(100vh - 100rpx - constant(safe-area-inset-bottom));
      min-height: calc(100vh - 100rpx - env(safe-area-inset-bottom));

      display: flex;
      justify-content: center;
      align-items: center;
    }
    image {
      width: 320rpx;
      height: 320rpx;
    }

    .stopText {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #9697a2;
    }
  }
}
</style>
