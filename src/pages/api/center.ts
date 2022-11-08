import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 微会员个人中心接口
export const getMemberCenterIndex = async (data: any) => {
  const url = `${devBaseUrl}/sysUiFront/getMemberCenterIndex`;
  return request(url, data);
};
