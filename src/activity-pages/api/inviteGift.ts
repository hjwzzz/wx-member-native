import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 查询邀请活动信息
export const getInviteActInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/getInviteActInfo`;
  return await request(url, data);
};
// 查询邀请动态达标记录
export const queryInviteTargetRecordPage = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/queryInviteTargetRecordPage`;
  return await request(url, data);
};
// 查询邀请明细
export const queryUserInviteActivityDetailPage = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/usr/queryUserInviteActivityDetailPage`;
  return await request(url, data);
};
// 查询邀请活动排名
export const queryInviteActivityJoinRecordRanking = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/queryInviteActivityJoinRecordRanking`;
  return await request(url, data);
};
// 查询活动推广路径
export const getQrcodeInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/usr/getQrcodeInfo`;
  return await request(url, data);
};
// 根据id获取邀请活动的海报
export const getInviteActPoster = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/getInviteActPoster`;
  return await request(url, data);
};
// 查询奖励明细
export const queryCommonUserActivityAwardList = async (data: any) => {
  const url = `${baseUrl}/emp-base/commonActivityFront/usr/queryCommonUserActivityAwardList`;
  return await request(url, data);
};
// 根据活动编号查询Id
export const getIdByNumber = async (data: any) => {
  const url = `${baseUrl}/emp-base/activity/inviteFront/getIdByNumber`;
  return await request(url, data);
};
