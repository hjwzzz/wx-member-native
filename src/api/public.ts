import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 查询反馈类型
export const queryFeedbackType = async (data: any) => {
  const url = `${baseUrl}/emp-base/commonActivityFront/queryFeedbackType`;
  const res = await request(url, data);
  return res;
};

// 增加反馈
export const addFeedback = async (data: any) => {
  const url = `${baseUrl}/emp-base/commonActivityFront/usr/addFeedback`;
  const res = await request(url, data);
  return res;
};

// 增加分享
export const addShare = async (data: any, isLoading = false) => {
  const url = `${baseUrl}/emp-base/commonActivityFront/usr/addShare`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};

// 根据id获取关注公众号的二维码
export const getCommonActQrcode = async (data: any, isLoading = false) => {
  const url = `${baseUrl}/emp-base/commonActivityFront/getCommonActQrcode`;
  const res = await request(url, data, 'post', isLoading);
  return res;
};
