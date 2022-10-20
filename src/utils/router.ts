import { useBasicsData } from '@/store/basicsData';
import Storage from '@/utils/storage';
// 配置需要登录才能进入的页面
const configRouterAuth = ['my-assets-pages/integral/index'];
// 配置switchTab切换页面
const switchTabUrl = ['/pages/index/index', '/pages/center/index'];

// 路由控制
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
  // 去登录关闭所有页面
  static goLogin() {
    const page: any = getCurrentPages()
      .pop();
    const route = page ? page.route.split('?')[0] : '';
    Storage.setPages(`/${route}`);
    uni.reLaunch({ url: '/pages/login/index' });
  }
  // 从登录返回之前保存的页面
  static fromLoginBack() {
    const url = Storage.getPages() || '/pages/index/index';
    uni.reLaunch({ url });
  }
}
export default Router;
