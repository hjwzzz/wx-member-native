import { defineStore } from 'pinia';
import { Ref, ref, computed } from 'vue';
import Storage from '@/utils/storage';

export const useBasicsData = defineStore(
  'useBasicsData',
  () => {
    // 主颜色
    const colorTheme: Ref<any> = ref({});
    const mainColor = ref('');
    const setColorTheme = (item: any) => {
      colorTheme.value = item || {};
    };
    const setMainColor = (color: string) => {
      colorTheme.value = color || '';
    };
    // 微会员配置tab
    const bottomNavList: Ref<any[]> = ref([]);
    const setBottomNavList = (item: any[]) => {
      bottomNavList.value = item || [];
    };

    const useMid = ref('');
    const setUseMid = (login: string) => {
      useMid.value = login;
      Storage.setMid(login);
    };

    const checkLogin = computed(() => !!useMid.value);

    return {
      useMid,
      mainColor,
      colorTheme,
      checkLogin,
      bottomNavList,
      setUseMid,
      setMainColor,
      setColorTheme,
      setBottomNavList,
    };
  },
  { persist: { enabled: true } }
);
