import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
import type { IPageInfo } from '@/my-assets-pages/api/types/my-prize';

// 我的奖品
export const getPrizeList = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/queryMemberPrizePageFront`;
  return request<IPageInfo>(url, data);
};

// 获取会员奖品单条基本信息ById
export const getPrizeDetail = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/getMemberPrizeDetailFront`;
  return request(url, data);
};

// 查看奖品状态 到店
export const getPrizeInfoToStore = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/getMemberPrizeToStoreDetailFront`;
  return request(url, data);
};

// 查看奖品状态 邮寄querySend
export const getPrizeInfoSend = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/getMemberPrizeSendDetailFront`;
  return request(url, data);
};
// 兑换奖品
export const exchangePrize = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/updatePrizeExchangeFront`;
  return request(url, data);
};

// 附近门店
export const getNearStore = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/operationDistributorFront/queryNearStoreFront`;
  return request(url, data);
};

// 获取附近门店详情信息
export const queryStoreDetails = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/operationDistributorFront/queryNearStoreFront`;
  return request(url, data);
};

// 到店 确认领取
export const updateToStore = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/updatePrizeToStoreFront`;
  return request(url, data);
};
// 邮寄 确认领取
export const updateReceiveSend = async (data: unknown) => {
  const url = `${devBaseUrl}/usr/memberPrizeFront/updatePrizeSendFront`;
  return request(url, data);
};

// // 查看状态// // 注册有礼

// export const updateReceiveProgress = async (data: unknown) => {
//   const url = `${devBaseUrl}/emp-base/memberSchema/memberOperationSchema/queryScanAuthorizeProgress`;
//   return request(url, data);
// };
