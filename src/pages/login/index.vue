<template>
  <!-- <page-meta page-style="{{pageStyle}}"> -->
  <view class="login">
    <view class="logo">
      <image :src="logo" mode="aspectFit" />
    </view>
    <button
      class="btn popup-btn-reslove"
      open-type="getPhoneNumber"
      @getphonenumber="decryptPhoneNumber"
    >
      微信授权登录
    </button>

    <view class="btn no-login mT40" @click="navBack"> 暂不登录 </view>
    <view
      v-if="protocol.regAgreementShowed || protocol.privacyAgreementShowed"
      class="footer"
    >
      <uni-icons type="checkbox" style="margin-bottom: 10rpx" size="14" />
      <view class="protocol">
        <text>登录代表阅读并同意</text>
        <text
          class="eula-name"
          @click="agreement('REG')"
          v-if="protocol.regAgreementShowed"
        >
          《用户协议》
        </text>
        <text
          class="eula-name"
          @click="agreement('PRIV')"
          v-if="protocol.privacyAgreementShowed"
        >
          《隐私协议》
        </text>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { jsCodeLoginRequest, wxMiniAuthRequest } from '@/api/login';
import {
  getMemberEulaRequest,
  queryRegistRequiredSettingNew,
  completeInfo,
} from '@/api/server';
import Storage from '@/utils/storage';
import { onMounted, reactive, ref } from 'vue';
import type { Protocol } from './index.type';
import { useBasicsData } from '@/store/basicsData';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import Router from '@/utils/router';

const initBasicsData = useBasicsData();
const logo = ref('');
const protocol = reactive<Protocol>({});

onLoad(({ c, num, inviteMid }) => {
  // 邀请信息
  c && uni.setStorageSync('c', c);
  num && uni.setStorageSync('num', num);
  inviteMid && uni.setStorageSync('inviteMid', inviteMid);
});
onMounted(() => {
  getMemberEula();
  jsCodeLogin();
});

/**
 * 自动登录
 */
const jsCodeLogin = async () => {
  const { code: jscode }: any = await uni.login({});
  const { code, data } = await jsCodeLoginRequest({ jscode });
  if (code !== 0) return;
  const { token = '', mid = '' } = data;
  Storage.setToken(token);
  initBasicsData.setUseMid(mid);

  if (!mid) return;
  // uni.showToast({ title: '登录成功！' });
  Router.fromLoginBack();
  // setTimeout(Router.fromLoginBack, 1000);
};

// 用户协议
const getMemberEula = async () => {
  const { data } = await getMemberEulaRequest();
  logo.value = data.logo;
  Object.assign(protocol, data);
};
const agreement = (i: string) => {
  const agreementDetail = protocol.eulas.find(k => k.kind === i);
  uni.navigateTo({
    url: 'agreement',
    success: ({ eventChannel }) => eventChannel.emit('data', [{ ...agreementDetail }]),
  });
};

let waitPhoneAuth = false;
const decryptPhoneNumber = async ({ detail: { errMsg, encryptedData, iv, code } }: any) => {
  if (waitPhoneAuth || errMsg === 'getPhoneNumber:fail user deny') return;
  waitPhoneAuth = true;
  const { code: jscode }: any = await uni.login({});
  if (code && encryptedData && iv) {
    await wxPhoneLogin({
      iv,
      sex: 'U',
      code,
      jscode,
      nickName: '',
      avatarUrl: '',
      encryptedData,
    });
  }
  waitPhoneAuth = false;
};

const autoCompleteInfo = async ({ phone, wmid }: any) => {
  const { code, data: d } = await completeInfo({
    activeDistId: '',
    activeUid: '',
    address: '',
    annday: '',
    birthKind: 'U',
    birthLunar: '',
    birthSolar: '',
    inviteCode: '',
    name: '',
    sex: 'U',
    phone,
    activePerfectData: 'N',
    nickName: `${phone.substr(0, 4)}***${phone.substr()
      .substr(-3, 3)}`,
    avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    wmid,
    relateKind: uni.getStorageSync('c') || undefined,
    relateNumber: uni.getStorageSync('num') || undefined,
    inviteMid: uni.getStorageSync('inviteMid') || undefined,
  });

  if (code === 0 && d) {
    uni.removeStorageSync('c');
    uni.removeStorageSync('num');
    uni.removeStorageSync('pages');
    uni.removeStorageSync('inviteMid');
    initBasicsData.setUseMid(d);
    Router.fromLoginBack();
  }
};

