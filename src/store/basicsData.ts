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
    // 登录状态-MID
    const useMid = ref('');
    const setUseMid = (login: string) => {
      useMid.value = login;
      Storage.setMid(login);
    };
    const checkLogin = computed(() => !!useMid.value);

    // 刷新数据
    // const useRefreshState = ref(false);
    // const setUseRefreshState = () => {
    //   useRefreshState.value = !useRefreshState.value;
    // };

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

// tab
export const useActiveTab = defineStore('useActiveTab', () => {
  const current = ref(0);
  const setCurrent = (item: any) => {
    current.value = item || 0;
  };
  return {
    current,
    setCurrent,
  };
});
