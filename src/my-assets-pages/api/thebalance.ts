import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

//  我的储值列表 新接口
export const queryDepositListFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberAcctDepFront/queryDepositListFront`;
  const res = await request(url, data);
  return res;
};

//  我的储值明细汇总 新接口
export const getDepositHistoryTotalFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberAcctDepFront/getDepositHistoryTotalFront`;
  const res = await request(url, data);
  return res;
};

//  我的储值明细 新接口
export const queryDepositHistoryPageFront = async (data: any) => {
  const url = `${devBaseUrl}/usr/memberAcctDepFront/queryDepositHistoryPageFront`;
  const res = await request(url, data);
  return res;
};
