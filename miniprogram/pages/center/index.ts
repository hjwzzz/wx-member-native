import { memberCentertIndex } from '../../api/center';
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
  },
  login() {
    wx.navigateTo({
      url: '/pages/login/index/index',
    });
  },
  onShow() {
    this.getMemberCentertIndex();
  },
  async getMemberCentertIndex() {
    const res = await memberCentertIndex('');

    if (res.code === 0 && res.data) {
      const { avatarUrl, nickName, wmCenterRspVo, curLevelName } = res.data;
      const loginList = wmCenterRspVo.param.quickNavList;
      this.setData({
        avatarUrl,
        nickName,
        loginList,
        curLevelName,
      });
    }
  },
});
