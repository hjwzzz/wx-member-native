<template>
  <view class="home-window">
    <block v-if="floatNavShow">
      <view
        v-for="(item, index) in floatNavList"
        :key="index"
        class="home-icon home-data"
        @click="linkNavListFun(item)"
      >
        <!-- iconLight -->
        <image
          v-if="item.isIcon === 1"
          class="float-icon-iamge"
          :src="item.iconLight"
          mode="aspectFit"
        >
        </image>
        <text v-else class="iconfont home-icon-style" :class="item.icoUrl">
        </text>
        <!-- <view class="iconfont home-icon-style" :class="item.icoUrl" /> -->
      </view>
    </block>
    <view
      v-if="floatNavList && floatNavList.length"
      class="home-icon"
      @click.stop="handleFloatNavAdd"
    >
      <image class="image" :src="staticUrl + 'img/add.png'" mode="aspectFill" />
    </view>
  </view>
  <view class="tarbar">
    <view
      class="tarbar-list"
      :style="{
        background: tabBarStyle.backgroundColor,
        color: tabBarStyle.color,
        borderTop: '1rpx solid #f1f1f1',
      }"
    >
      <view class="tarbar-list-ul">
        <view
          class="tarbar-list-li"
          v-for="(item, index) in tabBarList"
          :key="index"
          @click="setSelected(index, item)"
          :style="actionColor(index)"
        >
          <view class="tarbar-list-li-icon" :style="actionBackground">
            <image
              v-if="item.isIcon === 1"
              class="tarbar-icon-iamge"
              :src="actionImage(index, item)"
              mode="aspectFit"
            >
            </image>
            <text v-else class="iconfont icon-style" :class="item.icoUrl">
            </text>
          </view>
          <view class="tarbar-list-li-name">
            {{ item.title }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { computed, onMounted, reactive, ref } from 'vue';
import { useBasicsData, useActiveTab } from '@/store/basicsData';
import Router from '@/utils/router';
import Storage from '@/utils/storage';
import { staticUrl } from '@/utils/config';
import { getByOpsIdAndKind } from '@/api/server';

const initBasicsData = useBasicsData();
const initActiveTab = useActiveTab();
interface Props {
  current?: number | string;
  tabBar?: any;
  code?: string;
}
const props = withDefaults(defineProps<Props>(), {
  current: 0,
  tabBar: () => ({}),
  code: 'wm_index',
});

const tabBarList = computed(() => {
  const list = initBasicsData.bottomNavList;
  // initTab();
  return list;
});
const tabBarStyle = reactive({
  color: '#323338',
  selectedColor: computed(() => initBasicsData.mainColor),
  borderStyle: '#f1f1f1',
  backgroundColor: '#fff',
  position: 'bottom',
});

// 浮窗导航
const floatNavList = computed(() => initBasicsData.levitationNavList || []);
// const navList = initBasicsData.levitationNavList;
// if (navList) {
//   return navList;
// }
// return [];

const floatNavShow = ref(false);
const handleFloatNavAdd = () => {
  floatNavShow.value = !floatNavShow.value;
};
const linkNavListFun = (item: any) => {
  floatNavShow.value = false;
  //   const active = list.findIndex(({ code }: any) => code === props.code);
  // console.log('linkNavListFun', item);
  if (!item.code && item.miniUrl) {
    Router.goNoCodePage(item.miniUrl);
    return;
  }
  if (!item.code && item.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.h5Url)}` });
    return;
  }
  if (['wm_center', 'wm_index'].includes(item.code)) {
    const active = initBasicsData.bottomNavList.findIndex(({ code }: any) => code === item.code);
    initActiveTab.setCurrent(active);
  }
  Router.goCodePage(item.code);
};

// 显示颜色
const actionColor = computed(() => (index: number) => {
  if (doOutStyle.custom.type === 0 || doOutStyle.custom.type === '0') {
    if (initActiveTab.current === index) {
      return `color:${tabBarStyle.selectedColor}`;
    }
    return '';
  }
  if (initActiveTab.current === index) {
    return `color:${doOutStyle.special.colorLight}`;
  }
  return `color:${doOutStyle.special.colorDark}`;
});
// 显示背景颜色
const actionBackground = computed(() => {
  if (doOutStyle.custom.type === 0 || doOutStyle.custom.type === '0') {
    return '';
  }
  return `background:${doOutStyle.special.background}`;
  // if (initActiveTab.current === index) {
  //   return `background:${doOutStyle.special.background}`;
  // }
  // return '';
});
// 显示image
const actionImage = computed(() => (index: number, item: any) => {
  if (initActiveTab.current === index) {
    return item.iconLight;
  }
  return item.iconDark;
});

// const emits = defineEmits(['change']);
// const selected = ref(props.current);
const setSelected = (index: number, item: any) => {
  // console.log({ ...item });
  if (!item.code && item.miniUrl) {
    if (['/pages/tabbar/index', '/pages/center/index'].includes(item.miniUrl)) {
      initActiveTab.setCurrent(index);
    }
    Router.goNoCodePage(item.miniUrl);
    return;
  }
  if (!item.code && item.h5Url) {
    uni.navigateTo({ url: `/pages/tabbar/custom?url=${encodeURIComponent(item.h5Url)}` });
    return;
  }

  if (initActiveTab.current === index) {
    return;
  }
  if (['wm_center', 'wm_index'].includes(item.code)) {
    initActiveTab.setCurrent(index);
  }
  floatNavShow.value = false;
  Router.goCodePage(item.code);
};

// onMounted(() => {
//   initTab(initBasicsData.bottomNavList);
//   initTab();
// });

onShow(() => {
  getWmmeberNav();
  geThemeColor();
});
//
const geThemeColor = async () => {
  const { data } = await getByOpsIdAndKind('WM_THEME');

  if (data.style) {
    initBasicsData.setMainColor(data.style.mainColor);
    initBasicsData.setColorTheme(data.style);
  }

  // console.log('WM_THEME', data);
  // if (data.param) {
  //   initBasicsData.setBottomNavList(data.param.bottomNavList);
  //   initBasicsData.setLevitationNavList(data.param.levitationNavList?.reverse());
  //   initBasicsData.setBottomNavListShow(data.param.bottomNavShowed);
  //   initBasicsData.setLevitationNavListShow(data.param.llevitationNavShowed);
  // }
  // const active = initBasicsData.bottomNavList.findIndex(({ code }: any) => code === props.code);
  // initActiveTab.setCurrent(active || 0);
  initTab();
};

const doOutStyle: any = reactive({ custom: { type: 0 }, special: {} });

const getWmmeberNav = async () => {
  // console.log('getWmmeberNav');
  const { data } = await getByOpsIdAndKind('WM_BTMNAV');
  // WM_BTMNAV
  if (data.param) {
    initBasicsData.setBottomNavList(data.param.bottomNavList);
    initBasicsData.setLevitationNavList(data.param.levitationNavList?.reverse());
    initBasicsData.setBottomNavListShow(data.param.bottomNavShowed);
    initBasicsData.setLevitationNavListShow(data.param.llevitationNavShowed);
    Object.assign(doOutStyle, data.param.doOut);
  }
  // const active = initBasicsData.bottomNavList.findIndex(({ code }: any) => code === props.code);
  // initActiveTab.setCurrent(active || 0);
  initTab();
};

// const [getWmColorThemeRes, getWmmeberNavRequestRes] = await Promise.all([
//     queryWmColorThemeFront(),
//     getWeMemberNavFront(),
//   ]);

//   if (getWmmeberNavRequestRes.data) {
//     const { bottomNavList, levitationNavList } = getWmmeberNavRequestRes.data;
//     initBasicsData.setBottomNavList(bottomNavList);
//     initBasicsData.setLevitationNavList(levitationNavList?.reverse());
//   }

const initTab = () => {
  // list?: any
  // const page: any = getCurrentPages()
  //   .pop();
  // const route = page ? page.route.split('?')[0] : '';
  // const selectUrl = `/${route}`;
  // const active = list.findIndex(({ miniUrl }: any) => miniUrl === selectUrl);
  // if (active) {
  //   selected.value = active;
  // }
  // const active = list.findIndex(({ code }: any) => code === props.code);
  // console.log(active);
  // selected.value = active || 0;
  // selected.value = initActiveTab.current;

  const active = initBasicsData.bottomNavList.findIndex(({ code }: any) => code === props.code);
  // console.log(' props.code', props.code);
  // console.log(' active', active);
  // console.log(' bottomNavList', initBasicsData.bottomNavList);
  initActiveTab.setCurrent(active || 0);
};
</script>

<style lang="scss" scoped>
.float-icon-iamge {
  width: 30rpx;
  height: 30rpx;
}
.tarbar {
  // min-height: 100rpx;
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255, 255, 255, 1);
  .tarbar-list {
    width: 100%;
    /* height: 98rpx; */
    // background: #4d586f;
    position: fixed;
    left: 0;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .tarbar-icon-iamge {
    width: 30rpx;
    height: 30rpx;
  }

  .tarbar-list-ul {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .tarbar-list-ul {
    padding: 6rpx 0rpx 10rpx 0rpx;
    .tarbar-list-li {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
  }

  .tarbar-list-li {
    width: 110rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tarbar-list-li-icon {
    width: 50rpx;
    height: 50rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // .tarbar-list-li-icon .image {
  //   width: 36rpx;
  //   height: 36rpx;
  // }
  .tarbar-list-li-name {
    width: 100%;
    text-align: center;
    line-height: 30rpx;
    font-size: 24rpx;
    height: 30rpx;
    margin-bottom: 14rpx;
  }

  .tarbar-list-li-center {
    width: 100rpx;
  }
  .icon-style {
    font-size: 44rpx;
  }
}

.home-window {
  position: fixed;
  bottom: calc(140rpx + constant(safe-area-inset-bottom));
  bottom: calc(140rpx + env(safe-area-inset-bottom));
  right: 30rpx;
  z-index: 9999;
  .home-icon {
    width: 100rpx;
    height: 100rpx;
    background: #ffffff;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    .image {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .home-icon-style {
    font-size: 44rpx;
  }
  .home-data {
    margin-bottom: 20rpx;
  }
}
</style>
