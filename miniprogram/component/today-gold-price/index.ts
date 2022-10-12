//  queryGoldPriceByPage
// import { queryGoldPriceByPage } from '../../api/index';
import Storage from '../../utils/storage';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'false',
    },

    showed: {
      type: Boolean,
      value: false,
    },
    goldPrice: {
      type: Object,
      value: () => [],
    },
  },

  /**
   * 组件的初始数据
   */

  data: {
    mainColor: Storage.getMainColor(),
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
  },

  lifetimes: {
    created() {
      // this.getGoldPriceByPage();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // async getGoldPriceByPage() {
    //   const sss = await queryGoldPriceByPage('');
    //   console.log('2222222222222', sss);
    //   console.log('2222222222222');
    // },
  },
});
