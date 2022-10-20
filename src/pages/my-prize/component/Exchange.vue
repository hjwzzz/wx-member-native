<template>
  <!-- 兑换奖品方式 -->
  <view class="address">
    <picker :range="['到店', '邮寄']" @change="chooseChangeType">
      <!-- <uni-list-item showArrow :rightText="exchangeName" title="领取方式" /> -->
      <view class="custom-cell bb">
        <view class="cell-label">领取方式</view>
        <view class="cell-body-input">{{ exchangeName }}</view>
        <uni-icons type="right" color="#bbb" size="16"></uni-icons>
      </view>
    </picker>

    <view class="custom-cell bb" @click="goStore">
      <view class="cell-label">领取门店</view>
      <view class="cell-body-input">{{ storeInfo.storeName }}</view>
      <uni-icons type="right" color="#bbb" size="16"></uni-icons>
    </view>
    <view v-if="exchangeCode === 1" class="custom-cell bb">
      <view class="cell-label">领取人</view>
      <input
        class="cell-body-input"
        v-model="form.name"
        placeholder="请输入名字"
      />
    </view>
    <view v-if="exchangeCode === 1" class="custom-cell">
      <view class="cell-label">手机号</view>
      <input
        class="cell-body-input"
        v-model="form.phone"
        placeholder="请填写手机号"
        type="number"
        :maxlength="11"
      />
    </view>
    <view
      v-if="exchangeCode === 2 && !address.phone"
      @click="goAdress"
      class="custom-cell"
    >
      <input disabled class="cell-body-input" placeholder="请填写收货地址" />
      <uni-icons type="right" color="#bbb" size="16"></uni-icons>
    </view>

    <view
      v-if="exchangeCode === 2 && address.phone"
      class="adressInfo"
      @click="goAdress"
    >
      <view class="left">
        <view class="tops">
          <view class="names">
            {{ address.receiver }}
          </view>
          <view class="phones">
            {{ address.phone }}
          </view>
        </view>
        <view class="bottoms">
          {{ adressGroup }}
        </view>
      </view>
      <view class="right">
        <uni-icons type="arrow-right" color="#B7B8C4" size="30" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getAdressList } from '@/api/address';
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, computed } from 'vue';
import { useBasicsData } from '@/store/basicsData';
const initBasicsData = useBasicsData();

const props = defineProps<{ item: any }>();
const form = reactive({ name: '', phone: '' });

const exchangeCode = ref(1);
const exchangeName = computed(() => ['', '到店', '邮寄'][exchangeCode.value]);
const chooseChangeType = (e: any) => exchangeCode.value = parseInt(e.detail.value) + 1;

onLoad(() => {
  getAdressList({ mid: initBasicsData.useMid })
    .then(res => {
      const { records } = res.data;
      // 个人中心的收货地址，已添加有地址时，如果没有设置默认地址，则显示“请选择收货地址”，点击跳转选择收货地址页面
      address.value = records.find((item: { isDefault: string }) => item.isDefault === 'true');
    });
});

// 选择地址
const address = ref<any>({});
const adressGroup = computed(() => {
  const { province, city, district, address: adr } = address.value;
  return province + city + district + adr;
});
const goAdress = () => {
  uni.$once('chooseAddress', e => address.value = e);
  uni.navigateTo({ url: '/points-mall-pages/address/address-list' });
};

// 选择店铺
const storeInfo = ref<any>({});
const goStore = () => {
  const { prizeId, distName, relatedId } = props.item;
  uni.$once('chooseStore', e => storeInfo.value = e);
  uni.navigateTo({ url: `store-list?id=${prizeId}&name=${distName}&relatedId=${relatedId}` });
};
</script>

<style scoped lang="scss">
.bb {
  border-bottom: #ebedf0 1rpx solid;
}
.address {
  margin-top: 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.custom-cell {
  height: 100rpx;
  display: flex;
  align-items: center;
  padding-left: 30rpx;
  padding-right: 20rpx;
  background-color: white;
  font-size: 28rpx;
  .cell-label {
    color: #323338;
    width: 180rpx;
  }
  .cell-body-input {
    color: #9697a2;
    flex: 1;
  }
}

.adressInfo {
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
  padding: 30rpx;
  background: #ffff;
  border-radius: 16rpx;
  .left {
    width: 100%;
    .tops {
      color: #323338;
      display: flex;
      .names {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .phones {
        margin-left: 32rpx;
        flex: 1;
      }
    }
    .bottoms {
      margin-top: 18rpx;
      color: #9697a2;
    }
  }
}
</style>
