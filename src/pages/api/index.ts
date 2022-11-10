import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 获取微会员首页
export const getWmIndex = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getWmIndex`;
  return request(url, data);
};

// 获取首页广告图
export const queryHomBannerListFront = async (data: any) => {
  const url = `${devBaseUrl}/memberAdvertFront/queryHomBannerListFront`;
  return request(url, data);
};

// 查询弹窗设置
export const queryPopup = async (data: any) => {
  const url = `${devBaseUrl}/memberAdvertFront/queryPopup`;
  return request(url, data);
};
