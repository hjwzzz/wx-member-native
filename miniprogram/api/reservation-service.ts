import { baseUrl } from '../utils/config';
import request from '../utils/request';

// C端查询我的预约信息列表
export const queryCBookServPage = async (data: unknown) => {
  const url = `${baseUrl}/emp-base/usr/bookservFront/queryCBookServPage`;
  const res = await request(url, data);
  return res;
};
