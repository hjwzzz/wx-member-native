import { useBasicsData } from '@/store/basicsData';
import Storage from '@/utils/storage';
// 配置需要登录才能进入的页面
const configRouterAuth = [
  'point',
  'my_prize',
  'userInfo',
  'point_mall',
  'point_mall_order',
  'point_mall_commodity',
  'point_mall_index',
  'sign',
  'reservation',
  'gold_price',
  'warranty',
  'warranty_list',
];
// 配置switchTab切换页面
const switchTabUrl = ['/pages/tabbar/index', '/pages/center/index'];

// 配置page的code代码
const pageCode: any = {
  warranty_details: '/my-assets-pages/quality/custom', // 质保单详情
  warranty: '/my-assets-pages/quality/index', // 质保单
  warranty_list: '/my-assets-pages/quality/index', // 质保单列表
  point_mall: '/my-assets-pages/point-mall/index', // 积分商城
  point_mall_order: '/my-assets-pages/point-mall/index', // 订单(积分)
  point_mall_commodity: '/my-assets-pages/point-mall/index', // 商品(积分)
  point_mall_index: '/my-assets-pages/point-mall/index', // 首页(积分)
  reg: '/pages/login/index', // 注册登录
  invite_courteous: '/activity-pages/invite-gift/index', // 邀请有礼
  my_prize: '/my-assets-pages/my-prize/index', // 	  我的奖品
  reservation: '/reservation-service-pages/reservation-service/index', // 预约服务
  point: '/my-assets-pages/integral/index', // 我的积分
  get_coupon: '/my-assets-pages/coupon-center/index', // 领券中心
  gold_price: '/my-assets-pages/gold-price/index', // 今日金价
  wm_center: '/pages/center/index', // 个人中心
  wm_index: '/pages/tabbar/index', //  首页
  sign: '/activity-pages/sign-in/index', // 签到
  balance: '/my-assets-pages/thebalance/index', // 我的余额
  coupon: '/my-assets-pages/my-coupon/index', // 我的优惠券
  coupon_detail: '/my-assets-pages/my-coupon/detail', // 优惠券详情
  nearby_store: '/pages/nearby-store/index', // 附近门店
  chooseStore: '/pages/appointment-store/store-list', // 门店选择
  chooseGuide: '/pages/appointment-store/guid-list', // 导购选择
  login: '/pages/login/index',
  userInfo: '/pages/center/user-info/index', // 个人资料
  installCenter: '/pages/center/account-set', // 账户设置
  addressList: '/pages/address/address-list', // 收货地址
  finishAddress: '/pages/login/finish-address', // 完善信息地址
  updatePhone: '/pages/center/user-info/update-phone', // 修改手机号
  cert: '/pages/center/user-info/cert', // 修改证件
  location: '/pages/center/user-info/address', // 修改地址
  activiy_prize: '/activity-pages/prize/index', // 活动-我的奖品
  popularity: '/activity-pages/popularity/index', // 活动-人气值千金
  my_reservation_detail: '/reservation-service-pages/myAppointment/index', // 我的预约服务
  reservation_detail: '/reservation-service-pages/myAppointment/detail', // 预约服务-详情
  member_equity: '/pages/member-equity/index', // 会员权益
};

const oldPage: {
  [key: string]: string;
} = {
  'pages/center/quality/custom': 'warranty_details', // 质保单详情
  // 'pages/login/index': 'reg', // 注册登录
  'pointsMallGages/tabber/index': 'point_mall', // 订单积分
  'pointsMallGages/productDetails/index': 'point_mall', // 积分商品详情
  // 'pointsMallGages/tabber/index': 'point_mall_commodity', // 商品积分
  // 'pointsMallGages/tabber/index': 'point_mall_index', // 首页(积分)
  // 'pointsMallGages/tabber/index': 'point_mall', // 积分商城
  'activity/inviteGift/index': 'invite_courteous', // 邀请有礼
  'pages/center/user-theprize/index': 'my_prize', // 我的奖品
  'reservationService/reservationService/index': 'reservation', // 预约服务
  'pages/center/quality/index': 'warranty', // 质保单列表
  'myAssets/integral/index': 'point', // 我的积分
  'pages/center/integral/index': 'point', // 我的积分
  'pages/center/coupon-center/index': 'get_coupon', // 领券中心
  'pages/center/gold-price/index': 'gold_price', // 今日金价
  // 'pages/center/index': 'wm_center', // 个人中心
  // 'pages/tabbar/index': 'wm_index', // 首页
  'signInGift/giftPage/index': 'sign', // 签到
  'myAssets/thebalance/index': 'balance', // 我的余额
  'pages/center/thebalance/index': 'balance', // 我的余额
  'pages/center/ticket/index': 'coupon', // 我的优惠券
  'pages/center/nearby-store/index': 'nearby_store', // 附近门店
  'activity/popularity/index': 'popularity', // 活动-人气值千金
  'reservationService/myAppointment/detail': 'reservation_detail', // 预约服务-详情
  'pages/center/member-benefits/index': 'member_equity', // 会员权益
};

