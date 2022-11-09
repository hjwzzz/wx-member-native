import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 附近门店
export const getNearStore = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/operationDistributorFront/queryNearStoreFront`;
  return request(url, data);
};

// 获取附近门店详情信息
export const getStoreDetails = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/operationDistributorFront/getNearStoreDetailsFront`;
  return request(url, data);
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
