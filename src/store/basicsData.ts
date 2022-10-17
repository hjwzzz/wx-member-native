import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import Storage from '@/utils/storage';

export const useBasicsData = defineStore('useBasicsData', () => {
  // 主颜色
  const colorTheme: Ref<any> = ref({});
  const mainColor: Ref<string> = ref('');
  const setColorTheme = (item: any) => {
    colorTheme.value = item;
    Storage.setColorTheme(item);
  };
  const setMainColor = (color: string) => {
    colorTheme.value = color;
    Storage.setMainColor(color);
  };
  // 微会员配置tab
  const bottomNavList: Ref<any[]> = ref([]);
  const setBottomNavList = (item: any[]) => {
    bottomNavList.value = item;
    Storage.setBottomNavList(item);
  };

  // 登录
  const checkLogin: Ref<string | boolean> = ref('');
  const setCheckLogin = (login: string) => {
    checkLogin.value = !!login;
    Storage.setMid(login);
  };

  return {
    mainColor,
    colorTheme,
    checkLogin,
    bottomNavList,
    setMainColor,
    setColorTheme,
    setCheckLogin,
    setBottomNavList,
  };
});
