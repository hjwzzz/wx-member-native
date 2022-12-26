// import type { wxmeberFront, member } from '../typings/api';
import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 根据页面名字code获取对应配置信息   新接口
export const queryShareSett = async (data: any) => {
  const url = `${devBaseUrl}/share/queryShareSettFront`;
  const res = await request(url, data);
  return res;
};
// 根据类型、代码查询微信消息模板
export const getByKindAndCode = async (data: any) => {
  const url = `${devBaseUrl}/usr/messageTemplateFront/getByKindAndCodes`;
  const res = await request(url, data);
  return res;
};

// 代码查询微信消息模板是否开启
export const getOperationMessageEventByCode = async (data: any) => {
  const url = `${devBaseUrl}/usr/operationMessageEventFront/getOperationMessageEventByCode`;
  const res = await request(url, data);
  return res;
};

// 保存小程序订阅消息启用状态
export const saveMiniAppSubscribeMessageEnabled = async (data: any) => {
  const url = `${devBaseUrl}/usr/messageFront/saveMiniAppSubscribeMessageEnabled`;
  const res = await request(url, data);
  return res;
};
//
// 获取小程序订阅消息启用状态列表
export const queryMiniAppSubscribeMessageEnabled = async (data: any) => {
  const url = `${devBaseUrl}/usr/messageFront/queryMiniAppSubscribeMessageEnabled`;
  const res = await request(url, data);
  return res;
};
//
// export const wxmemberIndex = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/wxmeberFront/wxmember/index`;
//   const res = await request(url, data);
//   return res;
// };

// // 获取广告图
// export const getIndexAdBannerList = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/wxmeberFront/getIndexAdBannerList`;
//   const res = await request(url, data);
//   return res;
// };

// 查询弹窗设置
// export const queryPopup = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/wxmeberFront/queryPopup`;
//   const res = await request(url, data);
//   return res;
// };
// // 微会员弹窗广告图
// export const getWmAlertAdBannerList = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/wxmeberFront/getWmAlertAdBannerList`;
//   const res = await request(url, data);
//   return res;
// };
// // 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
// export const queryGoldPriceByPage = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/priceFront/usr/queryGoldPriceByPage`;
//   const res = await request(url, data);
//   return res;
// };
// // 根据页面名字code获取对应配置信息    /share/queryShareSettFront
// export const queryShareSett = async (data: any) => {
//   const url = `${baseUrl}/emp-base/shareFront/queryShareSett`;
//   const res = await request(url, data);
//   return res;
// };
