import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 根据分销商ID获取对应导购列表
export const getSalerByDistId = (data: any) => request(
  `${devBaseUrl}/usr/operationDistributorInfoFront/querySalerListByDistIdFront`,
  data
);

// 根据服务ID查询可预约门店信息
export const getServiceStore = (data: any) => request(`${devBaseUrl}/usr/bookingServe/queryServiceStoreListFront`, data);

// 根据分销商ID获取对应导购列表
export const getServiceShoppersList = (data: any) => request(
  `${devBaseUrl}/usr/bookingServe/queryShoppersListByDistIdFront`,
  data
);
