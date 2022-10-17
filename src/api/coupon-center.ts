import type { couponCenter } from '@/typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 优惠券--查询广告轮播图--必传:运营体系ID
export const queryAdvertFrontRequest = async () => request<couponCenter.QueryAdvertFrontRequestRes>(`${baseUrl}/emp-base/center/queryAdvertFront`);

// 优惠券--查询领券中心可领取优惠券列表
export const queryReceiveCenterListFrontRequest = async (data: couponCenter.QueryReceiveCenterListFrontRequestParams) => request<couponCenter.QueryReceiveCenterListFrontRequestRes>(
  `${baseUrl}/emp-base/center/queryReceiveCenterListFront`,
  data
);
