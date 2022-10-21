<template>
  <!-- <page-meta page-style="{{pageStyle}}"> -->
  <view class="login">
    <view class="logo">
      <image :src="logo" mode="aspectFit" />
    </view>
    <view class="btn wx-auth" @click="showWxMiniAuthModal"> 微信授权登录 </view>
    <view class="btn no-login"> 暂不登录 </view>
    <view
      v-if="protocol.regAgreementShowed || protocol.privacyAgreementShowed"
      class="footer"
    >
      <view class="protocol">
        <text>登录代表阅读并同意</text>
        <text
          class="eula-name"
          @click="agreement(1)"
          v-if="protocol.regAgreementShowed"
        >
          《注册协议》
        </text>
        <text
          class="eula-name"
          @click="agreement(0)"
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
import { getLogoRequest, getMemberEulaRequest } from '@/api/server';
import type { login } from '@/typings/api';
import Storage from '@/utils/storage';
import { onMounted, reactive, ref } from 'vue';
import type { Protocol } from './index.type';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

const logo = ref('');
const PopupRef = ref<any>(null);

const protocol = reactive<Protocol>({});

/**
 * 自动登录
 */
const jsCodeLogin = async () => {
  const jsCode = await getWxLoginCode();

  if (!jsCode) {
    return;
  }

  const jsCodeLoginRequestRes = await jsCodeLoginRequest(jsCode);

  if (jsCodeLoginRequestRes.code !== 0) {
    return;
  }

  const { token, mid } = jsCodeLoginRequestRes.data;

  Storage.setToken(token);
  initBasicsData.setUseMid(mid);

  uni.showToast({ title: '登录成功！' });

  setTimeout(() => {
    uni.navigateBack();
  }, 1000);
};

const getLogo = async () => {
  const getLogoRequestRes = await getLogoRequest();

  if (getLogoRequestRes.code !== 0) {
    return;
  }

  logo.value = getLogoRequestRes.data ?? '';
};

const getMemberEula = async () => {
  const getMemberEulaRequestRes = await getMemberEulaRequest();
  if (!getMemberEulaRequestRes.data) {
    return;
  }
  Object.assign(protocol, getMemberEulaRequestRes.data);
};
const agreement = (i: number) => uni.navigateTo({ url: `agreement?eula=${JSON.stringify(protocol.eulas[i])}` });

const decryptPhoneNumber = async ({ detail: { errMsg, encryptedData, iv } }: any) => {
  if (errMsg === 'getPhoneNumber:fail user deny') {
    return;
  }
  const jsCode = await getWxLoginCode();

  if (jsCode && encryptedData && iv) {
    wxMiniAuth({
      jsCode,
      encryptedData,
      iv,
    });
  }
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

const showWxMiniAuthModal = () => {
  PopupRef.value.open();
};

const hideWxMiniAuthModal = () => {
  PopupRef.value.close();
};

const wxMiniAuth = async (params: login.WxMiniAuthRequestParams) => {
  // const { avatarUrl, nickName, sex } = this.userInfo;
  // const jsCode = uni.getStorageSync('code');
  const wxMiniAuthRequestRes = await wxMiniAuthRequest(params);

  if (wxMiniAuthRequestRes.code !== 0) {
    const wxMiniAuthRequestErrorModalRes = uni.showModal({
      content: wxMiniAuthRequestRes.msg,
      showCancel: false,
    });
  }

  //   .then(res => {
  //   this.updateJscode();
  //   if (res.code === 0 && res.data.token) {
  //     const info = res.data;
  //     const list = Object.keys(info);
  //     list.map(item => {
  //       if (info[item]) {
  //         // uni.setStorageSync(item, info[item]);
  //         if (item === 'token') {
  //           uni.setStorageSync(
  //             item + uni.getStorageSync('jqzAppid'),
  //             info[item]
  //           );
  //         } else if (item === 'mid') {
  //           uni.setStorageSync(
  //             item + uni.getStorageSync('jqzAppid'),
  //             info[item]
  //           );
  //         } else if (item === 'epid') {
  //           uni.setStorageSync(
  //             item + uni.getStorageSync('jqzAppid'),
  //             info[item]
  //           );
  //         } else {
  //           uni.setStorageSync(item, info[item]);
  //         }
  //       }
  //     });
  //     const { mid } = info;

  //     this.backInfo = info;

  //     if (mid) {
  //       // const url = pages.tabbar + `?url=${pages.center}`;
  //       const url = uni.getStorageSync('pages')
  //         ? uni.getStorageSync('pages')
  //         : `${pages.tabbar}?url=${pages.center}`;
  //       router.redirect(url);
  //     } else {
  //       const params = '';
  //       queryRegistRequiredSetting(params).then(res => {
  //         setTimeout(() => {
  //           this.downAuth = false;
  //         }, 1000);
  //         const { list, openRegist } = res.data;
  //         if (openRegist === 'Y') {
  //           if (list.length) {
  //             router.redirect('/pages/login/finish-info/index');
  //           } else {
  //             // 不用填写
  //             const { phone, wmid, sex } = this.backInfo;

  //             completeInfo({
  //               activeDistId: '',
  //               activeUid: '',
  //               address: '',
  //               annday: '',
  //               birthKind: 'U',
  //               birthLunar: '',
  //               birthSolar: '',
  //               inviteCode: '',
  //               nickName: '',
  //               phone: phone || uni.getStorageSync('phone'),
  //               sex: sex === 1 ? 'M' : sex === 0 ? 'F' : 'U',
  //               wmid: wmid || uni.getStorageSync('wmid'),
  //               name: '',
  //               relateKind: uni.getStorageSync('c') || undefined,
  //               relateNumber: uni.getStorageSync('num') || undefined,
  //               inviteMid: uni.getStorageSync('inviteMid') || undefined,
  //             }).then(res => {
  //               if (res.code === 0) {
  //                 res?.data &&
  //                   uni.setStorageSync(
  //                     `mid${uni.getStorageSync('jqzAppid')}`,
  //                     res.data
  //                   );
  //                 this.$store.state.firstSign = true;
  //                 removeActDataAndJumpPage(pages);
  //               }
  //             });
  //           }
  //         } else {
  //           uni.showModal({
  //             content: '账号不存在',
  //             showCancel: false,
  //             success: res => {
  //               if (res.confirm) {
  //                 this.updateJscode();
  //                 setTimeout(() => {
  //                   this.downAuth = false;
  //                 }, 1000);
  //               }
  //             },
  //           });
  //         }
  //       });
  //     }
  //   } else {
  //     setTimeout(() => {
  //       this.downAuth = false;
  //     }, 1000);
  //     this.updateJscode();
  //   }
  // });
};

onMounted(() => {
  getLogo();
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
