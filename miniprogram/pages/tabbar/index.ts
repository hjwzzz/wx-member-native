// index.ts
// 获取应用实例

import Storage from '../../utils/storage';
import { staticUrl } from '../../utils/config';
import { wxmemberIndex, getIndexAdBannerList } from '../../api/index';
import { queryGoldPriceByPage } from '../../api/server';
// {{staticUrl}}img/noneStatus.png
Page({
  data: {
    staticUrl: staticUrl,
    mainColor: Storage.getMainColor(),
    bannerList: [],
    swiperVav: [],
    swiperVavHeight: 196,
    dataList: {
      bannerList: [],
      wmMainRspVo: {
        param: {
          topBgImageUrl: null,
        },
        panelList: [],
      },
    },
    adBannerList: [],
    goldPrice: [],
    todayGoldPriceShowed: '',
    ///
    // indicatorDots: true,
    // vertical: false,
    // autoplay: false,
    // interval: 2000,
    // duration: 500,
    // staticUrl,
    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false,
    // canIUseOpenData:
    //   wx.canIUse('open-data.type.userAvatarUrl') &&
    //   wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  // onLoad() {},
  onShow() {
    this.getTabBar().init();
    this.getPageDate();
    this.getAdBannerList();
    this.getGoldPriceByPage();
  },
  // 页面数据
  async getPageDate() {
    const result = await wxmemberIndex('');
    const bannerList = result.data?.bannerList || [];
    this.setData({
      bannerList: bannerList,
      dataList: result.data,
    });
    // console.log(result);
    wx.setNavigationBarTitle({
      // 设置顶部bar的标题
      title: result.data.wmMainRspVo?.param?.title,
    });

    this.getPanelList();
  },
  getPanelList() {
    const panelList = this.data.dataList.wmMainRspVo.panelList;
    const quickNav: any = panelList.filter((p: any) => p.kind === 'QUICK_NAV');
    const linkList = quickNav[0].param.linkList;
    const swiperVav: any = [];
    for (let i = 0; i < linkList.length; i += 8) {
      swiperVav.push(linkList.slice(i, i + 8));
    }
    if (swiperVav.length) {
      const len = swiperVav[0]?.length;
      const num = Number(String(len / 4).split('.')[0]) + 1 || 0;
      const height = (len % 4 === 0 ? len / 4 : num) * 196;
      this.setData({
        swiperVav,
        swiperVavHeight: height,
      });
    } else {
      this.setData({
        swiperVav,
      });
    }
  },
  // 获取广告
  async getAdBannerList() {
    const result = await getIndexAdBannerList('');
    const adBannerList = result?.data.map((item: any) => {
      return {
        image: item.imgUrl,
        title: item.title,
        url: item.url,
      };
    });
    this.setData({
      adBannerList: adBannerList,
    });
  },

  // 获取今日金价
  async getGoldPriceByPage() {
    const res = await queryGoldPriceByPage('WM_CENTER');
    if (res.code === 0 && res.data) {
      const { branPriceList, param, uiParam: todayGoldPriceShowed } = res.data;
      // this.uiParam = uiParam;
      const { showNum } = param;
      const result: unknown = [];

      branPriceList.map((item: unknown, index: number) => {
        if (index < showNum) {
          result.push(item);
        }
      });
      this.setData({
        todayGoldPriceShowed,
        goldPrice: result,
      });
      console.log('goldPrice', result);
    }
  },
  // // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({ url: '../logs/logs' });
  // },

  // getUserProfile() {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true,
  //       });
  //     },
  //   });
  // },
});
