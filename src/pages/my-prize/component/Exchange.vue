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
    <navigator
      :url="`store-list?id=${props.item.prizeId}&name=${props.item.distName}&relatedId=${props.item.relatedId}`"
    >
      <view class="custom-cell bb" @click="stores">
        <view class="cell-label">领取门店</view>
        <view class="cell-body-input">{{ storeName }}</view>
        <uni-icons type="right" color="#bbb" size="16"></uni-icons>
      </view>
    </navigator>
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
      v-if="exchangeCode === 2 && showAdress"
      @click="goAdress"
      class="custom-cell"
    >
      <input
        disabled
        class="cell-body-input"
        v-model="form.phone"
        placeholder="请填写收货地址"
      />
      <uni-icons type="right" color="#bbb" size="16"></uni-icons>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const props = defineProps({ item: {} });

const form = reactive({ name: '', phone: '' });

const storeName = ref();
const stores = ref();
const showAdress = ref(true);
const exchangeName = computed(() => ['', '到店', '邮寄'][exchangeCode.value]);
const exchangeCode = ref(1);
const goAdress = () => [];

const chooseChangeType = (e: any) => {
  console.log(e);

  exchangeCode.value = parseInt(e.detail.value) + 1;
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
</style>
