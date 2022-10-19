import { baseUrl } from '@/utils/config';
import request from '@/utils/request';
// 查询地址列表
export const getAdressList = async (data: any) => {
  const url = `${baseUrl}/emp-base/addressFront/queryAddressPage`;
  const res = await request(url, data);
  return res;
};
// 新增地址
export const addAddress = async (data: any) => {
  const url = `${baseUrl}/emp-base/addressFront/addAddress`;
  const res = await request(url, data);
  return res;
};
//  删除地址
export const deleteAddress = async (data: any) => {
  const url = `${baseUrl}/emp-base/addressFront/deleteAddress`;
  const res = await request(url, data);
  return res;
};
//  修改地址
export const updateAddress = async (data: any) => {
  const url = `${baseUrl}/emp-base/addressFront/updateAddress`;
  const res = await request(url, data);
  return res;
};
