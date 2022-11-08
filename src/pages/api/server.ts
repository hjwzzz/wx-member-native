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

// 获取金价广告图
export const queryGoldPriceBannerListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberAdvertFront/queryGoldPriceBannerListFront`;
  return request(url, data);
};
