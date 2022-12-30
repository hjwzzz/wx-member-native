import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 微会员个人中心接口
export const getMemberCenterIndex = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getMemberCenterIndex`;
  return request(url, data);
};

// 获取会员中心广告图
export const queryMemberCenterBannerListFront = async (data: any) => {
  const url = `${devBaseUrl}/memberAdvertFront/queryMemberCenterBannerListFront`;
  return request(url, data);
};

export interface GetBarCodeRequestRes {
  barCode: string;
  number: string;
  polishing: string;
}

// 获取会员条形码
export const getBarCodeRequest = () => request<GetBarCodeRequestRes>(`${devBaseUrl}/usr/memberInfoFront/getBarCode`);


// 使会员条形码马上失效
export const sendKeyExpiredBarCodeRequest = (data: string) => request(
  `${devBaseUrl}/usr/memberInfoFront/sendKeyExpiredBarCode`,
  data
);
