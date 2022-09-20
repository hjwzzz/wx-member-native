// app.ts

import Storage from "./utils/storage";
//   import { staticUrl } from "../../utils/config";
import { getEAppIdByWAppId, getWmColorTheme } from "./api/server";

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // setJqzAppId
    getEAppIdByWAppId(Storage.getWXAppId()).then((res: any) => {
      const { appId, epid } = res.data;
      Storage.setJqzAppId(appId);
      Storage.setEpid(epid);
    });

    getWmColorTheme("").then((res: any) => {
      Storage.setColorTheme(res.data);
      Storage.setMainColor(res.data.mainColor);
    });

    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

    // 登录
    // wx.login({
    //   success: (res) => {
    //     console.log(res.code);
    //     console.log(res.code);
    //     console.log(res.code);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // });
  },
});
