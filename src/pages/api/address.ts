import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';
// 查询会员收货地址表
export const getAdressList = async (data: any) => {
  const url = `${devBaseUrl}/usr/addressFront/queryAddressListFront`;
  return request(url, data);
};

// 新增地址
export const addAddress = async (data: any) => {
  const url = `${devBaseUrl}/usr/addressFront/saveAddressFront`;
  return request(url, data);
};
//  删除地址
export const deleteAddress = async (data: any) => {
  const url = `${devBaseUrl}/usr/addressFront/deleteAddressFront`;
  return request(url, data);
};
//  修改地址
export const updateAddress = async (data: any) => {
  const url = `${devBaseUrl}/usr/addressFront/updateAddressFront`;
  return request(url, data);
};
