import { baseUrl } from '@/utils/config';
import request from '@/utils/request';
// 会员签到
export const addMemberSignActivity = async (data: any) => {
  const url = `${baseUrl}/emp-base/signActivityFront/usr/addMemberSignActivity`;
  const res = await request(url, data);
  return res;
};
// 获取用户签到页面数据
export const getUserSignActivityById = async (data: any) => {
  const url = `${baseUrl}/emp-base/signActivityFront/usr/getUserSignActivityById`;
  const res = await request(url, data);
  return res;
};
// 设置会员签到通知设置
export const udpateUserNoticed = async (data: any) => {
  const url = `${baseUrl}/emp-base/signActivityFront/usr/udpateUserNoticed`;
  const res = await request(url, data);
  return res;
};
// 根据URL获取jsapi签名
export const getJsapiSign = async (data: any) => {
  const url = `${baseUrl}/emp-base/wxSignFront/getJsapiSign`;
  const res = await request(url, data);
  return res;
};
