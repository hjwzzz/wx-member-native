import Storage from './../utils/storage';
import { getWmmeberNavRequest, getWmColorTheme } from '../api/server';
import {
  CustomTabBarComponentData,
  CustomTabBarComponentProperty,
  CustomTabBarComponentMethod,
} from './index.type';
import commonPage from './../component/common-page/index';

Component<
  CustomTabBarComponentData,
  CustomTabBarComponentProperty,
  CustomTabBarComponentMethod
>({
  data: {
    list: [],
    bottomNavList: [],
    active: 0,
    actionColor: undefined,
  },
  behaviors: [commonPage],
  lifetimes: {
    async created() {
      const [getWmColorThemeRes, getWmmeberNavRequestRes] = await Promise.all([
        getWmColorTheme(),
        getWmmeberNavRequest(),
      ]);

      this.setData({
        bottomNavList: getWmmeberNavRequestRes.data.bottomNavList || [],
        actionColor: getWmColorThemeRes.data.styleType,
      });
      // Storage.setColorTheme(res.data);
      Storage.setMainColor(getWmColorThemeRes.data.mainColor);

      const pages = getCurrentPages();
      const currentPage = pages.at(-1);
      if (!currentPage?.route) {
        return;
      }

      this.selectTabbarItem(`/${currentPage.route}`);
    },
  },
  methods: {
    onChange(items) {
      this.selectTabbarItem(this.data.bottomNavList[items.detail].miniUrl);
    },

    selectTabbarItem(url) {
      const active = this.data.bottomNavList.findIndex(
        ({ miniUrl }) => miniUrl === url
      );

      if (active === -1) {
        return;
      }

      this.setData({
        active,
      });

      wx.switchTab({
        url: this.data.bottomNavList[active].miniUrl,
      });
    },
  },
});
