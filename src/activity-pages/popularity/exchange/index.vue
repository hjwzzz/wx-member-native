<template>
  <view class="popularity-exchange-page">
    <view class="prize-box">
      <image class="prize-cover" :src="prizeInfo.url" mode="aspectFill"></image>
      <view class="prize-title text-line-one">
        {{ prizeInfo.name }}
      </view>
      <view class="prize-price"> 需人气值：{{ prizeInfo.popularityNum }} </view>
      <view
        v-if="prizeInfo.kind == 'PRIZE' || prizeInfo.kind == 'COUPON'"
        class="prize-num"
      >
        剩余库存：{{ prizeInfo.giveNum }}件
      </view>
    </view>
    <view class="exchange-tip"> 请正确填写以下兑换信息，填写后不可更改 </view>
    <uni-forms :model="form" ref="uForm">
      <block v-for="v in formArr" :key="v.type">
        <uni-forms-item
          v-if="v.type == 'DIST_NAME'"
          :key="v.type"
          right-icon="arrow-right"
        >
          <template #label>
            <view class="forms-item-label">
              <text v-if="v.notNull === 'Y'" class="required-icon">*</text>
              {{ v.propertyName }}
            </view>
          </template>
          <input
            v-model="form.distName"
            disabled
            @click="selectShopFun"
            :placeholder="v.propertyRemind"
          />
          <image
            class="forms-item-icon"
            :src="staticUrl + 'activity/right.png'"
          ></image>
        </uni-forms-item>
        <uni-forms-item v-if="v.type == 'NAME'" :key="v.type">
          <template #label>
            <view class="forms-item-label">
              <text v-if="v.notNull === 'Y'" class="required-icon">*</text>
              {{ v.propertyName }}
            </view>
          </template>
          <input v-model="form.name" :placeholder="v.propertyRemind" />
        </uni-forms-item>
        <uni-forms-item v-if="v.type == 'PHONE'" :key="v.type">
          <template #label>
            <view class="forms-item-label">
              <text v-if="v.notNull === 'Y'" class="required-icon">*</text>
              {{ v.propertyName }}
            </view>
          </template>
          <input
            v-model="form.phone"
            disabled
            :placeholder="v.propertyRemind"
          />
          <view class="forms-item-supply">
            <button
              class="exchange-phone-btn"
              open-type="getPhoneNumber"
              @getphonenumber="getPhoneNumber"
            >
              <block v-if="form.phone">更换手机号</block>
              <block v-else>获取手机号</block>
            </button>
          </view>
        </uni-forms-item>
      </block>
    </uni-forms>
    <button class="exchange-save-btn" @click="onSumbit">提交</button>
    <view v-if="remark" class="exchange-remark">
      <view class="exchange-remark-title">
        <image
          class="exchange-remark-icon"
          src="https://static.jqzplat.com/popularity/remark-left.png"
          mode="aspectFit"
        ></image>
        备注
        <image
          class="exchange-remark-icon"
          src="https://static.jqzplat.com/popularity/remark-right.png"
          mode="aspectFit"
        ></image>
      </view>
      <view v-html="richImageFun(remark)"></view>
    </view>
    <AddressPopup
      :show="showAddress"
      :relatedId="actId"
      :distId="form.distId"
      initSelect
      @onChange="onChangeShowAddress"
      @onCheck="onCheck"
    />
    <toast-template
      v-model:visible="toastVisible"
      :message="toastMsg"
    ></toast-template>
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import AddressPopup from '../component/AddressPopup/index.vue';
import { getWxMiniInfo } from '@/api/server';
import {
  getChgAwardInfo,
  chgAward,
  checkChgAward,
} from '@/activity-pages/api/popularity';
import Router from '@/utils/router';
import { onLoad } from '@dcloudio/uni-app';
import { richImage } from '@/utils/util';
import { staticUrl } from '@/utils/config';
import Storage from '@/utils/storage';
import { useBasicsData } from '@/store/basicsData';
import ToastTemplate from '../../component/Toast/index.vue';

