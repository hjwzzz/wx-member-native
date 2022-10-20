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

// 根据会员ID查询成长值相关信息
export const queryGrowthCount = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/member/memberGrowthHistory/Front/queryGrowthCount`;
  const res = await request(url, data);
  return res;
};

// 分页查询会员成长值历史记录表
export const queryMemberGrowthHistoryPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/member/memberGrowthHistory/Front/queryMemberGrowthHistoryPage`;
  const res = await request(url, data);
  return res;
};
