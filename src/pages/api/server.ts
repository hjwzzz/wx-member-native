import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 微会员导航栏获取
export const getWeMemberNavFront = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getWeMemberNavFront`;
  return request(url, data);
};

// 微会员导航栏获取
export const queryWeMemberAlertBannerListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberAdvertFront/queryWeMemberAlertBannerListFront`;
  return request(url, data);
};

// 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
export const getGoldPriceByPage = async (data: any) => {
  const url = `${devBaseUrl}/usr/metalPriceFront/getGoldPriceByPage`;
  return request(url, data);
};
