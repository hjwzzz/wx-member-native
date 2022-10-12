//  queryGoldPriceByPage
import { queryMemberRecommend } from '../../api/points-mall';
import Storage from '../../utils/storage';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '推荐礼品',
    },
  },

  /**
   * 组件的初始数据
   */

  data: {
    mainColor: Storage.getMainColor(),
    mallList: [],
  },

  lifetimes: {
    created() {
      this.getMemberRecommend();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getMemberRecommend() {
      const { data } = await queryMemberRecommend('');
      this.setData({ mallList: data || [] });
    },
  },
});