// '/activity/inviteGift/index': 'invite_courteous', // 邀请有礼
// '/activity/popularity/index': 'popularity', // 活动-人气值千金
// '/signInGift/giftPage/index': 'sign', // 签到

const activityPage: {
  [key: string]: string;
} = {};

for (const [key, value] of Object.entries(oldPage)) {
  activityPage[`/${key}`] = value;
}

// 路由控制
class Router {
  static go(url: string): void {
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }
    uni.navigateTo({ url });
  }
  // 去登陆，跳转页面前判断时候，保存from 地址，登录完成后重定向
  // 当前页面登录 则直接重定向过去，避免未登录状态重新返回本页
  static goLogin(url = '', redirect = false) {
    const page: any = getCurrentPages()
      .pop();
    const route = page ? page.route.split('?')[0] : '';
    Storage.setPages(url || `/${route}`);
    if (redirect) {
      return uni.redirectTo({ url: pageCode.login });
    }
    if (url) {
      uni.navigateTo({ url: pageCode.login });
    } else {
      uni.redirectTo({ url: pageCode.login });
    }
  }
  // 从登录返回之前保存的页面
  static fromLoginBack(url = Storage.getPages()) {
    if (!url || url.includes('/pages/login/index')) {
      uni.navigateBack();
      return;
    }
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }
    uni.redirectTo({ url: decodeURIComponent(url) ?? url });
  }
  // 根据code来跳转页面
  static goCodePage(code: string, urlQueryParams: unknown = '', type = '') {
    // console.log('goCodePage', code);
    const initBasicsData = useBasicsData();
    let url = pageCode[code];
    if (!url) {
      return;
    }
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }
    // 处理页面参数
    if (urlQueryParams && typeof urlQueryParams === 'object') {
      urlQueryParams = `?${Object.entries(urlQueryParams)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')}`;
    } else if (typeof urlQueryParams === 'string') {
      urlQueryParams.startsWith('?') || (urlQueryParams = `?${urlQueryParams}`);
    }
    url += urlQueryParams;
    // console.log('url', url);

    // 如果没有登录，需要登录的页面-就去登录
    if (!initBasicsData.checkLogin && configRouterAuth.includes(code)) {
      return this.goLogin(url);
    }
    // 关闭所有页面，打开指定页面
    if (type === 'reLaunch') {
      return uni.reLaunch({ url });
    }
    if (type === 'redirectTo') {
      return uni.redirectTo({ url });
    }
    uni.navigateTo({ url });
  }
  static compatibilityOldPage(e: any) {
    Router.goCodePage(oldPage[e.path] ?? 'wm_index', e.query, 'reLaunch');
  }
  //

  static goNoCodePage(miniUrl: string) {
    const urlData = miniUrl.split('?');
    const route = urlData[0];
    // console.log('activityPage[route]', activityPage[route]);
    if (activityPage[route]) {
      let query = '';
      if (urlData.length > 1) {
        query = `?${urlData[1]}`;
      }
      Router.goCodePage(activityPage[route] ?? 'wm_index', query);
    } else {
      // console.log('111oldPage[route]', miniUrl);
      if (switchTabUrl.includes(miniUrl)) {
        uni.switchTab({ url: miniUrl });
        return;
      }
      uni.navigateTo({ url: miniUrl });
    }
  }
}
export default Router;
