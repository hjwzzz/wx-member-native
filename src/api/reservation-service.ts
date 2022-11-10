import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// // C端查询我的预约信息列表
// export const queryCBookServPage = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/usr/bookservFront/queryCBookServPage`;
//   const res = await request(url, data);
//   return res;
// };

// 分页查询预约设置服务项目列表
export const queryServicePage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryServicePage`;
  const res = await request(url, data);
  return res;
};

// // 查询附近门店a
// export const queryNearStore = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/usr/bookservFront/queryNearStore`;
//   const res = await request(url, data);
//   return res;
// };

// 根据服务项目ID返回服务详情信息
export const getServDetails = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/getServDetails`;
  const res = await request(url, data);
  return res;
};

// // 根据服务ID返回可预约门店信息
// export const queryDistStoreBySrvIdList = async (data: unknown) => {
//   const url = `${baseUrl}/emp-base/usr/bookservFront/queryDistStoreBySrvIdList`;
//   const res = await request(url, data);
//   return res;
// };

// 分页查询服务预约评价表
export const queryCBookCommentPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryCBookCommentPage`;
  const res = await request(url, data);
  return res;
};

// 分页查询服务预约评价表
export const getCmtCntAndCmtImgCnt = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/getCmtCntAndCmtImgCnt`;
  const res = await request(url, data);
  return res;
};

// 根据服务ID以及日期范围获取各个日期的预约情况
export const queryBookServTimeCaseList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryBookServTimeCaseList`;
  const res = await request(url, data);
  return res;
};

// 根据分销商ID获取对应导购列表
export const querySalerByDistIdList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/querySalerByDistIdList`;
  const res = await request(url, data);
  return res;
};

// C端查询我的预约信息列表
export const queryCBookServPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryCBookServPage`;
  const res = await request(url, data);
  return res;
};

// 立即预约
export const saveImmeBookServ = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/saveImmeBookServ`;
  const res = await request(url, data);
  return res;
};

// 取消预约
export const updateCancelBookServ = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/updateCancelBookServ`;
  const res = await request(url, data);
  return res;
};

// 获取取消原因
export const queryCancelReasonList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryCancelReasonList`;
  const res = await request(url, data);
  return res;
};

// 完成预约
export const updateFinishBookServ = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/updateFinishBookServ`;
  const res = await request(url, data);
  return res;
};

// 根据星数返回评价标签
export const queryCommTagList = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryCommTagList`;
  const res = await request(url, data);
  return res;
};

// 用户提交评价信息
export const saveSubmitComm = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/saveSubmitComm`;
  const res = await request(url, data);
  return res;
};
