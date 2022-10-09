// index.ts
// 获取应用实例

import Storage from '../../utils/storage';
import { staticUrl } from '../../utils/config';
import { wxmemberIndex, getIndexAdBannerList } from '../../api/index';

// const { staticUrl }=getApp().require('/utils/config.js')
// const app = getApp<IAppOption>()

Page({
  data: {
    mainColor: Storage.getMainColor(),
    bannerList: [],
    dataList: {
      bannerList: [],
      wmMainRspVo: {
        param: {
          topBgImageUrl: null,
        },
      },
    },
    adBannerList: [
      {
        image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东',
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
        title: '身无彩凤双飞翼，心有灵犀一点通',
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
      },
    ],
    ///
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    staticUrl,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse('open-data.type.userAvatarUrl') &&
      wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  onLoad() {
    this.getPageDate();
    this.getPageDate1();
  },
  // 页面数据
  async getPageDate() {
    const result = await wxmemberIndex('');
    const bannerList = result.data?.bannerList || [];
    this.setData({
      bannerList: bannerList,
      dataList: result.data,
    });
    console.log(result);

    wx.setNavigationBarTitle({
      // 设置顶部bar的标题
      title: result.data.wmMainRspVo?.param?.title,
    });
  },
  // 获取广告 getIndexAdBannerList;
  async getPageDate1() {
    const result = await getIndexAdBannerList('');
    //     const bannerList = result.data?.bannerList || [];

    // //      const res = await getIndexAdBannerList('');
    // this.adBannerList = res?.data.map(item => {
    //   return {
    //     image: item.imgUrl,
    //     title: item.title,
    //     url: item.url,
    //   };
    // });

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

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({ url: '../logs/logs' });
  },

  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
});
