// / <reference path="./../../typings/index.d.ts" />

import Storage from '@/utils/storage';
import Router from '@/utils/router';
import { debounce } from '@/utils/util';
import { baseUrl } from '@/utils/config';
// import { BaseRequestRes } from './request.type';

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

// 加载
let requestCount = 0;
const loading = debounce(() => {
  if (requestCount) {
    uni.showLoading({
      title: '加载中',
      mask: true,
    });
  } else {
    uni.hideLoading();
  }
}, 200);
//

// 等待有epid阻塞请求
let waitGetEpidIndex = 0;
const waitGetEpid = () => new Promise(resolve => {
  const time = setInterval(() => {
    const epid = Storage.getEpid();
    if (epid) {
      clearInterval(time);
      resolve(epid);
    }
  }, 500);
});

// 获取epid
const getEpid = async () => {
  // 第一次请求获取epid
  if (waitGetEpidIndex === 0) {
    waitGetEpidIndex += 1;
    const [err, res] = await asyncRequest({
      method: 'POST',
      url: BASEURL,
      data: {
        appId: Storage.getJqzAppId() || '',
        param: Storage.getWXAppId(),
        ...defaultParam,
      },
    });
    if (err) {
      return '';
    }
    const { appId, appType, epid } = res.data.data;
    if (appId && appType && epid) {
      Storage.setJqzAppId(appId);
      Storage.setEpid(epid);
    }
    return epid;
  }
  // 如果epid还没回来-请求就等待
  if (waitGetEpidIndex > 0) {
    const epid = await waitGetEpid();
    return epid;
  }
};

// 基础request封装Promise
const asyncRequest = (params: any) => new Promise<[null, any]>((resolve, reject) => {
  const { header, method, url, data } = params;
  uni.request({
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
  args: any = '',
  method: any = 'POST',
  isLoading = true
) => {
  // 没有网络的情况
  uni.getNetworkType({
    success(res) {
      if (res.networkType === 'none') {
        uni.showLoading({
          title: '加载中',
          mask: true,
        });
        setTimeout(function () {
          uni.hideLoading();
          uni.navigateTo({ url: '/my-assets-pages/no-wifi/index' });
          return;
        }, 5000);
      }
    },
  });
  //  是否添加-加载提示
  if (isLoading) requestCount++;
  if (requestCount) {
    loading();
  }

  // 开始请求
  try {
    // 接口必须epid
    const epid = Storage.getEpid() ? Storage.getEpid() : await getEpid();
    // 开始asyncRequest请求
    const [error, res] = await asyncRequest({
      header: {
        appId: Storage.getJqzAppId() || '',
        wxAppid: Storage.getWXAppId(),
        token:
          Storage.getToken() ||
          'emp:wx:login:tk:20BDD6F1-794B-C1CC-3E55-07FCC9D4590D:fdedb34b-996a-4ac3-8bd5-58c850c01a77',
        sessionKey: '',
        refreshToken: '',
        epid,
      },
      method,
      url,
      data: {
        appId: Storage.getJqzAppId() || '',
        param: args,
        ...defaultParam,
      },
    });
    // console.log('res', res);
    // 加载提示完成处理
    if (isLoading) requestCount--;
    if (requestCount <= 0) {
      setTimeout(() => {
        uni.hideLoading();
      }, 300);
    }

    // 系统开小差处理
    if (res.statusCode === 500 || res.data.status === 500) {
      setTimeout(() => {
        uni.showToast({
          icon: 'none',
          title: '系统开小差了!',
          duration: 3000,
        });
      }, 500);
      return Promise.resolve(res.data);
    }
    // 服务过期处理
    if (res.data.code === 610) {
      uni.redirectTo({ url: '/my-assets-pages/no-wifi/invalid-serve' });
      return Promise.resolve(res.data);
    }

    // 没有登录
    if (res.data.code === 401) {
      Storage.setMid('');
      Router.goLogin();
      return Promise.reject(res.data);
    }
    // 请求错误
    if (error) {
      return Promise.reject(error);
    }
    // 默认返回值
    return Promise.resolve(res.data);
    // 请求发生错误
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
