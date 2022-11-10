import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 获取金价广告图   新接口
export const queryGoldPriceBannerListFront = async (data: any) => {
  const url = `${devBaseUrl}/memberAdvertFront/queryGoldPriceBannerListFront`;
  const res = await request(url, data);
  return res;
};

// 查询销售金价  新接口
export const getSaleMetalPrice = async (data: any) => {
  const url = `${devBaseUrl}/usr/metalPriceFront/getSaleMetalPrice`;
  const res = await request(url, data);
  return res;
};
