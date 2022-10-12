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
      this.init();
    },
  },
  methods: {
    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      this.setActiveTab(`/${route}`);
    },
    onChange(items: WechatMiniprogram.CustomEvent<number>) {
      this.selectTabbarItem(this.data.bottomNavList[items.detail].miniUrl);
    },

    setActiveTab(selectUrl: string) {
      const active = this.data.bottomNavList.findIndex(
        ({ miniUrl }) => miniUrl === selectUrl
      );
      console.log('this.data.bottomNavList', this.data.bottomNavList);
      console.log('selectUrl', selectUrl);
      if (active === -1) {
        return;
      }
      console.log('active', active);
      this.setData({
        active,
      });
    },

    selectTabbarItem(url: string) {
      const isTab = switchTabUrl.includes(url);

      if (isTab) {
        this.setActiveTab(url);
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
