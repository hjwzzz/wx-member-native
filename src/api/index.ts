// import type { wxmeberFront, member } from '../typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

//
export const wxmemberIndex = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/wxmember/index`;
  const res = await request(url, data);
  return res;
};

// 获取广告图
export const getIndexAdBannerList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getIndexAdBannerList`;
  const res = await request(url, data);
  return res;
};

// 查询弹窗设置
export const queryPopup = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/queryPopup`;
  const res = await request(url, data);
  return res;
};
// 微会员弹窗广告图
export const getWmAlertAdBannerList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getWmAlertAdBannerList`;
  const res = await request(url, data);
  return res;
};
// // 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
// export const queryGoldPriceByPage = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/priceFront/usr/queryGoldPriceByPage`;
//   const res = await request(url, data);
//   return res;
// };
// 根据页面名字code获取对应配置信息
export const queryShareSett = async (data: any) => {
  const url = `${baseUrl}/emp-base/shareFront/queryShareSett`;
  const res = await request(url, data);
  return res;
};
