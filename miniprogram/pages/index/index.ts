// index.ts
// 获取应用实例

// import Storage from "../../utils/storage";
import { staticUrl } from '../../utils/config';
// import { getEAppIdByWAppId } from "../../api/server";

// const { staticUrl }=getApp().require('/utils/config.js')
// const app = getApp<IAppOption>()

Page({
  data: {
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
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({ url: '../logs/logs' });
  },
  onLoad() {
    // console.log('staticUrl',staticUrl)
    // console.log('Storage1111111111',Storage.getJqzAppId())
    // console.log('ddd',ddd)
    if ('getUserProfile' in wx) {
      this.setData({ canIUseGetUserProfile: true });
    }

    // const dddd= ()=>{
    //   getEAppIdByWAppId(Storage.getWXAppId()).then((res:any)=>{
    //        console.log('getEAppIdByWAppId',res)
    //   })

    // }
    // dddd()
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
