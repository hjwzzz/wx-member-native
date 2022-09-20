import Storage from '../utils/storage';
import { debounce } from '../utils/util';
import { baseUrl } from '../utils/config';

const BASEURL = `${baseUrl}/gshld-platform/enterprise/enterpriseApplicationParameter/getEAppIdByWAppId`;
// 网络错误的页面
// "/no-wifi/disabled-serve"
// "/no-wifi/index"

// 默认
const defaultParam = {
  cliVersion: '',
  sign: '',
  signType: '',
  source: '',
  timestamp: 0,
  version: '',
};

let requestCount = 0;
// 加载
const loading = debounce(function () {
  if (requestCount) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
  } else {
    wx.hideLoading();
  }
}, 200);
//

const getEpid = async () => {
  const [err, res]: any = await asyncRequest({
    method: 'POST',
    url: BASEURL,
    data: {
      appId: Storage.getJqzAppId() || '',
      param: Storage.getWXAppId(),
      ...defaultParam,
    },
  });
  if(err) {
    return '';
  }
  const { appId, appType, epid } = res?.data?.data ?? {};
  if (appId && appType && epid) {
    Storage.setJqzAppId(appId);
    Storage.setEpid(epid);
  }
  return epid;
};

const asyncRequest = (params:any) => new Promise((resolve, reject) => {
  const { header, method, url, data } = params;
  wx.request({
    url,
    header,
    method,
    data,
    success: res => {
      resolve([null, res]);
    },
    fail: err => {
      reject([err, null]);
    },
  });
});

// 请求
const request = async (
  url: any,
  args: any,
  method: any = 'POST',
  isLoading = true
) => {
  // console.log(url);
  // console.log(args);
  // console.log(method);
  // console.log(isLoading);
  // console.log(Storage.getJqzAppId());
  // 没有网络的情况
  wx.getNetworkType({
    success (res) {
      if (res.networkType === 'none') {
        wx.showLoading({
          title: '加载中',
          mask: true,
        });
        setTimeout(function () {
          wx.hideLoading();
          wx.navigateTo({ url: '/no-wifi/index' });
          return;
        }, 5000);
      }
    },
  });
  //
  if (isLoading) requestCount++;
  if (requestCount) {
    loading();
  }
  try {
    // console.log("error", 2222222);

    const [error, res]: any = await asyncRequest({
      header: {
        appId: Storage.getJqzAppId() || '',
        wxAppid: Storage.getWXAppId(),
        token: Storage.getToken,
        sessionKey: '',
        refreshToken: '',
        epid: Storage.getEpid() || getEpid(),
      },
      method,
      url,
      data: {
        appId: Storage.getJqzAppId() || '',
        param: args,
        ...defaultParam,
      },
    });
    // console.log("error", 2222222);
    // console.log('error',error);
    // console.log(res);
    // 加载提示完成处理
    if (isLoading) requestCount--;
    if (requestCount <= 0) {
      setTimeout(() => {
        wx.hideLoading();
      }, 300);
    }
    // 系统开小差处理
    if (res.statusCode === 500 || res?.data?.status === 500) {
      setTimeout(() => {
        wx.showToast({
          icon: 'none',
          title: '系统开小差了~~',
          duration: 3000,
        });
      }, 500);
      return;
    }
    // 服务过期处理
    if (res.data.code === 610) {
      wx.redirectTo({ url: '/no-wifi/disabled-serve' });
      return;
    }

    // 没有登录
    if (res.data.code === 401) {
      Storage.setMid('');
      // uni.setStorageSync( "pages",hisPages ? hisPages : historyPages[len - 1].$page.fullPath);
      // 保存当前的页面，然后登录在跳转
      const historyPages = getCurrentPages();
      Storage.setPages(historyPages[historyPages.length - 1].$page.fullPath);
      //  router.go(pages.login);  这里去登录
      return Promise.reject(res.data);
    }

    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
