const appId = wx.getAccountInfoSync().miniProgram.appId;
class Storage {
  // appId
  static getWXAppId() {
    return appId;
  }
  // JqzAppId
  static setJqzAppId(value: string) {
    wx.setStorageSync('jqzAppid', value);
  }
  static getJqzAppId() {
    return wx.getStorageSync('jqzAppid');
  }
  static removeJqzAppId() {
    return wx.removeStorageSync('jqzAppid');
  }
  // mid
  static setMid(value: string) {
    wx.setStorageSync('mid', value);
  }
  static getMid() {
    return wx.getStorageSync('mid');
  }
  static removeMid() {
    return wx.removeStorageSync('mid');
  }

  // token
  static setToken(value: string) {
    wx.setStorageSync('token', value);
  }
  static getToken() {
    return wx.getStorageSync('token');
  }
  static removeToken() {
    return wx.removeStorageSync('token');
  }

  // epid
  static setEpid(value: string) {
    wx.setStorageSync('epid', value);
  }
  static getEpid() {
    return wx.getStorageSync('epid');
  }
  static removeEpid() {
    return wx.removeStorageSync('epid');
  }

  // pages
  static setPages(value: string) {
    wx.setStorageSync('pages', value);
  }
  static getPages() {
    return wx.getStorageSync('pages');
  }
  static removePages() {
    return wx.removeStorageSync('pages');
  }

  // colorTheme
  static setColorTheme(value: string) {
    wx.setStorageSync('colorTheme', value);
  }
  static getColorTheme() {
    return wx.getStorageSync('colorTheme');
  }

  // mainColor
  static setMainColor(value: string) {
    wx.setStorageSync('mainColor', value);
  }
  static getMainColor() {
    return wx.getStorageSync('mainColor');
  }
}
export default Storage;
