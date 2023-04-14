// import type { wxmeberFront, member } from '../typings/api';
import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 微会员-推荐商品
export const saveOrderPayRequest = async (data: {
  orderId: string
}) => {
  const url = `${baseUrl}/retail-mall/order/orderFront/saveOrderPay`;
  const res = await request(url, data);
  return res;
};
