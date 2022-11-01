// import type { wxmeberFront, member } from '@/typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 获取主题色系
export const getWmColorTheme = async () => request(`${baseUrl}/emp-base/wxmeberFront/getWmColorTheme`, '');

// 微会员导航栏获取
export const getWmmeberNavRequest = () => request(`${baseUrl}/emp-base/wxmeberFront/getWmmeberNav`, '');

// 获取企业LOGO
export const getLogoRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getLogo`, '');

// 获取用户协议
export const getMemberEulaRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getMemberEula`, '');

// 根据页面类型获取今日金价(首页:WM_HOME,个人中心:WM_CENTER)
export const queryGoldPriceByPage = async (data: any) => {
  const url = `${baseUrl}/emp-base/priceFront/usr/queryGoldPriceByPage`;
  return await request(url, data);
};

// 根据订单id获取提交支付订单信息
export const getPayOrder = async (data: any) => {
  const url = `${baseUrl}/points-mall/orderFront/usr/getPayOrder`;
  const res = await request(url, data);
  return res;
};

// 获取质保单列表
export const queryPolicyList = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/list`;
  return await request(url, data);
};

//  会员权益
export const queryAllLevelRights = async (data: any) => {
  const url = `${baseUrl}/emp-base/memberLevelFront/usr/queryAllLevelRights`;
  const res = await request(url, data);
  return res;
};
// 完善资料
export const completeInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/completeInfo`;
  const res = await request(url, data);
  return res;
};

// 查询个人资料设置
export const queryPrivateFieldSetting = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/queryPrivateFieldSetting`;
  const res = await request(url, data);
  return res;
};
// 修改会员个人资料
export const updateMemberInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/updateMemberInfo`;
  const res = await request(url, data);
  return res;
};

// 获取会员个人资料
export const getMemberInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/getMemberInfo`;
  const res = await request(url, data);
  return res;
};
// 查询注册管理设置
export const queryRegistRequiredSetting = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/queryRegistRequiredSetting`;
  const res = await request(url, data);
  return res;
};

// 职业下拉选择查询(根据分类)
export const queryProfessionAsCate = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/queryProfessionAsCate`;
  const res = await request(url, data);
  return res;
};

// 根据分销商ID获取对应导购列表
export const getSalerByDistId = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/getSalerByDistId`;
  const res = await request(url, data);
  return res;
};
// 查询注册管理设置(新)
export const queryRegistRequiredSettingNew = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/queryRegistRequiredSettingNew`;
  const res = await request(url, data);
  return res;
};

// 更新头像昵称信息
export const updateMemberBaseInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/member/info/Front/updateMemberBaseInfo`;
  const res = await request(url, data);
  return res;
};
