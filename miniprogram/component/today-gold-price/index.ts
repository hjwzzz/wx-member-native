//  queryGoldPriceByPage
import { queryGoldPriceByPage } from '../../api/index';

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  lifetimes: {
    created() {
      // this.getGoldPriceByPage();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getGoldPriceByPage() {
      const sss = await queryGoldPriceByPage('');
      console.log('2222222222222', sss);
      console.log('2222222222222');
    },
  },
});
