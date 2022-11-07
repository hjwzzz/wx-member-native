// import type { couponCenter } from '@/typings/api';
import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 优惠券--查询广告轮播图--必传:运营体系ID   新接口
export const queryAdvertFront = async (data: any) => {
  const url = `${devBaseUrl}/center/queryAdvertFront`;
  const res = await request(url, data);
  return res;
};

// 优惠券--查询广告轮播图--必传:运营体系ID   新接口
export const queryCouponCenterListFront = async (data: any) => {
  const url = `${devBaseUrl}/center/queryCouponCenterListFront`;
  const res = await request(url, data);
  return res;
};

// 优惠券--查询广告轮播图--必传:运营体系ID   新接口
export const getCouponsFront = async (data: any) => {
  const url = `${devBaseUrl}/center/usr/getCouponsFront`;
  const res = await request(url, data);
  return res;
};
// 我的优惠券列表   新接口
export const queryCouponPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberCouponFront/queryCouponPageFront`;
  const res = await request(url, data);
  return res;
};
// ///////center/queryCouponCenterListFront              /usr/memberCouponFront/queryCouponPageFront

// // 优惠券--查询广告轮播图--必传:运营体系ID
// export const queryAdvertFrontRequest = async () => request<couponCenter.QueryAdvertFrontRequestRes>(`${devBaseUrl}/emp-base/center/queryAdvertFront`);

// // 优惠券--查询领券中心可领取优惠券列表
// export const queryReceiveCenterListFrontRequest = async (data: couponCenter.QueryReceiveCenterListFrontRequestParams) => request<couponCenter.QueryReceiveCenterListFrontRequestRes>(
//   `${devBaseUrl}/emp-base/center/queryReceiveCenterListFront`,
//   data
// );

// // 优惠券--领取优惠券
// export const getCouponsFront = async (data: any) => {
//   const url = `${devBaseUrl}/emp-base/center/usr/getCouponsFront`;
//   const res = await request(url, data);
//   return res;
// };
// // 获取转赠优惠券
// export const getUserCoupon = async (data: any) => {
//   const url = `${devBaseUrl}/emp-base/memCoupon/usr/getCouponFront`;
//   const res = await request(url, data);
//   return res;
// };

// // 我的优惠券列表
// export const queryMyCouponList = async (data: any) => {
//   const url = `${devBaseUrl}/emp-base/memCoupon/usr/queryMyCouponListFront`;
//   const res = await request(url, data);
//   return res;
// };

// // 获取LOGO
// export const getLogo = async (data: any) => {
//   const url = `${devBaseUrl}/emp-base/member/login/Front/getLogo`;
//   const res = await request(url, data);
//   return res;
// };
