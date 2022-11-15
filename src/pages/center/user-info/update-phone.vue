<template>
  <CustomPage>
    <view class="phone">
      <view class="code">
        <view v-if="!set" class="size">
          <view class="title">手机号</view>
          <view class="text">{{ phone || '' }}</view>
        </view>
        <view v-else class="size">
          <view class="title">手机号</view>
          <view class="text">
            <input
              type="number"
              maxlength="11"
              placeholder="请输入新手机号"
              v-model="phone"
            />
          </view>
        </view>
        <view class="verify">
          <view class="vers">
            <view class="title">验证码</view>
            <view class="verCode">
              <input
                type="text"
                maxlength="6"
                placeholder="请输入验证码"
                placeholder-class="placeholder"
                placeholder-style="color:#d8d9e0"
                v-model="code"
              />
            </view>
          </view>
          <view class="tip" @click="handleCode">
            <text v-if="letter">获取验证码</text>
            <text v-else>{{ timer }} s</text>
          </view>
        </view>
      </view>
      <view class="next" @click="handleNext">{{
        set ? '保存' : '下一步'
      }}</view>
      <view class="question" @click="handleCert">无法获取验证码</view>
    </view>
  </CustomPage>
</template>

<script setup lang="ts">
import {
  updatePhoneSendCode,
  updatePhoneVerify,
  updatePhone,
} from '@/api/server';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const phone = ref('');
const code = ref('');
const letter = ref(true);
const timer = ref(60);
const set = ref(false);
const verifyId = ref('');

onLoad((e: any) => {
  phone.value = e.phone || '';
  set.value = !!e.set;
  verifyId.value = e.verifyId;
});
let waitRequest = false;
const handleCode = async () => {
  if (waitRequest) return;
  waitRequest = true;
  if (!letter.value) return;
  const { code } = await updatePhoneSendCode(phone.value);
  if (code === 0) {
    countTimer();
  }
};

const countTimer = () => {
  const count = setInterval(() => {
    if (timer.value <= 1) {
      letter.value = true;
      timer.value = 60;
      waitRequest = false;
      clearInterval(count);
    } else {
      letter.value = false;
      timer.value -= 1;
    }
  }, 1000);
};
const handleNext = async () => {
  if (!phone.value || phone.value.length !== 11) {
    uni.showModal({
      content: '请输入手机号',
      showCancel: false,
    });
    return;
  }
  if (!code.value || code.value.length < 4) {
    uni.showModal({
      content: '请输入验证码',
      showCancel: false,
    });
    return;
  }

  const url = set.value ? updatePhone : updatePhoneVerify;

  const {
    code: c,
    data,
    msg,
  } = await url({
    phone: phone.value,
    verifyCode: code.value,
    ...set.value && { verifyId: verifyId.value },
  });

  if (c === 0) {
    if (set.value) {
      uni.showToast({
        title: '修改成功',
        icon: 'none',
      });
      uni.navigateBack();
    } else {
      uni.redirectTo({ url: `/pages/center/user-info/update-phone?set=true&verifyId=${data}` });
    }
  } else {
    uni.showToast({
      title: msg,
      icon: 'none',
    });
  }
};
const handleCert = () => [];
</script>

<style scoped lang="scss">
.placeholder {
  color: #d8d9e0;
}

.phone {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  overflow: auto;

  .code {
    width: 690rpx;
    height: 200rpx;
    background: #ffffff;
    border-radius: 20rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    margin-bottom: 60rpx;

    .size {
      display: flex;
      padding: 30rpx;
      border-bottom: 1rpx solid #ebedf0;

      .title {
        width: 84rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
        line-height: 40rpx;
        margin-right: 50rpx;
      }
    }
    .verify {
      display: flex;
      padding: 30rpx;
      justify-content: space-between;
      .vers {
        display: flex;
        justify-content: flex-start;
      }
      .title {
        width: 84rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #323338;
        line-height: 40rpx;
        margin-right: 50rpx;
      }
      .tip {
        width: 140rpx;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: var(--main-color);
        line-height: 40rpx;
        text-align: 'center';
      }
    }
  }

  .next {
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    background: var(--main-color);
    border-radius: 44rpx;
    margin: 0 auto;
    text-align: center;

    font-size: 32rpx;
    font-weight: 400;
    color: #ffffff;
  }

  .question {
    display: none;
    width: 690rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    border: 2rpx solid #ff547b;
    margin: 0 auto;
    text-align: center;
    margin-top: 40rpx;

    font-size: 32rpx;
    font-weight: 400;
    color: #ff547b;
  }
}
</style>
