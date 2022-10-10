import type { wxmeberFront, member } from '../typings/api';
import { baseUrl } from '../utils/config';
import request from '../utils/request';

// 获取主题色系
export const getWmColorTheme = async () =>
  request<wxmeberFront.GetWmColorThemeRequestRes>(
    `${baseUrl}/emp-base/wxmeberFront/getWmColorTheme`,
    ''
  );

// 微会员导航栏获取
export const getWmmeberNavRequest = () =>
  request<wxmeberFront.GetWmmeberNavRequestRes>(
    `${baseUrl}/emp-base/wxmeberFront/getWmmeberNav`,
    ''
  );

// 获取企业LOGO
export const getLogoRequest = async () =>
  request<member.GetLogoRes>(
    `${baseUrl}/emp-base/member/login/Front/getLogo`,
    ''
  );

// 获取用户协议
export const getMemberEulaRequest = async () =>
  request<member.GetMemberEulaRequestRes>(
    `${baseUrl}/emp-base/member/login/Front/getMemberEula`,
    ''
  );
