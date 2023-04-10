const appId = uni?.getAccountInfoSync?.()?.miniProgram?.appId;
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
  // opsid
  static setOpsId(value: string) {
    uni.setStorageSync('opsid', value);
  }
  static getOpsId() {
    return uni.getStorageSync('opsid');
  }
  static removeOpsId() {
    return uni.removeStorageSync('opsid');
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

  // bottomNavList
  static setBottomNavList(value: any[]) {
    uni.setStorageSync('bottomNavList', value);
  }
  static getBottomNavList() {
    return uni.getStorageSync('bottomNavList');
  }
  // 完善资料门店列表处理
  static setDistList(value: any[]) {
    uni.setStorageSync('distList', value);
  }
  static getDistList() {
    return uni.getStorageSync('distList');
  }
  static removeDistList() {
    return uni.removeStorageSync('distList');
  }
  // 欢迎语进入完善资料门店列表处理
  static setRegData(str: string) {
    uni.setStorageSync('welcomeGuide', str);
  }
  static getRegData() {
    return uni.getStorageSync('welcomeGuide');
  }
  static removeRegData() {
    return uni.removeStorageSync('welcomeGuide');
  }
}
export default Storage;
