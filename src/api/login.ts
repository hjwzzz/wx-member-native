import type { login } from '@/typings/api';
import { devBaseUrl } from '@/utils/config';
import request from '@/utils/request';

// 根据微信APPID获取EAPPID
export const jsCodeLoginRequest = (data: any) => request<login.JsCodeLoginRequestRes>(
  // `${baseUrl}/emp-base/member/login/Front/jsCodeLogin`,
  `${devBaseUrl}/memberLoginFront/loginInMiniApp`,
  data
);
// 小程序授权登录
export const wxMiniAuthRequest = (data: login.WxMiniAuthRequestParams) => request<login.WxMiniAuthRequestRes>(
  // `${baseUrl}/emp-base/member/login/Front/wxMiniAuth`,
  `${devBaseUrl}/memberLoginFront/loginInMiniAppAuth`,
  data
);
