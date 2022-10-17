const appId = uni.getAccountInfoSync().miniProgram.appId;
class Storage {
  // appId
  static getWXAppId() {
    return appId;
  }
  // JqzAppId
  static setJqzAppId(value: string) {
    uni.setStorageSync('jqzAppid', value);
  }
  static getJqzAppId() {
    return uni.getStorageSync('jqzAppid');
  }
  static removeJqzAppId() {
    return uni.removeStorageSync('jqzAppid');
  }
  // mid
  static setMid(value: string) {
    uni.setStorageSync('mid', value);
  }
  static getMid() {
    return uni.getStorageSync('mid');
  }
  static removeMid() {
    return uni.removeStorageSync('mid');
  }

  // token
  static setToken(value: string) {
    uni.setStorageSync('token', value);
  }
  static getToken() {
    return uni.getStorageSync('token');
  }
  static removeToken() {
    return uni.removeStorageSync('token');
  }

  // epid
  static setEpid(value: string) {
    uni.setStorageSync('epid', value);
  }
  static getEpid() {
    return uni.getStorageSync('epid');
  }
  static removeEpid() {
    return uni.removeStorageSync('epid');
  }

  // pages
  static setPages(value: string) {
    uni.setStorageSync('pages', value);
  }
  static getPages() {
    return uni.getStorageSync('pages');
  }
  static removePages() {
    return uni.removeStorageSync('pages');
  }

  // colorTheme
  static setColorTheme(value: string) {
    uni.setStorageSync('colorTheme', value);
  }
  static getColorTheme() {
    return uni.getStorageSync('colorTheme');
  }

  // mainColor
  static setMainColor(value: string) {
    uni.setStorageSync('mainColor', value);
  }
  static getMainColor() {
    return uni.getStorageSync('mainColor');
  }
}
export default Storage;
