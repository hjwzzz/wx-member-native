import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
export const UseBasicsData = defineStore('useActiveTab', () => {
  // 主颜色
  const colorTheme: Ref<any> = ref({});
  const mainColor: Ref<string> = ref('');
  const setColorTheme = (item: any) => {
    colorTheme.value = item;
  };
  const setMainColor = (color: string) => {
    colorTheme.value = color;
  };
  // 登录
  const checkLogin: Ref<string | null | boolean> = ref(null);
  const setCheckLogin = (login: string | null) => {
    checkLogin.value = !!login;
  };

  return {
    mainColor,
    colorTheme,
    checkLogin,
    setMainColor,
    setColorTheme,
    setCheckLogin,
  };
});
