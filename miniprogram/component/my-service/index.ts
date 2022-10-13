// component/page-footer/index.ts
import { staticUrl } from '../../utils/config';
import Storage from '../../utils/storage';
import { queryCBookServPage } from '../../api/reservation-service';
//
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: () => ({}),
    },
    title: {
      type: String,
      value: '',
    },
    srvProshowNum: {
      type: Number,
      value: 0,
      observer() {
        this.getMemberRecommend();
      },
    },
  },
  lifetimes: {
    created() {
      //  this.getMemberRecommend();
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    staticUrl: staticUrl,
    mainColor: Storage.getMainColor(),
    srvProList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getMemberRecommend() {
      if (Storage.getMid()) {
        const servPage = await queryCBookServPage({
          mid: Storage.getMid(),
          curPage: 1,
          pageSize: this.data.srvProshowNum,
          status: '',
        });
        this.setData({ srvProList: servPage.data?.records || [] });
      }
    },
  },
});
