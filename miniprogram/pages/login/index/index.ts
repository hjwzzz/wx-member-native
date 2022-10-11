import { getLogoRequest, getMemberEulaRequest } from '../../../api/server';
import type { LoginIndexPageData } from './index.type';
import commonPage from './../../../component/common-page/index';
import { wxMiniAuthRequest, jsCodeLoginRequest } from '../../../api/login';
import type { login } from './../../../typings/api';
import Storage from '../../../utils/storage';

Component({
  data: <LoginIndexPageData>{
    logo: '',
    protocol: {},

    wxMiniAuthInfo: {
      modalConfig: {
        show: false,
      },
    },
  },

  behaviors: [commonPage],

  pageLifetimes: {
    show() {
      this.getLogo();
      this.getMemberEula();
      this.jsCodeLogin();
    },
  },

  methods: {
    /**
     * 自动登录
     */
    async jsCodeLogin() {
      const jsCode = await this.getWxLoginCode();

      if (!jsCode) {
        return;
      }

      const jsCodeLoginRequestRes = await jsCodeLoginRequest(jsCode);

      if (jsCodeLoginRequestRes.code !== 0) {
        return;
      }

      const { token, mid } = jsCodeLoginRequestRes.data;

      Storage.setToken(token);
      Storage.setMid(mid);

      await wx.showToast({
        title: '登录成功！',
      });

      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    },

    async getLogo() {
      const getLogoRequestRes = await getLogoRequest();

      if (getLogoRequestRes.code !== 0) {
        return;
      }

      this.setData({
        logo: getLogoRequestRes.data ?? '',
      });
    },

    async getMemberEula() {
      const getMemberEulaRequestRes = await getMemberEulaRequest();

      if (!getMemberEulaRequestRes.data) {
        return;
      }

      this.setData({
        protocol: getMemberEulaRequestRes.data,
      });
    },

    async decryptPhoneNumber({
      detail: { errMsg, encryptedData, iv },
    }: WechatMiniprogram.ButtonGetPhoneNumber) {
      if (errMsg === 'getPhoneNumber:fail user deny') {
        return;
      }
      const jsCode = await this.getWxLoginCode();

      if (jsCode && encryptedData && iv) {
        this.wxMiniAuth({
          jsCode,
          encryptedData,
          iv,
        });
      }
    },

    getWxLoginCode() {
      return new Promise<string>((resolve, reject) => {
        wx.login({
          success: res => {
            console.log(res);
            if (res.code) {
              resolve(res.code);
              return;
            }

            reject(`登录失败！${res.errMsg}`);
          },
          fail: err => {
            console.log(err);
            reject(err);
          },
        });
      });
    },

    showWxMiniAuthModal() {
      this.setData({
        [`wxMiniAuthInfo.modalConfig.show`]: true,
      });
    },

    hideWxMiniAuthModal() {
      this.setData({
        [`wxMiniAuthInfo.modalConfig.show`]: false,
      });
    },

    async wxMiniAuth(params: login.WxMiniAuthRequestParams) {
      // const { avatarUrl, nickName, sex } = this.userInfo;
      // const jsCode = uni.getStorageSync('code');
      const wxMiniAuthRequestRes = await wxMiniAuthRequest(params);

      if (wxMiniAuthRequestRes.code !== 0) {
        const wxMiniAuthRequestErrorModalRes = await wx.showModal({
          content: wxMiniAuthRequestRes.msg,
          showCancel: false,
        });

        console.log(wxMiniAuthRequestErrorModalRes);
      }

      console.log(wxMiniAuthRequestRes);
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
    },
  },
});
