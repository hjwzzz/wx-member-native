import { baseUrl } from '@/utils/config';
import request from '@/utils/request';
import type { DataList } from '@/api/types/my-prize';

// 我的奖品
export const queryFront = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/queryMemberPrizeList`;
  return request<DataList>(url, data);
};
// 兑换奖品 邮寄
export const queryDetail = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/getMemberPrizeDetail`;
  const res = await request(url, data);
  return res;
};
// 查看奖品状态 到店
export const queryStatus = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/queryMemberPrizeToStoreDetail`;
  const res = await request(url, data);
  return res;
};
// 查看奖品状态 邮寄

export const querySend = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/queryMemberPrizeSendDetail`;
  const res = await request(url, data);
  return res;
};
// 确认兑换奖品
export const updatePrizeStatus = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeStatus`;
  const res = await request(url, data);
  return res;
};

// 附近门店
export const updateNearStore = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberDistributorFront/queryNearStore`;
  const res = await request(url, data);
  return res;
};

// 获取附近门店详情信息
export const queryStoreDetails = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberDistributorFront/queryStoreDetails`;
  const res = await request(url, data);
  return res;
};

// 到店 确认领取
export const updateToStore = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeToStore`;
  const res = await request(url, data);
  return res;
};
// 邮寄 确认领取
export const updateReceiveSend = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/MemberPrizeFront/usr/updatePrizeSend`;
  const res = await request(url, data);
  return res;
};

// 查看状态

export const updateReceiveProgress = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/memberSchema/memberOperationSchema/queryScanAuthorizeProgress`;
  const res = await request(url, data);
  return res;
};
