import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
import type { DataList } from '@/api/types/my-prize';

// 我的奖品
export const queryFront = async (data: unknown) => {
  const url = `${devBaseUrl}usr/memberPrizeFront/queryMemberPrizePageFront`;
  return request<DataList>(url, data);
};
// 兑换奖品 邮寄
export const queryDetail = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/getMemberPrizeDetail`;
  return request(url, data);
};
// 查看奖品状态 到店
export const queryStatus = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/queryMemberPrizeToStoreDetail`;
  return request(url, data);
};
// 查看奖品状态 邮寄

export const querySend = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/queryMemberPrizeSendDetail`;
  return request(url, data);
};
// 确认兑换奖品
export const updatePrizeStatus = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeStatus`;
  return request(url, data);
};

// 附近门店
export const updateNearStore = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberDistributorFront/queryNearStore`;
  return request(url, data);
};

// 获取附近门店详情信息
export const queryStoreDetails = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberDistributorFront/queryStoreDetails`;
  return request(url, data);
};

// 到店 确认领取
export const updateToStore = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeToStore`;
  return request(url, data);
};
// 邮寄 确认领取
export const updateReceiveSend = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeSend`;
  return request(url, data);
};

// 查看状态

export const updateReceiveProgress = async (data: unknown) => {
  const url = `${devBaseUrl}/emp-base/memberSchema/memberOperationSchema/queryScanAuthorizeProgress`;
  return request(url, data);
};
