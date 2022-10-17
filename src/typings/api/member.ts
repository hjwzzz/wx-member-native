export type GetLogoRes = string;

export enum EULAS_KIND {

  /**
   * 注册协议
   */
  REG = 'REG',

  /**
   * 隐私协议
   */
  PRIV = 'PRIV',
}

export interface GetMemberEulaRequestResEulasItem {
  content: string;
  id: string;
  kind: EULAS_KIND;
  remark: string;
  scmId: string;
  title: string;
}

export interface GetMemberEulaRequestRes {

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 创建人名称
   */
  createUser: string;
  eulas: GetMemberEulaRequestResEulasItem[];

  /**
   * 页面LOGO
   */
  logo: string;

  /**
   * 隐私协议是否展示
   */
  privacyAgreementShowed: boolean;

  /**
   * 用户协议是否展示
   */
  regAgreementShowed: boolean;

  /**
   * 修改时间
   */
  updateTime: string;

  /**
   * 修改人名称
   */
  updateUser: string;
}
