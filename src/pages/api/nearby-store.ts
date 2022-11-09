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
