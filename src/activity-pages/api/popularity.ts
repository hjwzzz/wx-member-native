import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 查询活动信息
export const getActInfo = async (data: any, isLoading = true) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/getActInfo`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 活动兑奖动态轮播
export const queryTargetRecordList = async (data: any, isLoading = false) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/queryPopularityTargetRecordPage`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 查询兑换奖励表单信息
export const getChgAwardInfo = async (data: any, isLoading = false) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/getChgAwardInfo`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 排行榜
export const queryPopularityActivityJoinRecordRanking = async (
  data: any,
  isLoading = false
) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/queryPopularityActivityJoinRecordRanking`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 查询助力好友
export const queryUserPopularityPage = async (data: any, isLoading = false) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/queryUserPopularityPage`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 兑换奖励
export const chgAward = async (data: any, isLoading = true) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/chgAward`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 根据id获取邀请活动的海报
export const getPopularityActPoster = async (data: any, isLoading = true) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/getPopularityActPoster`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 检查兑换奖励
export const checkChgAward = async (data: any, isLoading = true) => {
  const url = `${baseUrl}/emp-base/activity/popularityFront/checkChgAward`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};
