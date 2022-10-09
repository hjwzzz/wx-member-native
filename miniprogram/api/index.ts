// // 首页
// export const wxmemberIndex = async (data) => {
//   const url = `${http}/emp-base/wxmeberFront/wxmember/index`;
//   const res = await request(url, data);
//   return res;
// };

// import type { wxmeberFront, member } from '../typings/api';
import { baseUrl } from '../utils/config';
import request from '../utils/request';

// 根据微信APPID获取EAPPID
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
