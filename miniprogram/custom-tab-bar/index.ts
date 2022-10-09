import Storage from './../utils/storage';
import { getWmmeberNavRequest, getWmColorTheme } from '../api/server';
import {
  CustomTabBarComponentData,
  CustomTabBarComponentProperty,
  CustomTabBarComponentMethod,
} from './index.type';
import commonPage from './../component/common-page/index';

const switchTabUrl = ['/pages/tabbar/index', '/pages/center/index'];

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

      // const pages = getCurrentPages();
      // const currentPage = pages.at(-1);
      // if (!currentPage?.route) {
      //   return;
      // }

      // this.selectTabbarItem(`/${currentPage.route}`);
    },
  },
  methods: {
    onChange(items) {
      this.selectTabbarItem(this.data.bottomNavList[items.detail].miniUrl);
    },

    selectTabbarItem(selectUrl) {
      const active = this.data.bottomNavList.findIndex(
        ({ miniUrl }) => miniUrl === selectUrl
      );

      if (active === -1) {
        return;
      }

      this.setData({
        active,
      });

      const url = this.data.bottomNavList[active].miniUrl;

      const isTab = switchTabUrl.includes(url);

      if (isTab) {
        wx.switchTab({
          url,
        });
      } else {
        wx.navigateTo({
          url,
        });
      }
    },
  },
});
