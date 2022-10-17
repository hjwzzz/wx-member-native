/**
 * 账号类型
 * - POINT 积分
 * - DEPOSIT：储值
 */
export enum ACCOUNT_KIND {
  POINT = 'POINT',
  DEPOSIT = 'DEPOSIT',
}

/**
 * 链接类型
 * - NONE:无
 * - SYS:系统
 * - CUSTOMIZE:自定义
 */
export enum URL_KIND {
  NONE = 'NONE',
  SYS = 'SYS',
  CUSTOMIZE = 'CUSTOMIZE',
}

export interface GetWmmeberNavRequestResDataBottomNavListItem {
  accountKind: ACCOUNT_KIND;
  code: string;
  h5Url: string;
  icoUrl: string;
  miniUrl: string;
  relationId: string;
  title: string;
  urlKind: URL_KIND;
}

export type GetWmmeberNavRequestResLevitationNavListItem =
  GetWmmeberNavRequestResDataBottomNavListItem;

export interface GetWmmeberNavRequestRes {
  /**
   * 导航设置选项
   */
  bottomNavList: GetWmmeberNavRequestResDataBottomNavListItem[];
  /**
   * 悬浮导航项
   */
  levitationNavList: GetWmmeberNavRequestResLevitationNavListItem[];
}

export enum STYLE_TYPE {
  BLUE = 'BLUE',
  ORANGE = 'ORANGE',
  PINK = 'PINK',
  RED = 'RED',
  CUSTOMIZE = 'CUSTOMIZE',
}

/**
 * 获取主题色系
 */
export interface GetWmColorThemeRequestRes {
  /**
   * 主题辅色
   */
  complementaryColor: string;
  /**
   * 历史自定义主题辅色
   */
  historyCustomComplementaryColor: string;
  /**
   * 历史自定义主题主色
   */
  historyCustomMainColor: string;
  /**
   * 主题主色
   */
  mainColor: string;
  /**
   * 样式风格
   * - BLUE:蓝色主题
   * - ORANGE:橙色主题
   * - PINK:粉色主题
   * - RED:红色主题
   * - CUSTOMIZE:自定义主题
   */
  styleType: STYLE_TYPE;
}
