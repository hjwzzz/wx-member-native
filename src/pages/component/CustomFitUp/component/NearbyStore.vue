<template>
  <view
    class="nearby-store"
    :style="{
      ...props.items?.param?.doOut?.style,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <view class="header">
      <view class="left">
        <text
          class="title"
          :style="{
            color: colorText,
            fontSize: props.items?.param?.doOut?.special?.fontSize,
          }"
          >{{ props.title }}</text
        >
        <text class="number"></text>
      </view>
      <view class="right" @click="onMall">
        <text
          class="more"
          :style="{
            color: colorText,
          }"
          >更多</text
        >
        <uni-icons
          type="arrowright"
          size="14"
          :color="colorText || '#B7B8C4'"
        ></uni-icons>
      </view>
    </view>

    <view class="nearby-store-box">
      <view class="nearby-store-image">
        <!-- aspectFit|aspectFill|widthFix -->
        <image
          class="nearby-store-image-show"
          :src="list.url || `${staticUrl}img/store/store-avatar-default.png`"
          mode="aspectFill"
        >
        </image>
      </view>

      <view class="nearby-store-info">
        <view
          class="nearby-store-info-name nowrap"
          :style="{
            color: colorText,
          }"
          >{{ list.storeName }}
        </view>
        <view class="nearby-store-info-text">
          <view
            class="nearby-store-info-text-left"
            :style="{
              color: colorText,
            }"
          >
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-add.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap">
                {{ list.addr || '--' }}
              </text>
            </view>
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-phone.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap"> {{ list.tel || '--' }} </text>
            </view>
            <view class="nearby-store-info-text-left-item nowrap">
              <image
                class="nearby-store-info-img"
                :src="`${staticUrl}img/store-rl1.png`"
                mode="aspectFill"
              >
              </image>
              <text class="nowrap">
                {{ showTime(list) }}
              </text>
            </view>
          </view>
          <view
            class="nearby-store-info-text-right"
            :style="{
              color: colorText,
            }"
            @click="openLocation(list)"
          >
            <view class="nearby-store-info-text-right-box">
              <view class="nearby-store-info-text-right-text">
                <image
                  class="nearby-store-info-store-dh"
                  :src="`${staticUrl}img/store-dh.png`"
                  mode="aspectFill"
                >
                </image>
              </view>
            </view>
            <view class="nearby-store-info-text-right-text">到这去 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
// import Router from '@/utils/router';
// import { useBasicsData } from '@/store/basicsData';
import { staticUrl } from '@/utils/config';
import { getNearStore } from '@/pages/api/nearby-store';
import { mergeFullAddress } from '@/utils/util';

interface Props {
  title?: string;
  items?: any;
}
const props = withDefaults(defineProps<Props>(), {
  title: '附近门店',
  items: () => ({}),
});
// const initBasicsData = useBasicsData();

const colorText = computed(() => props.items?.param?.doOut?.special?.color || '');
const showTime = (list: any) => {
  //     {{ list.businessTimeRange }}{{ showTime(list.timeList) }}
  if (!list.businessTimeRange && !list.timeList) {
    return '--';
  }
  if (Array.isArray(list.timeList)) {
    return list.businessTimeRange + list.timeList.join(',');
  }
  return list.businessTimeRange;
};

const list = ref<any>({});
const local = ref({
  lat: 0,
  lng: 0,
});
const coordCur = computed(() => {
  const { lng, lat } = local.value;
  return [lng, lat].filter(Boolean)
    .join(',');
});

onMounted(() => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  });
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

const updateNearStorePost = async () => {
  const { code, data } = await getNearStore({
    distId: '',
    coordCur: coordCur.value,
    type: 'store',
  });
  if (code === 0) {
    data.forEach((i: any) => {
      // 详细地址
      i.fullAddress = mergeFullAddress(i);
      // 距离
      const { range } = i;
      i.rangeInfo = `${range * 1000}m`;
      if (range >= 1) i.rangeInfo = `${range}km`;
      if (!range) i.rangeInfo = '未知';
    });
    if (data.length) {
      list.value = data[0] || {};
      const address = [
        list.value.province,
        list.value.city,
        list.value.district,
        list.value.address,
      ]
        .filter(Boolean)
        .join('');
      list.value.addr = address;
    }
  }
};

const openLocation = (item: any) => {
  const [lng, lat] = item.coord?.split?.(',') ?? [];
  if (!item.coord) {
    uni.showToast({
      icon: 'none',
      title: '商家还未设置地理位置',
    });
    return;
  }

  uni.openLocation({
    latitude: Number(lat),
    longitude: Number(lng),
    name: item.storeName,
    address: item.fullAddress,
  });
};
// onMounted(() => {
//   getMemberRecommend();
// });

// const mallList: Ref<any> = ref([]);
// const getMemberRecommend = async () => {
//   const { data } = await queryMemberRecommend('');
//   mallList.value = data || [];
// };

// const mallUrl = '/my-assets-pages/point-mall/index';
const onMall = () => {
  // Router
  uni.navigateTo({ url: '/pages/nearby-store/index' });
};
// const onMallDetail = (id: string) => {
//   const url = `${mallUrl}?productId=${id}`;
//   if (!initBasicsData.checkLogin) {
//     return Router.goLogin(url);
//   }
//   uni.navigateTo({ url });
// };
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.nearby-store {
  padding: 30rpx;
  // margin-bottom: 30rpx;
  // background: #fff;
  // border-radius: 16rpx;
  font-size: 28rpx;

  .header {
    display: flex;
    justify-content: space-between;

    .left {
      .title {
        width: 160rpx;
        height: 44rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 44rpx;
        color: #323338;
      }
      .number {
        width: 36rpx;
        height: 40rpx;
        margin-left: 4rpx;
        font-size: 28rpx;
        font-weight: 800;
        line-height: 40rpx;
        color: #ff547b;
      }
    }
    .right {
      .more {
        width: 48rpx;
        height: 34rpx;
        margin-right: 2rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #b7b8c4;
      }
    }
  }

  .nearby-store-box {
    padding-top: 30rpx;
    // background-color: rgba(255, 255, 255, 0.8);
  }

  .nearby-store-image {
    // width: 325px;
    height: 248rpx;
    border-radius: 16rpx;
    overflow: hidden;
    .nearby-store-image-show {
      height: 248rpx;
      width: 100%;
    }
  }
  .nearby-store-info {
    margin-top: 24rpx;
    .nearby-store-info-name {
      line-height: 60rpx;
      font-weight: 700;
      color: #323338;
    }
    .nearby-store-info-text {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .nearby-store-info-text-left {
      // background-color: red;
      flex-grow: 1;
      font-size: 24rpx;
      color: #646771;
      .nearby-store-info-text-left-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 50rpx;
        flex-grow: 1;

        .nowrap {
          width: 450rpx;
          // background-color: red;
        }

        .nearby-store-info-img {
          height: 32rpx;
          width: 32rpx;
          margin-right: 10rpx;
        }
      }
    }
    .nearby-store-info-text-right {
      width: 110rpx;
      flex-shrink: 0;
      font-size: 20rpx;
      color: #646771;
      border-left: 1rpx solid #e6e5e3;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .nearby-store-info-store-dh {
        height: 64rpx;
        width: 64rpx;
      }
      .nearby-store-info-text-right-box {
        // padding-left: 24rpx;
        display: flex;
        justify-content: center;
      }
      .nearby-store-info-text-right-text {
        display: flex;
        justify-content: center;
        padding-left: 24rpx;
      }
    }
  }
}
</style>
