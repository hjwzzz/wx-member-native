// import type { wxmeberFront, member } from '@/typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 获取主题色系
export const getWmColorTheme = async () => request(`${baseUrl}/emp-base/wxmeberFront/getWmColorTheme`, '');

// 微会员导航栏获取
export const getWmmeberNavRequest = () => request(`${baseUrl}/emp-base/wxmeberFront/getWmmeberNav`, '');

// 获取企业LOGO
export const getLogoRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getLogo`, '');

// 获取用户协议
export const getMemberEulaRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getMemberEula`, '');

// 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
export const queryGoldPriceByPage = async (data: any) => {
  const url = `${baseUrl}/emp-base/priceFront/usr/queryGoldPriceByPage`;
  return await request(url, data);
};

// 获取质保单列表
export const queryPolicyList = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/list`;
  return await request(url, data);
};

//  会员权益
export const queryAllLevelRights = async (data: any) => {
  const url = `${baseUrl}/emp-base/memberLevelFront/usr/queryAllLevelRights`;
  const res = await request(url, data);
  return res;
};
