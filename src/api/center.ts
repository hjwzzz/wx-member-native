import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 微会员个人中心接口
export const memberCentertIndex = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/memberCentertIndex`;
  const res = await request(url, data);
  return res;
};
// queryGrowthCount, queryMemberGrowthHistoryPage
// 获取广告图
export const getIndexAdBannerList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/wxmeberFront/getIndexAdBannerList`;
  const res = await request(url, data);
  return res;
};

// // 根据会员ID查询成长值相关信息
// export const queryGrowthCount = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/member/memberGrowthHistory/Front/queryGrowthCount`;
//   const res = await request(url, data);
//   return res;
// };

// 分页查询会员成长值历史记录表
// export const queryMemberGrowthHistoryPage = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/member/memberGrowthHistory/Front/queryMemberGrowthHistoryPage`;
//   const res = await request(url, data);
//   return res;
// };

// 我的积分列表
export const queryPointList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/memAcctPointFront/usr/queryPointList`;
  const res = await request(url, data);
  return res;
};

// 我的积分明细
export const queryPointDetailPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/memAcctPointFront/usr/queryPointDetailPage`;
  const res = await request(url, data);
  return res;
};

// 我的储值列表
export const queryDepList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/memAcctDepFront/usr/queryDepList`;
  const res = await request(url, data);
  return res;
};
// 我的储值明细
export const queryDepDetailPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/memAcctDepFront/usr/queryDepDetailPage`;
  const res = await request(url, data);
  return res;
};
