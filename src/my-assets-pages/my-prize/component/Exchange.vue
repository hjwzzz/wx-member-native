<template>
  <!-- 兑换奖品方式 -->
  <view class="container">
    <view class="address">
      <picker
        :disabled="props.item?.recvManner !== '3'"
        :range="['到店', '邮寄']"
        @change="chooseChangeType"
      >
        <view class="custom-cell bb">
          <view class="cell-label">领取方式</view>
          <view class="cell-body-input">{{ exchangeName }}</view>
          <uni-icons
            v-if="props.item?.recvManner === '3'"
            type="right"
            color="#bbb"
            size="16"
          ></uni-icons>
        </view>
      </picker>

      <view
        :class="['custom-cell', { bb: exchangeCode === 1 }]"
        @click="goStore"
      >
        <view class="cell-label">领取门店</view>
        <view class="cell-body-input">{{ storeInfo.storeName }}</view>
        <uni-icons type="right" color="#bbb" size="16"></uni-icons>
      </view>
      <view v-if="exchangeCode === 1" class="custom-cell bb">
        <view class="cell-label">领取人</view>
        <input
          class="cell-body-input"
          maxlength="20"
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
    </view>
    <view
      v-if="exchangeCode === 2 && !address?.phone"
      @click="goAdress"
      class="custom-cell other-cell"
    >
      <view class="c3">请填写收货地址</view>
      <!-- <input disabled class="cell-body-input" placeholder="" /> -->
      <uni-icons type="right" color="#bbb" size="16"></uni-icons>
    </view>

    <view
      v-if="exchangeCode === 2 && address?.phone"
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
          {{ mergeFullAddress(address) }}
        </view>
      </view>
      <view class="right">
        <uni-icons type="arrow-right" color="#B7B8C4" size="30" />
      </view>
    </view>

    <uni-popup ref="popup" type="message" @close="navBack">
      <view class="model" style="padding: 40rpx">
        <image
          class="modelimg"
          :src="`${staticUrl}prize/lingquchenggong.png`"
          mode=""
        />
        <view class="text"> 兑换成功 </view>
        <view class="sure" @click="navBack">确认</view>
      </view>
    </uni-popup>

    <view class="button">
      <button type="button" class="btn" @click="getPrize">确认兑换</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getAdressList } from '@/pages/api/address';
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { exchangePrize } from '@/my-assets-pages/api/my-prize';
import { staticUrl } from '@/utils/config';
import { mergeFullAddress } from '@/utils/util';
import router from '@/utils/router';

const props = defineProps<{ item: any }>();
const form = reactive({ name: '', phone: '' });

const exchangeCode = ref(0);
const exchangeName = computed(() => ['', '到店', '邮寄'][exchangeCode.value]);
const chooseChangeType = (e: any) => exchangeCode.value = +e.detail.value + 1;

// 当前奖品允许领取的方式
watch(
  props.item,
  () => {
    const code: string = props.item?.recvManner ?? '1';
    code !== '3' && (exchangeCode.value = parseInt(code));
  },
  { deep: true, immediate: true }
);

// 默认地址
onMounted(async () => {
  const { data } = await getAdressList();
  // TODO 接口修改未生效，先测试使用
  const d = data.find((i: any) => ['Y', 'true', 'false'].includes(i.isDefault));
  if (d) {
    address.value = d;
    const { receiver, phone } = d;
    form.name = receiver;
    form.phone = phone;
  }
});

// 选择地址
const address = ref<any>({});
const goAdress = () => {
  uni.$once('chooseAddress', (e: any) => address.value = e);
  uni.navigateTo({ url: '/pages/address/address-list?flag=true' });
};

// 选择店铺
const storeInfo = ref<any>({});
const goStore = () => {
  uni.$once('chooseStore', e => storeInfo.value = e);
  router.goCodePage(
    'chooseStore',
    `id=${storeInfo.value.distId ?? ''}&relatedId=${props.item.relatedId}`
  );
};

// 确认兑换
const popup = ref();
const getPrize = async () => {
  let str = '';
  const params: any = {
    id: props.item.id,
    recver: form.name,
    recverPhone: form.phone,
    quantity: props.item.quantity,
    prizeId: props.item.prizeId,
    recvManner: exchangeCode.value.toString(),
    recvStoreId: storeInfo.value.distId,
  };
  if (!exchangeCode.value) {
    str = '请选择领取方式';
  } else if (!params.recvStoreId) {
    str = '请选择领取门店';
  } else if (exchangeCode.value === 1) {
    const phoneReg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    !phoneReg.test(params.recverPhone) && (str = '请输入手机号');
    !params.recver && (str = '请输入领取人');
  } else if (exchangeCode.value === 2) {
    if (!address.value.phone) {
      str = '请填写收货地址';
    } else {
      const {
        province,
        city,
        district,
        address: adr,
        receiver: recver,
        phone: recverPhone,
      } = address.value;
      Object.assign(params, {
        province,
        city,
        district,
        address: adr,
        recver,
        recverPhone,
      });
    }
  }
  if (str) {
    uni.showToast({
      title: str,
      icon: 'none',
    });
    return;
  }
  const { code } = await exchangePrize(params);
  if (code === 0) {
    uni.$emit('changeTab', 1);
    popup.value.open('center');
  }
};
const navBack = () => uni.navigateBack({ delta: 1 });
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
  &.other-cell {
    margin-top: 30rpx;
    border-radius: 16rpx;
  }
  .cell-label {
    color: #323338;
    width: 180rpx;
  }
  .c3 {
    flex: 1;
    color: #323338;
  }
  .cell-body-input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
// 领取按钮
.button {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0rpx;
  // height: 100rpx;
  // padding: 10rpx 32rpx;
  background-color: #ffffff;
  width: 100%;
  padding-right: 32rpx;
  padding-left: 32rpx;
  padding-top: 10rpx;
  padding-bottom: calc(10rpx + constant(safe-area-inset-bottom));
  padding-bottom: calc(10rpx + env(safe-area-inset-bottom));
  .btn {
    background-color: var(--main-color);
    height: 80rpx;
    line-height: 80rpx;
    width: 100%;
    border-radius: 40rpx;
    color: #ffffff;
  }
}

.model {
  padding: 0 !important;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 32rpx;
  width: 610rpx;
  .text {
    margin-top: 20rpx;
    color: var(--main-color);
  }
  .sure {
    margin-top: 40rpx;
    width: 100%;
    text-align: center;
    line-height: 100rpx;
    border-top: 1rpx solid #ebedf0;
    color: var(--main-color);
  }

  .modelimg {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-top: 50rpx;
  }
}
</style>
