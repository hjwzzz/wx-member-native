import { memberCentertIndex, getIndexAdBannerList } from '../../api/center';
import { queryGoldPriceByPage } from '../../api/server';

import { staticUrl } from '../../utils/config';
import Storage from '../../utils/storage';
Page({
  data: {
    checkHasLogined: Storage.getMid(),
    staticUrl: staticUrl,
    avatarUrl: '',
    nickName: '',
    curLevelName: '',
    loginList: [],
    panelList: [],
    bannerList: [],
    goldPrice: [],
    todayGoldPriceShowed: '',
    entryType: {
      BA: 'BANNER',
      EN: 'ENTRANCE',
      GO: 'GOLD_PRICE',
      MY: 'MY_AWARD',
      NO: 'NOTICE',
      QR: 'ORDER',
      QU: 'QUICK_NAV',
      RE: 'REC_GIFTS',
      REC: 'REC_GOODS',
      RES: 'RES_SVC',
      RI: 'RICH_TEXT',
      WA: 'WARRANTY',
    },
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/index/index',
    });
  },
  onShow() {
    this.getTabBar().init();
    this.getMemberCentertIndex();
    this.getBannerData();
    this.getGoldPriceByPage();
  },
  async getMemberCentertIndex() {
    const res = await memberCentertIndex('');

    if (res.code === 0 && res.data) {
      const { avatarUrl, nickName, wmCenterRspVo, curLevelName } = res.data;
      const loginList = wmCenterRspVo.param.quickNavList;
      const panelList = wmCenterRspVo.panelList;
      this.setData({
        avatarUrl,
        nickName,
        loginList,
        curLevelName,
        panelList,
      });
    }
  },
  // 获取广告
  async getBannerData() {
    const res = await getIndexAdBannerList('');
    if (res.code === 0 && res.data) {
      const result: any = [];
      res.data.map((item: any) => {
        // const obj = {
        //   image: item.imgUrl,
        //   title: '',
        //   h5Url: item.h5Url,
        //   miniUrl: item.miniUrl,
        // };
        result.push({
          image: item.imgUrl,
          title: '',
          h5Url: item.h5Url,
          miniUrl: item.miniUrl,
        });
      });

      this.setData({
        bannerList: result,
      });
      // console.log('result', result);
    }
  },
  // 获取今日金价
  async getGoldPriceByPage() {
    const res = await queryGoldPriceByPage('WM_CENTER');
    if (res.code === 0 && res.data) {
      const { branPriceList, param, uiParam: todayGoldPriceShowed } = res.data;
      // this.uiParam = uiParam;
      const { showNum } = param;
      const result: unknown = [];

      branPriceList.map((item: unknown, index: number) => {
        if (index < showNum) {
          result.push(item);
        }
      });
      this.setData({
        todayGoldPriceShowed,
        goldPrice: result,
      });
      console.log('goldPrice', result);
    }
  },
});
