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
];
// 配置switchTab切换页面
const switchTabUrl = [
  '/pages/tabbar/index',
  '/pages/center/index',
  '/pages/nearby-store/index',
];

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
  goldPrice: '/my-assets-pages/gold-price/index', // 今日金价
  activiy_prize: '/activity-pages/prize/index', // 活动-我的奖品
  popularity: '/activity-pages/popularity/index', // 活动-人气值千金
};

const oldPage: {
  [key: string]: string;
} = {
  'pages/center/quality/custom': 'warranty_details', // 质保单详情
  // 'pages/login/index': 'reg', // 注册登录
  'pointsMallGages/tabber/index': 'point_mall', // 订单积分
  // 'pointsMallGages/tabber/index': 'point_mall_commodity', // 商品积分
  // 'pointsMallGages/tabber/index': 'point_mall_index', // 首页(积分)
  // 'pointsMallGages/tabber/index': 'point_mall', // 积分商城
  'pages/center/invite-courteous/index': 'invite_courteous', // 邀请有礼
  'pages/center/user-theprize/index': 'my_prize', // 我的奖品
  'reservationService/reservationService/index': 'reservation', // 预约服务
  'pages/center/quality/index': 'warranty', // 质保单列表
  'pages/center/integral/index': 'point', // 我的积分
  'pages/center/coupon-center/index': 'get_coupon', // 领券中心
  'pages/center/gold-price/index': 'gold_price', // 今日金价
  // 'pages/center/index': 'wm_center', // 个人中心
  // 'pages/tabbar/index': 'wm_index', // 首页
  'signInGift/giftPage/index': 'sign', // 签到
  'pages/center/thebalance/index': 'balance', // 我的余额
  'pages/center/ticket/index': 'coupon', // 我的优惠券
  'pages/center/nearby-store/index': 'nearby_store', // 附近门店
};
// 路由控制
class Router {
  static go(url: string): void {
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }
    uni.navigateTo({ url });
  }
  // 去登录关闭所有页面
  static goLogin() {
    const page: any = getCurrentPages()
      .pop();
    const route = page ? page.route.split('?')[0] : '';
    Storage.setPages(`/${route}`);
    uni.reLaunch({ url: pageCode.login });
  }
  // 从登录返回之前保存的页面
  static fromLoginBack() {
    const url = Storage.getPages() || pageCode.wm_index;
    uni.reLaunch({ url });
  }
  // 根据code来跳转页面
  static goCodePage(code: string, urlQueryParams = '', type = '') {
    urlQueryParams.startsWith('?') || (urlQueryParams = `?${urlQueryParams}`);
    console.log('goCodePage', code);
    const initBasicsData = useBasicsData();
    const url = pageCode[code];
    if (!url) {
      return;
    }
    console.log('url', url + urlQueryParams);
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }

    // 如果没有登录，需要登录的页面-就去登录
    if (!initBasicsData.checkLogin && configRouterAuth.includes(code)) {
      return this.goLogin();
    }
    // 关闭所有页面，打开指定页面
    if (type === 'reLaunch') {
      return uni.reLaunch({ url: url + urlQueryParams });
    }
    uni.navigateTo({ url: url + urlQueryParams });
  }
  static compatibilityOldPage(e: any) {
    let query = '';
    if (e.query) {
      query = `?${Object.entries(e.query)
        .map(([k, v]) => `${k}=${v}`)
        .join('&')}`;
    }
    Router.goCodePage(oldPage[e.path] ?? 'wm_index', query, 'reLaunch');
  }
}
export default Router;
