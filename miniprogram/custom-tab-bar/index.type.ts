import type { wxmeberFront } from '../typings/api';

export type CustomTabBarComponentData = {
  list: unknown;
  bottomNavList: wxmeberFront.GetWmmeberNavRequestResDataBottomNavListItem[];
  active: number;
  actionColor?: wxmeberFront.STYLE_TYPE;
};

export type CustomTabBarComponentProperty = Record<string, never>;

export type CustomTabBarComponentMethod = {
  onChange: (item: WechatMiniprogram.CustomEvent<number>) => void;
  selectTabbarItem: (
    miniUrl: wxmeberFront.GetWmmeberNavRequestResDataBottomNavListItem['miniUrl']
  ) => void;
};
