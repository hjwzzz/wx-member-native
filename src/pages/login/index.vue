<template>
  <!-- <page-meta page-style="{{pageStyle}}"> -->
  <view class="login">
    <view class="logo">
      <image :src="logo" mode="aspectFit" />
    </view>
    <view class="btn wx-auth" @click="showWxMiniAuthModal"> 微信授权登录 </view>
    <view class="btn no-login" @click="Router.fromLoginBack"> 暂不登录 </view>
    <view
      v-if="protocol.regAgreementShowed || protocol.privacyAgreementShowed"
      class="footer"
    >
      <view class="protocol">
        <text>登录代表阅读并同意</text>
        <text
          class="eula-name"
          @click="agreement('REG')"
          v-if="protocol.regAgreementShowed"
        >
          《注册协议》
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

  <uni-popup ref="PopupRef" type="center">
    <view class="popup">
      <view class="popup-content">
        <view class="popup-content-title"> 授权申请 </view>
        <view class="popup-content-box">
          为了您更好的体验，请先绑定手机号才能登录噢！
        </view>
      </view>
      <view class="popup-btn">
        <button
          @click="hideWxMiniAuthModal"
          class="popup-btn-btn popup-btn-reject"
        >
          拒绝
        </button>
        <button
          class="popup-btn-btn popup-btn-reslove"
          open-type="getPhoneNumber"
          @getphonenumber="decryptPhoneNumber"
        >
          允许
        </button>
      </view>
    </view>
  </uni-popup>
  <!-- </page-meta> -->
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
import { onLoad } from '@dcloudio/uni-app';
import Router from '@/utils/router';

const initBasicsData = useBasicsData();

const logo = ref('');
const PopupRef = ref<any>(null);

const protocol = reactive<Protocol>({});

/**
 * 自动登录
 */
const jsCodeLogin = async () => {
  const jsCode = await getWxLoginCode();
  if (!jsCode) return;
  const { code, data } = await jsCodeLoginRequest(jsCode);
  if (code !== 0) return;
  const { token = '', mid = '' } = data;
  Storage.setToken(token);
  initBasicsData.setUseMid(mid);

  uni.showToast({ title: '登录成功！' });
  setTimeout(Router.fromLoginBack, 1000);
};

const getMemberEula = async () => {
  const { data } = await getMemberEulaRequest();
  logo.value = data.logo;
  data && Object.assign(protocol, data);
};
const agreement = (i: string) => {
  const agreementDetail = protocol.eulas.find(k => k.kind === i);
  uni.navigateTo({ url: `agreement?eula=${JSON.stringify(agreementDetail)}` });
};
let waitPhoneAuth = false;

const decryptPhoneNumber = async ({ detail: { errMsg, encryptedData, iv, code } }: any) => {
  if (waitPhoneAuth || errMsg === 'getPhoneNumber:fail user deny') {
    return;
  }
  waitPhoneAuth = true;
  const jsCode = await getWxLoginCode();
  const { avatarUrl, nickName, sex } = userInfo.value;
  if (jsCode && encryptedData && iv) {
    await wxMiniAuth({
      iv,
      sex: (['F', 'M'] as const)[sex] ?? 'U',
      jscode: jsCode, // J
      code,
      nickName,
      avatarUrl,
      encryptedData,
    });
  }
  waitPhoneAuth = false;
};

const getWxLoginCode = () => new Promise<string>((resolve, reject) => {
  uni.login({
    success: res => {
      if (res.code) {
        resolve(res.code);
        return;
      }
      reject(`登录失败！${res.errMsg}`);
    },
    fail: err => {
      reject(err);
    },
  });
});

const userInfo = ref();
let waitWxMiniAuth = false;
const showWxMiniAuthModal = async () => {
  if (waitWxMiniAuth) return;

  waitWxMiniAuth = true;
  try {
    const { userInfo: u, errMsg }: any = await uni.getUserProfile({ desc: '微信授权登录' }); // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    waitWxMiniAuth = false;
    if (errMsg === 'getUserProfile:ok') {
      userInfo.value = u;
      PopupRef.value.open();
    }
  } catch (error) {
    waitWxMiniAuth = false;
    uni.showModal({
      content: '需要授权用户信息才能使用',
      showCancel: false,
    });
  }
};

const hideWxMiniAuthModal = () => {
  PopupRef.value.close();
};

const wxMiniAuth = async (params: any) => {
  const { data, code, msg } = (await wxMiniAuthRequest(params)) as any;
  if (code !== 0 || !data.token) {
    uni.showModal({
      content: msg || '登录失败',
      showCancel: false,
    });
    return;
  }

  const list = Object.keys(data);
  list.map(item => {
    if (data[item]) {
      if (item === 'token') {
        Storage.setToken(data[item]);
      } else if (item === 'mid') {
        initBasicsData.setUseMid(data[item]);
      } else if (item === 'epid') {
        Storage.setEpid(data[item]);
      } else {
        uni.setStorageSync(item, data[item]);
      }
    }
  });
  if (data.mid) {
    Router.fromLoginBack();
  } else {
    const { data: { list, openRegist } } = await queryRegistRequiredSettingNew({});
    if (openRegist === 'Y') {
      if (list.length) {
        uni.redirectTo({ url: '/pages/login/finish-info' });
      } else {
        // 不用填写
        const { phone, wmid } = data;
        const { code, data: d } = await completeInfo({
          activeDistId: '',
          activeUid: '',
          address: '',
          annday: '',
          birthKind: 'U',
          birthLunar: '',
          birthSolar: '',
          inviteCode: '',
          nickName: params.nickName ?? '',
          phone: phone || uni.getStorageSync('phone'),
          sex: params.sex,
          wmid: wmid || uni.getStorageSync('wmid'),
          name: '',
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
      }
    } else {
      await uni.showModal({
        content: '账号不存在',
        showCancel: false,
      });
    }
  }
};

onLoad(opstion => {
  // 邀请信息
  opstion?.c && uni.setStorageSync('c', opstion?.c);
  opstion?.num && uni.setStorageSync('num', opstion?.num);
  opstion?.inviteMid && uni.setStorageSync('inviteMid', opstion?.inviteMid);
});
onMounted(() => {
  getMemberEula();
  jsCodeLogin();
});
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
    }
  }
}
</style>
