// import type { couponCenter } from '@/typings/api';
import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 优惠券--查询广告轮播图--必传:运营体系ID   新接口
export const queryAdvertFront = async (data: any) => {
  const url = `${devBaseUrl}/memberAdvertFront/queryCouponBannerListFront`;
  const res = await request(url, data);
  return res;
};

// 領券中心  新接口
export const queryCouponCenterListFront = async (data: any) => {
  const url = `${devBaseUrl}/coupon/center/queryCouponCenterListFront`;
  const res = await request(url, data);
  return res;
};

// 查询领券中心可领取优惠券详情  新接口
export const getCouponCenterDetailFront = async (data: any) => {
  const url = `${devBaseUrl}/coupon/center/getCouponCenterDetailFront`;
  const res = await request(url, data);
  return res;
};

// 优惠券--领取优惠券   新接口
export const getCouponsFront = async (data: any) => {
  const url = `${devBaseUrl}/coupon/center/usr/getCouponsFront`;
  const res = await request(url, data);
  return res;
};
// 我的优惠券列表   新接口
export const queryCouponPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberCouponFront/queryCouponPageFront`;
  const res = await request(url, data);
  return res;
};
// 获取转赠优惠券  新接口
export const getUserCoupon = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberCouponFront/getCouponFront`;
  const res = await request(url, data);
  return res;
};