const initBasicsData = useBasicsData();
const actId = ref('');
const openId = ref('');
const color = ref('');
const prizeInfo = ref<any>('');
const formArr = ref<any[]>([
  { type: 'DIST_NAME' },
  { type: 'NAME' },
  { type: 'PHONE' },
]);
const form = reactive<any>({
  distId: '',
  distName: '',
  name: '',
  phone: '',
});
const showAddress = ref(false);
// const code = ref('');
const remark = ref('');
onLoad((options: any) => {
  actId.value = options.actId;
  color.value = options.color;
  openId.value = uni.getStorageSync('openId') || '';
  prizeInfo.value = uni.getStorageSync('popularityPrizeInfo');
  getFromInfo();
  updateJscode();
});
const updateJscode = () => {
  uni.login({
    success(res: any) {
      if (res.code) {
        // 发起网络请求
        // console.log('res.code', res.code);
        uni.setStorageSync('code', res.code);
      }
    },
  });
};
const getFromInfo = () => {
  const params = {
    id: actId.value,
    openId: openId.value,
  };
  getChgAwardInfo(params)
    .then(res => {
      const { exchangeParams: data = [], remark: remarkNew = '' } = res.data;
      const arr: any[] = [];
      formArr.value.map((z: any) => {
        data.map((v: any) => {
          if (v.type === z.type) {
            arr.push(v);
          }
        });
      });
      formArr.value = arr;
      remark.value = remarkNew;
    // console.log('this.formArr', formArr.value);
    // this.formArr =
    });
};
const selectShopFun = () => {
  showAddress.value = true;
};
const getPhoneNumber = (e: any) => {
  const { encryptedData, iv } = e.detail;
  // console.log('getPhoneNumber', e); // e.detail.code
  const jsCode = uni.getStorageSync('code');
  getWxMiniInfo({
    // avatarUrl: '',
    // nickName: '',
    jsCode,
    encryptedData,
    iv,
  })
    .then((res: any) => {
      // console.log('getWxMiniInfo', res);
      if (res.code === 0) {
        form.phone = res.data.phone || form.phone;
      }
      updateJscode();
    })
    .catch(() => {
      updateJscode();
    });
};
const onSumbit = () => {
  const params = {
    actId: actId.value,
    openId: openId.value,
    conId: prizeInfo.value.conId,
    distId: form.distId,
    name: form.name,
    phone: form.phone,
  };
  // console.log('formArr', formArr.value);
  for (let i = 0; i < formArr.value.length; i++) {
    const item = formArr.value[i];
    if (item.type === 'DIST_NAME' && !form.distId && item.notNull === 'Y') {
      uni.showToast({
        title: `请选择${item.propertyName}`,
        duration: 3000,
        icon: 'none',
      });
      return;
    }
    if (item.type === 'NAME' && !form.name && item.notNull === 'Y') {
      uni.showToast({
        title: `请输入${item.propertyName}`,
        duration: 3000,
        icon: 'none',
      });
      return;
    }
    if (item.type === 'PHONE' && !form.phone && item.notNull === 'Y') {
      uni.showToast({
        title: `请授权${item.propertyName}`,
        duration: 3000,
        icon: 'none',
      });
      return;
    }
  }
  // return
  chgAward(params, true)
    .then(res => {
      if (res.code === 0) {
        const { chgAwardRspVo, wxLoginRspVo = {} } = res.data;
        const list = Object.keys(wxLoginRspVo);
        list.map(item => {
          if (wxLoginRspVo[item]) {
          // uni.setStorageSync(item, info[item]);
            if (item === 'token') {
              Storage.setToken(wxLoginRspVo[item]);
            // uni.setStorageSync(
            //   item + uni.getStorageSync('jqzAppid'),
            //   wxLoginRspVo[item]
            // );
            } else if (item === 'mid') {
              initBasicsData.setUseMid(wxLoginRspVo[item]);
            // uni.setStorageSync(
            //   item + uni.getStorageSync('jqzAppid'),
            //   wxLoginRspVo[item]
            // );
            } else if (item === 'epid') {
              Storage.setEpid(wxLoginRspVo[item]);
            // uni.setStorageSync(
            //   item + uni.getStorageSync('jqzAppid'),
            //   wxLoginRspVo[item]
            // );
            } else {
              uni.setStorageSync(item, wxLoginRspVo[item]);
            }
          }
        });
        if (prizeInfo.value.kind === 'PRIZE') {
          checkPrize(chgAwardRspVo);
        } else {
        // const url = `/activity/inviteGift/prize?actId=${actId.value}&c=${color.value}`;
        // uni.setStorageSync('pages', url);
        // uni.reLaunch({ url });
          Router.goCodePage(
            'activiy_prize',
            `?actId=${actId.value}&c=${color.value}`,
            'redirectTo'
          );
        }
      } else if (res.code !== 500) {
        showToast(res.msg);
      }
    });
};
const checkPrize = (info: any) => {
  const { memberPrizeId: id, recvManner } = info;
  const params = {
    actId: actId.value,
    openId: openId.value,
    conId: prizeInfo.value.conId,
  };
  checkChgAward(params)
    .then(res => {
      if (res.code === 0) {
        if (form.distId) {
          uni.setStorageSync('storeName', form.distName);
          uni.setStorageSync('storage_id', form.distId);
        }
        let url = '/my-assets-pages/my-prize/prize-detail';
        url += `?id=${id}&code=${recvManner.code}&name=${recvManner.name}&flag=true`;
        if (form.distId) {
          url += `&storeName=${form.distName}&storage_id=${form.distId}`;
        }
        // uni.setStorageSync('pages', url);
        uni.redirectTo({ url });
      } else {
        showToast(res.msg);
        Router.goCodePage(
          'activiy_prize',
          `?actId=${actId.value}&c=${color.value}`,
          'redirectTo'
        );
      }
    });
};
const onCheck = (item: any) => {
  // console.log('onCheck3', item);
  form.distName = item.storeName;
  form.distId = item.distId;
  showAddress.value = false;
};
const onChangeShowAddress = (val: boolean) => {
  showAddress.value = val;
};

