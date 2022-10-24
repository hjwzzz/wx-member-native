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
      mainColor.value = color || '';
    };
    // 微会员配置tab
    const bottomNavList: Ref<any[]> = ref([]);
    const setBottomNavList = (item: any[]) => {
      bottomNavList.value = item || [];
    };
    //  浮窗导航
    const levitationNavList: Ref<any[]> = ref([]);
    const setLevitationNavList = (item: any[]) => {
      levitationNavList.value = item || [];
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
      levitationNavList,
      setUseMid,
      setMainColor,
      setColorTheme,
      setBottomNavList,
      setLevitationNavList,
    };
  },
  { persist: { enabled: true } }
);
