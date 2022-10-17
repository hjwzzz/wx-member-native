import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 微会员个人中心接口
export const memberCentertIndex = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/memberCentertIndex`;
  const res = await request(url, data);
  return res;
};

// 获取广告图
export const getIndexAdBannerList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getIndexAdBannerList`;
  const res = await request(url, data);
  return res;
};