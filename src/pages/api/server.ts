import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 微会员导航栏获取
export const getWeMemberNavFront = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getWeMemberNavFront`;
  return request(url, data);
};
