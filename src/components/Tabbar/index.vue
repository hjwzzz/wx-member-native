<template>
  <view class="home-window">
    <block v-if="floatNavShow">
      <view
        v-for="(item, index) in floatNavList"
        :key="index"
        class="home-icon home-data"
        @click="linkNavListFun(item)"
      >
        <view class="iconfont home-icon-style" :class="item.icoUrl" />
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
        >
          <template>
            <view class="tarbar-list-li-icon">
              <view
                class="iconfont icon-style"
                :class="item.icoUrl"
                :style="{
                  color: selected == index ? tabBarStyle.selectedColor : '',
                }"
              ></view>
            </view>
            <view
              :style="
                selected == index ? 'color:' + tabBarStyle.selectedColor : ''
              "
              class="tarbar-list-li-name"
              >{{ item.title }}</view
            >
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useBasicsData } from '@/store/basicsData';
import Router from '@/utils/router';
import { staticUrl } from '@/utils/config';

const initBasicsData = useBasicsData();
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
  initTab(list);
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
const floatNavList = computed(() => {
  const navList = initBasicsData.levitationNavList;
  if (navList) {
    return navList;
  }
  return [];
});
const floatNavShow = ref(false);
const handleFloatNavAdd = () => {
  floatNavShow.value = !floatNavShow.value;
};
const linkNavListFun = (item: any) => {
  floatNavShow.value = false;
  Router.goCodePage(item.code);
};

// const emits = defineEmits(['change']);
const selected = ref(props.current);
const setSelected = (index: number, item: any) => {
  if (selected.value === index) {
    return;
  }
  Router.goCodePage(item.code);
};

onMounted(() => {
  initTab(initBasicsData.bottomNavList);
});

const initTab = (list: any) => {
  // const page: any = getCurrentPages()
  //   .pop();
  // const route = page ? page.route.split('?')[0] : '';
  // const selectUrl = `/${route}`;
  // const active = list.findIndex(({ miniUrl }: any) => miniUrl === selectUrl);
  // if (active) {
  //   selected.value = active;
  // }
  const active = list.findIndex(({ code }: any) => code === props.code);
  selected.value = active || 0;
};
</script>

<style lang="scss" scoped>
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
