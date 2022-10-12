// import type { wxmeberFront, member } from '../typings/api';
import { baseUrl } from '../utils/config';
import request from '../utils/request';

// 微会员-推荐商品
export const queryMemberRecommend = async (data: unknown) => {
  const url = `${baseUrl}/points-mall/spu/spuFront/queryMemberRecommend`;
  const res = await request(url, data);
  return res;
};
