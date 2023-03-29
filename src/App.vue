<script setup lang="ts">
import { onLaunch, onPageNotFound } from '@dcloudio/uni-app';
// import { provide, ref } from 'vue';
import {
  queryWmColorThemeFront,
  // getWeMemberNavFront,
  // getLogo,
} from '@/api/server';
import { getByOpsIdAndKind } from '@/api/server';
import { useBasicsData } from '@/store/basicsData';
// import Storage from '@/utils/storage';
import Router from '@/utils/router';
const initBasicsData = useBasicsData();

// 获取基础数据
const initData = async () => {
  // const [getWmColorThemeRes, getWmmeberNavRequestRes] = await Promise.all([
  //   queryWmColorThemeFront(),
  //   getWeMemberNavFront(),
  // ]);
  const getWmColorTheme: any = await getByOpsIdAndKind('WM_THEME');
  // console.log('getWmColorTheme', getWmColorTheme.data.style.mainColor);
  if (getWmColorTheme.data.style.mainColor) {
    initBasicsData.setMainColor(getWmColorTheme.data.style.mainColor);
    initBasicsData.setColorTheme(getWmColorTheme.data.style);

    //     navigationBarBackgroundColor: "#EF2734"
    //     navigationBarTextStyle: "white"
    //     param.doOut.special.navigationBarBackgroundColor
    //     param.doOut.special.navigationBarTextStyle
    if (getWmColorTheme.data.param?.doOut?.special) {
      const { navigationBarBackgroundColor, navigationBarTextStyle } =
        getWmColorTheme.data.param.doOut.special;

      console.log('setNavigationBarColor');
      uni.setNavigationBarColor({
        frontColor: navigationBarTextStyle || '#ffffff',
        backgroundColor: navigationBarBackgroundColor || '#ff547b',
      });
    }
  } else {
    const getWmColorThemeRes = await queryWmColorThemeFront();
    if (getWmColorThemeRes.data) {
      initBasicsData.setMainColor(getWmColorThemeRes.data.mainColor);
      initBasicsData.setColorTheme(getWmColorThemeRes.data);
    }
  }

  // if (getWmmeberNavRequestRes.data) {
  //   const { bottomNavList, levitationNavList } = getWmmeberNavRequestRes.data;
  //   initBasicsData.setBottomNavList(bottomNavList);
  //   initBasicsData.setLevitationNavList(levitationNavList?.reverse());
  // }
  // if (getWmColorThemeRes.data) {
  //   initBasicsData.setMainColor(getWmColorThemeRes.data.mainColor);
  //   initBasicsData.setColorTheme(getWmColorThemeRes.data);
  // }
};

onLaunch(() => {
  // Storage.removeEpid();
  initData();
  // console.log(uni.getAccountInfoSync());
});

onPageNotFound(Router.compatibilityOldPage);

// onShow(() => {
//   console.log('App Show');
// });
// onHide(() => {
//   console.log('App Hide');
// });
// provide('reState', ref(false));
</script>
<style lang="scss">
page {
  --main-color: #ff547b;
  background: #f5f5f5;
  word-break: break-all;
}

.uni-notice-bar-icon {
  width: 40rpx;
  height: 40rpx;
}

.text-break {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.break-word {
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-warp;
}
.nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.text-line-two {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.uni-searchbar__cancel {
  color: var(--main-color) !important;
}
.clM {
  color: var(--main-color);
}
.bgCM {
  background: var(--main-color);
}
@font-face {
  font-family: 'iconfont'; /* Project id 2631660 */
  src: url('//at.alicdn.com/t/font_2631660_wse1qki9nw.woff2?t=1637726230788')
      format('woff2'),
    url('//at.alicdn.com/t/font_2631660_wse1qki9nw.woff?t=1637726230788')
      format('woff'),
    url('//at.alicdn.com/t/font_2631660_wse1qki9nw.ttf?t=1637726230788')
      format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-dianpu:before {
  content: '\e68c';
}

.icon-shouye:before {
  content: '\e68d';
}

.icon-shangpin:before {
  content: '\e68e';
}

.icon-jifendingdan:before {
  content: '\e68f';
}

.icon-bianjiedit:before {
  content: '\e68a';
}

.icon-shanchu_delete:before {
  content: '\e68b';
}

.icon-yishixiao:before {
  content: '\e684';
}

.icon-yilingqu:before {
  content: '\e685';
}

.icon-dailingqu:before {
  content: '\e686';
}

.icon-beihuozhong:before {
  content: '\e687';
}

.icon-daiduihuan:before {
  content: '\e688';
}

.icon-dizhi:before {
  content: '\e689';
}

.icon-gonggao:before {
  content: '\e680';
}

.icon-dan:before {
  content: '\e681';
}

.icon-weigouxuan:before {
  content: '\e682';
}

.icon-yigouxuan:before {
  content: '\e683';
}

.icon-jinrijinjia3:before {
  content: '\e67c';
}

.icon-jinrijinjia1:before {
  content: '\e677';
}

.icon-fujinmendian1:before {
  content: '\e66e';
}

.icon-jifenshangcheng1:before {
  content: '\e66f';
}

.icon-fujinmendian3:before {
  content: '\e670';
}

.icon-fujinmendian2:before {
  content: '\e671';
}

.icon-jifenshangcheng2:before {
  content: '\e672';
}

.icon-lingquanzhongxin1:before {
  content: '\e673';
}

.icon-jifenshangcheng3:before {
  content: '\e674';
}

.icon-jinrijinjia2:before {
  content: '\e675';
}

.icon-lingquanzhongxin2:before {
  content: '\e676';
}

.icon-shouye3:before {
  content: '\e678';
}

.icon-wode1:before {
  content: '\e679';
}

.icon-shouye2:before {
  content: '\e67a';
}

.icon-lingquanzhongxin3:before {
  content: '\e67b';
}

.icon-wode2:before {
  content: '\e67d';
}

.icon-wode3:before {
  content: '\e67e';
}

.icon-shouye1:before {
  content: '\e67f';
}
</style>
