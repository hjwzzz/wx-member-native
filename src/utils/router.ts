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
  '/pages/index/index',
  '/pages/center/index',
  '/pages/nearby-store/index',
];

// 配置page的code代码
const pageCode: any = {
  warranty_details: '', // 质保单详情
  warranty: '/my-assets-pages/quality/index', // 质保单
  point_mall: '/my-assets-pages/point-mall/index', // 积分商城
  point_mall_order: '/my-assets-pages/point-mall/index', // 订单(积分)
  point_mall_commodity: '/my-assets-pages/point-mall/index', // 商品(积分)
  point_mall_index: '/my-assets-pages/point-mall/index', // 首页(积分)
  reg: '', // 注册登录
  invite_courteous: '', // 邀请有礼
  my_prize: '/my-assets-pages/my-prize/index', // 	  我的奖品
  reservation: '/reservation-service-pages/reservation-service/index', // 预约服务
  warranty_list: '', // 质保单列表
  point: '/my-assets-pages/integral/index', // 我的积分
  get_coupon: '/my-assets-pages/coupon-center/index', // 领券中心
  gold_price: '/my-assets-pages/gold-price/index', // 今日金价
  wm_center: '/pages/center/index', // 个人中心
  wm_index: '/pages/index/index', //  首页
  sign: '/activity-pages/sign-in/index', // 签到
  balance: '/my-assets-pages/thebalance/index', // 我的余额
  coupon: '/my-assets-pages/my-coupon/index', // 我的优惠券
  coupon_detail: '/my-assets-pages/my-coupon/detail', // 优惠券详情
  nearby_store: '/pages/nearby-store/index', // 附近门店
  storeInfo: '/my-assets-pages/my-prize/store-list', // 门店选择
  login: '/pages/login/index',
  userInfo: '/pages/center/user-info/index', // 个人资料
  updateGuide: '/pages/center/user-info/guid-list', // 导购选择
  installCenter: '/pages/center/account-set', // 账户设置
  addressList: '/pages/address/address-list', // 收货地址
  finishAddress: '/pages/login/finish-address', // 完善信息地址
  updatePhone: '/pages/center/user-info/update-phone', // 修改手机号
  cert: '/pages/center/user-info/cert', // 修改证件
  location: '/pages/center/user-info/address', // 修改地址
  goldPrice: '/my-assets-pages/gold-price/index', // 今日金价
  activiy_prize: '/activity-pages/prize/index', // 活动-我的奖品
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
}
export default Router;
