import Storage from './../utils/storage';
import { getWmmeberNavRequest, getWmColorTheme } from '../api/server';
import { CustomTabBarComponentData } from './index.type';
import commonPage from './../component/common-page/index';

const switchTabUrl = ['/pages/tabbar/index', '/pages/center/index'];

Component({
  data: <CustomTabBarComponentData>{
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
      const currentPage = pages[pages.length - 1];
      if (!currentPage?.route) {
        return;
      }

      this.setActiveTab(`/${currentPage.route}`);
    },
  },
  methods: {
    onChange(items: WechatMiniprogram.CustomEvent<number>) {
      this.selectTabbarItem(this.data.bottomNavList[items.detail].miniUrl);
    },

    setActiveTab(selectUrl: string) {
      const active = this.data.bottomNavList.findIndex(
        ({ miniUrl }) => miniUrl === selectUrl
      );

      if (active === -1) {
        return;
      }

      this.setData({
        active,
      });
    },

    selectTabbarItem(url: string) {
      const isTab = switchTabUrl.includes(url);

      if (isTab) {
        console.log('22222', url);
        this.setActiveTab(url);
        if (url === '/pages/tabbar/index') {
          url = '/pages/index/index';
        }
        wx.switchTab({
          url,
        });
      } else {
        console.log('3333');
        wx.navigateTo({
          url,
        });
      }
    },
  },
});
