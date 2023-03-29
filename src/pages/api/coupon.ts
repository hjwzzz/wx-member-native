import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 优惠券--领取优惠券   新接口
export const getCouponsFront = async (data: any) => {
  const url = `${devBaseUrl}/coupon/center/usr/getCouponsFront`;
  const res = await request(url, data);
  return res;
};
