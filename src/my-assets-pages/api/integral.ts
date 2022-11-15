import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

//  我的积分列表 新接口
export const queryPointListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memAccountPointFront/queryPointListFront`;
  const res = await request(url, data);
  return res;
};

//  我的积分明细 新接口
export const queryPointDetailPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memAccountPointFront/queryPointDetailPageFront`;
  const res = await request(url, data);
  return res;
};

//  我的积分明细汇总 新接口
export const getPointHistoryTotalFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memAccountPointFront/getPointHistoryTotalFront`;
  const res = await request(url, data);
  return res;
};
