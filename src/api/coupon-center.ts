// import type { couponCenter } from '@/typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 优惠券--查询广告轮播图--必传:运营体系ID
export const queryAdvertFrontRequest = async () => request<couponCenter.QueryAdvertFrontRequestRes>(`${baseUrl}/emp-base/center/queryAdvertFront`);

// 优惠券--查询领券中心可领取优惠券列表
export const queryReceiveCenterListFrontRequest = async (data: couponCenter.QueryReceiveCenterListFrontRequestParams) => request<couponCenter.QueryReceiveCenterListFrontRequestRes>(
  `${baseUrl}/emp-base/center/queryReceiveCenterListFront`,
  data
);

// 优惠券--领取优惠券
export const getCouponsFront = async (data: any) => {
  const url = `${baseUrl}/emp-base/center/usr/getCouponsFront`;
  const res = await request(url, data);
  return res;
};
// 获取转赠优惠券
export const getUserCoupon = async (data: any) => {
  const url = `${baseUrl}/emp-base/memCoupon/usr/getCouponFront`;
  const res = await request(url, data);
  return res;
};

// 我的优惠券列表
export const queryMyCouponList = async (data: any) => {
  const url = `${baseUrl}/emp-base/memCoupon/usr/queryMyCouponListFront`;
  const res = await request(url, data);
  return res;
};

// 获取LOGO
export const getLogo = async (data: any) => {
  const url = `${baseUrl}/emp-base/member/login/Front/getLogo`;
  const res = await request(url, data);
  return res;
};
