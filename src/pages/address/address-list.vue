<template>
  <CustomPage>
    <view class="adress-list">
      <view class="list-item" v-for="(item, i) in adressList" :key="i">
        <view class="top" @click="handleSelectedAddress(item)">
          <view class="person-info">
            <view class="itemName">
              {{ item.receiver }}
            </view>
            <view class="itemPhone">
              {{ item.phone }}
            </view>
          </view>
          <view style="word-wrap: break-word">
            {{ item.province + item.city + item.district + item.address }}
          </view>
        </view>
        <view class="addr-bottom">
          <view @click="changeDefaultAddress(item, item.isDefault)">
            <text
              :class="[
                'iconfont margin-text',
                item.isDefault == 'Y' ? 'icon-yigouxuan' : 'icon-weigouxuan',
                'icon-text',
              ]"
            >
            </text>
            {{ item.isDefault == 'Y' ? '默认地址' : '设为默认' }}
          </view>
          <view class="edit-del">
            <view style="margin-right: 48rpx" @click="goToUpdatePage(item)">
              <text class="iconfont icon-bianjiedit icon-text"></text>编辑
            </view>
            <view @click="deleAdress(item.id)">
              <text class="iconfont icon-shanchu_delete icon-text"></text>移除
            </view>
          </view>
        </view>
      </view>
      <view class="address-tip-show">
        <view class="adress-tip" v-if="adressList.length == 0">
          <view class="_mgs tip-img">
            <image
              :src="`${staticUrl}/points-mall-pages/addr-icon.png`"
              mode=""
            ></image>
          </view>
          <view class="_mgs tip-txte"> 您还没有收货地址哦~添加一个吧 </view>
          <view class="_mgs tip-btn">
            <view class="_mgs" @click="handleSelectedGuid">马上添加 </view>
          </view>
        </view>
      </view>
    </view>

    <view class="submit">
      <view class="btn" @click="handleSelectedGuid"> 添加收货地址 </view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import {
  deleteAddress,
  getAdressList,
  updateAddress,
} from '@/pages/api/address';

import type { IAddress } from '@/pages/api/types/address';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';
import CustomPage from '@/components/CustomPage/index.vue';
import { staticUrl } from '@/utils/config';

const props = defineProps({ flag: { type: Boolean, default: false } });
const adressList = ref<IAddress[]>([]);
const getData = async (flag = false) => {
  const { data } = await getAdressList('');
  adressList.value = data;
  if (flag) {
    setTimeout(() => {
      uni.showToast({
        title: '设置成功!',
        icon: 'none',
      });
    }, 100);
  }
};
onShow(getData);
const handleSelectedAddress = (e: IAddress) => {
  if (!props.flag) return;
  uni.$emit('chooseAddress', e);
  uni.navigateBack();
};

// 编辑地址;
const handleSelectedGuid = () => uni.navigateTo({ url: 'add' });
const goToUpdatePage = (e: any) => {
  uni.navigateTo({ url: `add?id=${e.id}` });
};
const deleAdress = async (id: string) => {
  const { cancel }: any = await uni.showModal({ content: '确定要删除该地址吗？' });
  if (cancel) return;
  const { msg } = await deleteAddress(id);
  if (msg !== '成功') return;
  uni.showToast({
    title: '删除成功!',
    icon: 'none',
  });
  getData();
};
// 修改默认地址
const changeDefaultAddress = async (e: any, d: string) => {
  e.isDefault = d === 'Y' ? 'N' : 'Y';
  const { msg } = await updateAddress(e);
  msg === '成功' && getData(true);
};
</script>

<style scoped lang="scss">
.icon-yigouxuan {
  color: var(--main-color);
}
.icon-weigouxuan {
  color: #ff547b;
}
.address-tip-show {
  display: flex;
  justify-content: center;
}
.adress-tip {
  width: 690rpx;
  height: 584rpx;
  background: #ffffff;
  border-radius: 16rpx;
  margin-top: 20rpx;
  ._mgs {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tip-img {
    padding-top: 100rpx;
    image {
      width: 138rpx;
      height: 138rpx;
    }
  }
  .tip-txte {
    font-size: 28rpx;
    font-weight: 400;
    color: #6b6b6b;
    line-height: 180rpx;
  }
  .tip-btn {
    view {
      width: 176rpx;
      height: 64rpx;
      border-radius: 8rpx;
      border: 2rpx solid #f86262;
      color: #f86262;
    }
  }
}

.add-btn {
  height: 80rpx;
  border-radius: 40rpx;
  border: 2rpx solid #f86262;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  font-weight: 500;
  color: #f86262;
}
.adress-list {
  min-height: calc(100vh - (200rpx + constant(safe-area-inset-bottom)));
  min-height: calc(100vh - (200rpx + env(safe-area-inset-bottom)));
  // padding: 30rpx;
  flex: 1;
  .list-item {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 16rpx;
    margin-top: 30rpx;
    .show-is-default {
      width: 80rpx;
      height: 80rpx;
      // background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: -20rpx;
      margin-top: -20rpx;
    }
    .top {
      display: flex;
      flex-direction: column;
      padding: 30rpx;
      // border-bottom: 1px solid #ebedf0;
      .person-info {
        display: flex;
        justify-content: space-between;
        color: #323338;
        font-size: 28rpx;
        margin-bottom: 18rpx;
        height: 45rpx;
        .itemName {
          font-weight: 800;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 10rpx;
          width: calc(100vw - 350rpx);
        }

        .itemPhone {
          font-weight: 400;
          // background-color: red;
          width: 200rpx;
        }
        .showDefalut {
          width: 72rpx;
          height: 36rpx;
          background: #f86262;
          border-radius: 20rpx;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20rpx;
          margin-left: 20rpx;
        }
      }
    }
    .addr-bottom {
      border-top: 1rpx solid #ebedf0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx 30rpx;
      color: #9697a2;
      font-weight: 400;
      .edit-del {
        font-size: 24rpx;
        display: flex;
        align-items: center;
      }
      .margin-text {
        margin-right: 10rpx;
      }
    }
  }
}

.footer {
  height: 64rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #d8d9e0;
  line-height: 64rpx;
  text-align: center;
  margin-bottom: calc(110rpx + constant(safe-area-inset-bottom));
  margin-bottom: calc(110rpx + env(safe-area-inset-bottom));
}
.submit {
  width: 100%;
  padding-top: 10rpx;
  // height: 160rpx;
  // height: calc(100rpx + constant(safe-area-inset-bottom));
  // height: calc(100rpx + env(safe-area-inset-bottom));
  // line-height: 100rpx;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  background: #ffff;
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
    margin-bottom: 10rpx;
  }
}
</style>
