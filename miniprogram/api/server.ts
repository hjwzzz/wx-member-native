import { baseUrl } from '../utils/config';
import request from '../utils/request';

// 根据微信APPID获取EAPPID
export const getEAppIdByWAppId = async (data: any) => {
  const url = `${baseUrl}/gshld-platform/enterprise/enterpriseApplicationParameter/getEAppIdByWAppId`;
  const res = await request(url, data);
  return res;
};

// 获取主题色系
export const getWmColorTheme = async (data: any) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getWmColorTheme`;
  const res = await request(url, data);
  return res;
};

// 微会员导航栏获取
export const getWmmeberNav = async (data:any) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getWmmeberNav`;
  const res = await request(url, data);
  return res;
};
