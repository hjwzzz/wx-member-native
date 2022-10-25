import { baseUrl } from '@/utils/config';
import request from '@/utils/request';

// 获取质保单列表
export const warrantyList = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/list`;
  const res = await request(url, data);
  return res;
};

// 质保单明细
export const warrantyDetail = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/detail`;
  const res = await request(url, data);
  return res;
};

// 质保单签名
export const warrantySign = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/sign`;
  const res = await request(url, data);
  return res;
};
// 根据ID获取企业应用
export const getEnterpriseApplicationById = async (data: any) => {
  const url = `${baseUrl}/gshld-platform/enterprise/enterpriseApplication/getEnterpriseApplicationById`;
  const res = await request(url, data);
  return res;
};

// 根据ID获取电子质保单的访问URL
export const getMemberWarrantyUrl = async (data: any) => {
  const url = `${baseUrl}/emp-base/usr/warranty/Front/getMemberWarrantyUrl`;
  const res = await request(url, data);
  return res;
};
