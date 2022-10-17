<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { provide, ref } from 'vue';
import { getWmmeberNavRequest, getWmColorTheme } from '@/api/server';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

// 获取基础数据
const initData = async () => {
  const [getWmColorThemeRes, getWmmeberNavRequestRes] = await Promise.all([
    getWmColorTheme(),
    getWmmeberNavRequest(),
  ]);
  initBasicsData.setBottomNavList(getWmmeberNavRequestRes.data.bottomNavList);
  initBasicsData.setMainColor(getWmColorThemeRes.data.mainColor);
  initBasicsData.setColorTheme(getWmColorThemeRes.data);
};

onLaunch(() => {
  initData();
  // this.setData({
  //   bottomNavList: getWmmeberNavRequestRes.data.bottomNavList || [],
  //   actionColor: getWmColorThemeRes.data.styleType,
  // });
  // // Storage.setColorTheme(res.data);
  // Storage.setMainColor(getWmColorThemeRes.data.mainColor);
  // console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});

const dddd = ref('22222222');
setTimeout(() => {
  dddd.value = '开始的换届大会';
}, 5000);

provide('test', dddd);
</script>
<style lang="less">
.dddd {
  height: 22rpx;

  .aaa {
    height: 22rpx;
  }
}
</style>
