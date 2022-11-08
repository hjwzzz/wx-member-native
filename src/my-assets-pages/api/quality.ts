import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 根据ID获取电子质保单的访问URL
export const getMemberWarrantyUrlFront = async (data: unknown) => {
  const url = `${devBaseUrl}/warranty/usr/getMemberWarrantyUrlFront`;
  return request(url, data);
};
