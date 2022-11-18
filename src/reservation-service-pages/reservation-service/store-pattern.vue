<template>
  <CustomPage>
    <view class="storePattern">
      <view class="search-bar">
        <uni-search-bar
          v-model="searchValue"
          cancelButton="none"
          placeholder="搜一搜门店"
          radius="20"
          class="searchBar"
          @input="handleInput"
        >
        </uni-search-bar>
        <text class="search-text" @click="handleSearch">搜索</text>
      </view>

      <view class="page-section page-section-gap">
        <map
          style="width: 100%; height: 100%"
          :latitude="latitude"
          :longitude="longitude"
          :markers="markers"
          show-location
          @markertap="markertap"
        ></map>
        <view class="store" v-if="storeObj && Object.keys(storeObj).length">
          <view class="store-main">
            <view class="title">
              <!--						{{ storeObj.title }}-->
              <view class="storeName">{{ storeObj.label.content }}</view>
              <view class="text">{{
                storeObj.id === 0 ? '距离我最近' : `${storeObj.range}km`
              }}</view>
            </view>
            <view class="addr">
              <image
                class="img"
                type="image"
                mode="aspectFill"
                :src="staticUrl + 'img/address.png'"
              ></image>
              {{ address(storeObj) }}
            </view>
            <view class="phone">
              <image
                class="img"
                type="image"
                mode="aspectFill"
                :src="staticUrl + 'img/phone.png'"
              ></image>
              {{ storeObj.tel || '--' }}
            </view>
          </view>
          <view class="btn" @click="seeServe">查看服务</view>
        </view>
      </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, Ref } from 'vue';
import { debounce } from '@/utils/util';
// import { queryNearStore } from '@/api/reservation-service';
import { queryNearStoreFront } from '../api/api';
import { staticUrl } from '@/utils/config';
const searchValue = ref('');
const longitude: Ref<number> = ref(-99);
const latitude: Ref<number> = ref(90);
const markers: Ref<any> = ref([{}]);
const storeObj: Ref<any> = ref({});

onLoad(() => {
  uni.getLocation({
    type: 'wgs84',
    success: res => {
      longitude.value = Number(res.longitude);
      latitude.value = Number(res.latitude);
      queryStoreList();
    },
    fail: () => {
      console.log('拒绝定位13', 222);
      // againGetLocation((bool) => {
      //   if (bool) {
      //     this.longitude = res.longitude;
      //     this.latitude = res.latitude;
      //   } else {
      //   }
      // });
      // latitude.value = '39.909';
      // longitude.value = '116.39742';
    },
  });
});

const handleInput = debounce(() => {
  handleSearch();
});

const address = (obj: any) => {
  const province = obj.province || '';
  const city = obj.city || '';
  const district = obj.district || '';
  const str = province + city + district;
  return str + (obj.address || '') || '--';
};

const handleSearch = () => {
  queryStoreList();
};

const markertap = (e: any) => {
  const obj = markers.value.find((item: any) => item.id === e.detail.markerId);
  storeObj.value = Object.assign({}, storeObj.value, obj);
};

const queryStoreList = async () => {
  // let param =
  // str === "1"
  //   ? { coordCur: `${this.longitude},${this.latitude}` }
  //   : { storeName: this.searchValue };
  const param = {
    coordCur: `${longitude.value},${latitude.value}`,
    storeName: searchValue.value,
  };
  const { data } = await queryNearStoreFront(param);
  if (!data) {
    return setTimeout(() => {
      uni.showToast({
        title: '暂无门店信息',
        duration: 3000,
        icon: 'none',
      });
    }, 500);
  }
  const list = data.filter((item: any) => item.coord);
  markers.value = list.map((item: any, index: number) => {
    const arr = item.coord?.split(',');
    return {
      id: Number(index) + 1,
      label: {
        content: item.storeName,
        color: '#323338',
        fontSize: 12,
        textAlign: 'right',
      },
      longitude: arr[0],
      latitude: arr[1],
      distId: item.distId,
      province: item.province,
      city: item.city,
      district: item.district,
      address: item.address,
      tel: item.tel,
      range: item.range,
      width: 20,
      height: 30,
    };
  });
  console.log(markers.value[0]);

  storeObj.value = markers.value[0];
};

const seeServe = () => {
  const str = `mode=store&distId=${storeObj.value.distId}&storeName=${storeObj.value.label.content}`;
  uni.navigateTo({ url: `/reservation-service-pages/reservation-service/index?${str}` });
};
</script>

<style lang="scss" scoped>
.storePattern {
  height: 100vh;
  .search-bar {
    height: 104rpx;
    background-color: #fff;
    padding-left: 10rpx;
    padding-right: 10rpx;
    display: flex;
    .searchBar {
      width: calc(100% - 80rpx);
    }
    .search-text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: var(--main-color);
      display: flex;
      align-items: center;
    }
  }
  .page-section {
    height: calc(100vh - 104rpx);
    position: relative;
    .store {
      position: absolute;
      /*bottom: 30rpx;*/
      bottom: calc(30rpx + constant(safe-area-inset-bottom));
      bottom: calc(30rpx + env(safe-area-inset-bottom));
      left: 30rpx;
      right: 30rpx;
      background: #fff;
      border-radius: 16rpx;
      &-main {
        padding: 30rpx;
        .title {
          font-size: 32rpx;
          font-weight: bold;
          color: #414141;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .storeName {
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            flex: 1;
          }
          .text {
            font-size: 24rpx;
            color: #9697a2;
            font-weight: normal;
            flex-shrink: 0;
          }
        }
        .addr {
          margin: 16rpx 0;
        }
        .addr,
        .phone {
          font-size: 24rpx;
          color: #9697a2;
          .img {
            width: 28rpx;
            height: 28rpx;
            margin-right: 20rpx;
            position: relative;
            top: 4rpx;
          }
        }
      }
      .btn {
        height: 88rpx;
        line-height: 88rpx;
        border-top: 1px solid #ebedf0;
        font-size: 28rpx;
        text-align: center;
        color: var(--main-color);
      }
    }
  }
}
</style>
