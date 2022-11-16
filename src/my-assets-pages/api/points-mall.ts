import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 商品分享小程序码
export const getShareGoodsMiniCode = async (data: unknown) => {
  const url = `${baseUrl}/points-mall/spu/spuFront/getShareGoodsMiniCode`;
  const res = await request(url, data);
  return res;
};

// 商品详情
export const getSpuDetail = async (data: unknown) => {
  const url = `${baseUrl}/points-mall/spu/spuFront/getSpuDetail`;
  const res = await request(url, data);
  return res;
};
