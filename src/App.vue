<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { provide, ref } from 'vue';
import { getWmmeberNavRequest, getWmColorTheme } from '@/api/server';
import { useBasicsData } from '@/store/basicsData';

const initBasicsData = useBasicsData();

// 获取基础数据
const initData = async () => {
  console.log('initBasicsData.bottomNavList');
  const [getWmColorThemeRes, getWmmeberNavRequestRes] = await Promise.all([
    getWmColorTheme(),
    getWmmeberNavRequest(),
  ]);
  initBasicsData.setBottomNavList(getWmmeberNavRequestRes.data.bottomNavList);
  initBasicsData.setMainColor(getWmColorThemeRes.data.mainColor);
  initBasicsData.setColorTheme(getWmColorThemeRes.data);
  console.log('initBasicsData.bottomNavList');
  console.log('initBasicsData.bottomNavListw', initBasicsData.bottomNavList);
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

<style lang="scss">
page {
  background-color: #f5f5f5;
}
</style>