const wxPhoneLogin = async (params: any) => {
  const { data, code, msg } = (await wxMiniAuthRequest(params)) as any;
  if (code !== 0 || !data.token) {
    uni.showModal({
      content: msg || '登录失败',
      showCancel: false,
    });
    return;
  }

  const phone = data.phone || uni.getStorageSync('phone');
  const wmid = data.wmid || uni.getStorageSync('wmid');
  const list = Object.keys(data);
  list.map(item => uni.setStorageSync(item, data[item]));

  /**
   * 如果有 mid ，表示已经是会员且激活了，不用进入完善资料
   */
  if (data.mid) {
    initBasicsData.setUseMid(data.mid);
    Router.fromLoginBack();
  } else {
    const { data: { list, openRegist, activePerfectData } } = await queryRegistRequiredSettingNew({});

    // 如果是未激活的用户
    if (data.isMember === 'Y') {
      // 如果开启激活完善资料
      if (activePerfectData === 'Y') {
        if (list.length) {
          // 设置标识，在完善资料页面使用
          uni.setStorageSync('isMember', data.isMember);
          uni.redirectTo({ url: `/pages/login/finish-info?p=${Storage.getPages() || ''}` });
          return;
        }
      }
      autoCompleteInfo({
        phone,
        wmid
      });

      return;
    }
    // 正常注册的客户
    if (openRegist === 'Y') {
      if (list.length) {
        uni.redirectTo({ url: `/pages/login/finish-info?p=${Storage.getPages() || ''}` });
        return;
      }
      autoCompleteInfo({
        phone,
        wmid
      });
    } else {
      uni.showModal({
        content: '账号不存在',
        showCancel: false,
      });
    }
  }
};

const navBack = async () => uni.navigateBack({ fail: () => uni.reLaunch({ url: '/pages/tabbar/index' }) });

// 离开登录页面，清空保存的需要前往的页面数据
onUnload(() => Storage.setPages(''));
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 80rpx;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;

  .logo {
    width: 354rpx;
    height: 260rpx;
    margin-bottom: 80rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .btn {
    width: 600rpx;
    height: 88rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 44rpx;

    &.wx-auth {
      margin-bottom: 40rpx;
      color: #fff;
      background: v-bind('initBasicsData.mainColor');
    }

    &.no-login {
      color: v-bind('initBasicsData.mainColor');
      background: transparent;
      border: 2rpx solid v-bind('initBasicsData.mainColor');
    }
  }

  .footer {
    position: absolute;
    bottom: 200rpx;
    display: flex;
    justify-content: center;
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
    align-items: center;
    :deep(.uniui-checkbox) {
      vertical-align: text-bottom;
    }
    .protocol {
      height: 34rpx;
      margin-left: 10rpx;
      font-size: 24rpx;
      color: #b7b8c4;

      .eula-name {
        color: v-bind('initBasicsData.mainColor');
      }
    }
  }
}

.popup {
  width: 580rpx;
  background-color: #fff;
  border-radius: 14rpx;
  overflow: hidden;

  &-content {
    &-title {
      padding: 30rpx 20rpx 0;
      font-size: 32rpx;
      color: #333;
      text-align: center;
    }

    &-box {
      padding: 30rpx 30rpx 40rpx;
      font-size: 28rpx;
      color: #666;
    }
  }

  &-btn {
    display: flex;
    border-top: 1rpx solid #eee;

    &-btn {
      width: 50%;
      height: 80rpx;
      font-size: 32rpx;
      line-height: 80rpx;
      border-radius: 0;

      &::after {
        border: none;
      }
    }

    &-reslove {
      color: #fff;
      background-color: v-bind('initBasicsData.mainColor');
      &::after {
        border: none;
      }
    }
  }
}
.mT40 {
  margin-top: 40rpx;
}
</style>
