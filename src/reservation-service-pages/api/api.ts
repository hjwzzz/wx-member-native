import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 根据服务ID查询可预约门店信息
export { getServiceStore } from '@/pages/api/appointment-store';

// 查询附近门店
export const queryNearStoreFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/operationDistributorFront/queryNearStoreFront`;
  const res = await request(url, data);
  return res;
};

// 获取有图的评价数量，以及全部评价数量
export const getAppraiseCntFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/getAppraiseCntFront`;
  const res = await request(url, data);
  return res;
};

// 根据服务项目ID返回服务详情信息
export const getServiceDetailsFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/getServiceDetailsFront`;
  const res = await request(url, data);
  return res;
};

// 根据星数返回评价标签
export const queryAppraiseTagListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryAppraiseTagListFront`;
  const res = await request(url, data);
  return res;
};

// 根据服务ID以及日期范围获取各个日期的预约情况
export const queryBookingTimeCaseListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryBookingTimeCaseListFront`;
  const res = await request(url, data);
  return res;
};

// 获取取消原因
export const queryCancelReasonListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryCancelReasonListFront`;
  const res = await request(url, data);
  return res;
};

// 分页查询服务预约评价表
export const queryServiceBookCommentPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryServiceBookCommentPageFront`;
  const res = await request(url, data);
  return res;
};

// 分页查询我的预约信息列表
export const queryServiceBookPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryServiceBookPageFront`;
  const res = await request(url, data);
  return res;
};

// 分页查询预约设置服务项目列表
export const queryServicePageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/queryServicePageFront`;
  const res = await request(url, data);
  return res;
};

// 用户提交评价信息
export const saveAppraiseFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/saveAppraiseFront`;
  const res = await request(url, data);
  return res;
};

// 提交保存预约信息
export const saveBookingFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/saveBookingFront`;
  const res = await request(url, data);
  return res;
};

// 取消预约
export const updateCancelBookingFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/updateCancelBookingFront`;
  const res = await request(url, data);
  return res;
};

// 完成预约
export const updateFinishBookingFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/bookingServe/updateFinishBookingFront`;
  const res = await request(url, data);
  return res;
};
