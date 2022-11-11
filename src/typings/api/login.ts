export enum SEX {
  'F' = 0,
  'M' = 1,
  'U' = 2,
}

export interface WxMiniAuthRequestParams {
  code: string;

  /** 头像 */
  avatarUrl?: string;

  /** getphonenumber 返回的 encryptedData */
  encryptedData: string;

  /** getphonenumber 返回的 iv */
  iv: string;

  /** wx.login 返回的 code */
  jsCode: string;

  /** 昵称 */
  nickName?: string;

  /** 手机号码 */
  phone?: string;

  /** 性别 */
  sex?: 'F' | 'M' | 'U';
}

export interface WxMiniAuthRequestRes {

  /** mid */
  mid: string;

  /** 手机号码 */
  phone: string;

  /** 登录token */
  token: string;

  /** wmid */
  wmid: string;
}

/** wx.login 返回的 code */
export type JsCodeLoginRequestParams = string;
export interface JsCodeLoginRequestRes {

  /** mid */
  mid: string;

  /** 手机号码 */
  phone: string;

  /** 登录token */
  token: string;

  /** wmid */
  wmid: string;
}
