import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 查询会员等级权益
export const getMemberLevelRights = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberLevelFront/getMemberLevelRights`;
  return request(url, data);
};

// 根据会员ID查询成长值相关信息
export const getGrowthCountFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberGrowthFront/getGrowthCountFront`;
  return request(url, data);
};

// 分页查询会员成长值历史记录表
export const queryMemberGrowthHistoryPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberGrowthFront/queryMemberGrowthHistoryPageFront`;
  return request(url, data);
};
