// import type { wxmeberFront, member } from '@/typings/api';
import { baseUrl, devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
import { IPrivateFieldItem, IMemberEula } from '@/api/types/server';
// 微会员导航栏获取
export const getWeMemberNavFront = async () => {
  const url = `${devBaseUrl}/sysUiFront/getWeMemberNavFront`;
  return request(url, '');
};
// 获取主题色系
export const queryWmColorThemeFront = async () => request(`${devBaseUrl}/sysUiFront/queryWmColorThemeFront`, '');

// 获取质保单列表
export const queryWarrantyListPageFront = async (data: any) => {
  const url = `${devBaseUrl}/warranty/usr/queryWarrantyListPageFront`;
  return request(url, data);
};
// 获取企业LOGO
export const getLogo = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getLogo`;
  return request(url, data);
};

// 获取主题色系
// export const getWmColorTheme = async () => request(`${baseUrl}/emp-base/wxmeberFront/getWmColorTheme`, '');

// 微会员导航栏获取
// export const getWmmeberNavRequest = () => request(`${baseUrl}/emp-base/wxmeberFront/getWmmeberNav`, '');

// （已废弃）获取企业LOGO 合并到用户协议中
// export const getLogoRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getLogo`, '');

// // 获取用户协议
// export const getMemberEulaRequest = async () => request(`${baseUrl}/emp-base/member/login/Front/getMemberEula`, '');
// 获取用户协议
export const getMemberEulaRequest = () => request<IMemberEula>(`${devBaseUrl}/memberLoginFront/getMemberEula`, '');

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
// export const queryPolicyList = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/warranty/Front/list`;
//   return await request(url, data);
// };

//  会员权益
export const queryAllLevelRights = async (data: any) => {
  const url = `${baseUrl}/emp-base/memberLevelFront/usr/queryAllLevelRights`;
  const res = await request(url, data);
  return res;
};
// 完善资料
export const completeInfo = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/saveOrUpdateMemberInfo`, data);
// export const completeInfo = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/completeInfo`;
//   const res = await request(url, data);
//   return res;
// };

// 查询个人资料设置
// export const queryPrivateFieldSetting = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/queryPrivateFieldSetting`;
//   const res = await request(url, data);
//   return res;
// };
export const queryPrivateFieldSetting = (data: any) => request<IPrivateFieldItem[]>(
  `${devBaseUrl}/usr/memberInfoFront/queryPrivateFieldSetting`,
  data
);
// 修改会员个人资料
export const updateMemberInfo = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/updateMemberInfo`, data);
// export const updateMemberInfo = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/updateMemberInfo`;
//   const res = await request(url, data);
//   return res;
// };
// 小程序退出登录
export const logout = () => request(`${devBaseUrl}/usr/memberInfoFront/logout`, '');

// 获取会员个人资料
// export const getMemberInfo = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/getMemberInfo`;
//   const res = await request(url, data);
//   return res;
// };
export const getMemberInfo = async (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/getMemberInfo`, data);
// 修改手机号码-发送验证码
export const updatePhoneSendCode = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/sendCodeForUpdatePhone`, data);
// export const updatePhoneSendCode = async (data: any) => {
//   const url = `${baseUrl}/emp-base/member/login/Front/updatePhoneSendCode`;
//   const res = await request(url, data);
//   return res;
// };
// 修改手机号码-验证
export const updatePhoneVerify = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/verifyOldPhone`, data);
// export const updatePhoneVerify = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/updatePhoneVerify`;
//   const res = await request(url, data);
//   return res;
// };
// 手机登录/注册-验证
export const updatePhone = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/updatePhone`, data);
// export const updatePhone = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/updatePhone`;
//   const res = await request(url, data);
//   return res;
// };
// 查询注册管理设置
// export const queryRegistRequiredSetting = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/queryRegistRequiredSetting`;
//   const res = await request(url, data);
//   return res;
// };

// 公共枚举查询类
export const query = async (data: any) => {
  const url = `${baseUrl}/emp-base/common/select/query`;
  const res = await request(url, data);
  return res;
};

// 职业下拉选择查询(根据分类)
export const queryProfessionAsCate = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/queryProfessionAsCate`, data);

// 查询注册管理设置(新)
export const queryRegistRequiredSettingNew = (data: any) => request(`${devBaseUrl}/usr/memberInfoFront/getRegisterRequiredSetting`, data);
// export const queryRegistRequiredSettingNew = async (data: any) => {
//   const url = `${baseUrl}/emp-base/usr/member/info/Front/queryRegistRequiredSettingNew`;
//   const res = await request(url, data);
//   return res;
// };

// 更新头像昵称信息
export const updateMemberBaseInfo = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberInfoFront/updateMemberBaseInfo`;
  const res = await request(url, data);
  return res;
};

// 查询附近门店
export const queryNearStore = async (data: any) => {
  const url = `${baseUrl}/emp-base/MemberDistributorFront/queryNearStore`;
  const res = await request(url, data);
  return res;
};

// 小程序授权信息
export const getWxMiniInfo = async (data: any) => {
  const url = `${baseUrl}/emp-base/member/login/Front/getWxMiniInfo`;
  const res = await request(url, data);
  return res;
};
