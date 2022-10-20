import { useBasicsData } from '@/store/basicsData';

// 配置需要登录才能进入的页面
const configRouterAuth = ['my-assets-pages/integral/index'];
// 配置switchTab切换页面
const switchTabUrl = ['/pages/index/index', '/pages/center/index'];
// Router
class Router {
  static go(url: string): void {
    const initBasicsData = useBasicsData();
    if (switchTabUrl.includes(url)) {
      uni.switchTab({ url });
      return;
    }
    // 如果没有登录，需要登录的页面-就去登录
    if (!initBasicsData.checkLogin && configRouterAuth.includes(url)) {
      this.goLogin();
    } else {
      uni.navigateTo({ url });
    }
  }
  static goLogin() {
    uni.reLaunch({ url: '/pages/login/index' });
  }
}
export default Router;
