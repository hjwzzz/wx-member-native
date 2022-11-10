import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 根据分销商ID获取对应导购列表
export const getSalerByDistId = async (data: any) => {
  const url = `${devBaseUrl}/emp-base/usr/member/info/Front/getSalerByDistId`;
  const res = await request(url, data);
  return res;
};

// 根据服务ID查询可预约门店信息
export const getServiceStore = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryServiceStoreListFront`;
  const res = await request(url, data);
  return res;
};

// 根据分销商ID获取对应导购列表
export const getServiceShoppersList = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryShoppersListByDistIdFront`;
  const res = await request(url, data);
  return res;
};