const richImageFun = (item: any) => richImage(item);
// 提示
const toastVisible = ref(false);
const toastMsg = ref('');
const showToast = (str: string) => {
  toastMsg.value = str;
  toastVisible.value = true;
};
</script>
<style lang="scss" scoped>
.popularity-exchange-page {
  padding: 30rpx;
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  .prize-box {
    position: relative;
    padding-left: 184rpx;
    min-height: 160rpx;
    color: #999;
    font-size: 24rpx;
    line-height: 24rpx;
  }
  .prize-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 160rpx;
    height: 160rpx;
    border-radius: 16rpx;
  }
  .prize-title {
    color: #333;
    font-size: 28rpx;
    font-weight: 600;
    line-height: 28rpx;
  }
  .prize-price,
  .prize-num {
    margin-top: 20rpx;
  }

  .exchange-tip {
    display: flex;
    margin: 32rpx 0 12rpx;
    height: 72rpx;
    align-items: center;
    color: #d07e3c;
    font-size: 24rpx;
    line-height: 1;
    justify-content: center;
    border-radius: 6rpx;
    background-color: #fff4db;
  }

  .exchange-phone-btn {
    padding: 0 8rpx;
    color: #fc5543;
    font-size: 26rpx;
    line-height: 70rpx;
    border: 0;
    background-color: transparent;
    &::after {
      opacity: 0;
    }
  }
  .exchange-save-btn {
    display: flex;
    margin-top: 40rpx;
    width: 100%;
    height: 88rpx;
    align-items: center;
    color: #ffe898;
    font-size: 32rpx;
    font-weight: 600;
    line-height: 1;
    justify-content: center;
    border-radius: 44rpx;
    background: linear-gradient(180deg, #fd6452 0%, #dc2e1c 100%);
  }

  .exchange-remark {
    color: #646771;
    font-size: 28rpx;
    line-height: 48rpx;
    word-break: break-all;
  }
  .exchange-remark-title {
    display: flex;
    margin-top: 60rpx;
    margin-bottom: 30rpx;
    align-items: center;
    color: #4d4d4d;
    justify-content: center;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 44rpx;
  }
  .exchange-remark-icon {
    margin: 0 16rpx;
    width: 130rpx;
    height: 22rpx;
  }
  :deep(.uni-forms) {
    .uni-forms-item__content {
      display: flex;
      align-items: center;
    }
    input {
      flex: 1;
      height: 70rpx;
    }
    .input-placeholder {
      color: rgba(192, 196, 204, 1);
    }
  }
  .required-icon {
    position: absolute;
    left: -16rpx;
    padding-top: 6rpx;
    color: #fa3534;
    vertical-align: middle;
  }
  .forms-item-label {
    position: relative;
    display: flex;
    width: 170rpx;
    align-items: center;
    color: #303133;
    font-size: 28rpx;
  }
  .forms-item-supply {
    flex: none;
  }
  .forms-item-icon {
    position: absolute;
    right: 6rpx;
    z-index: 1;
    width: 12rpx;
    height: 22rpx;
  }
}
</style>
