// component/page-footer/index.ts
import { staticUrl } from '../../utils/config';
import Storage from '../../utils/storage';
import { queryPolicyList } from '../../api/server';
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
    policyListNum: {
      type: Number,
      value: 0,
      observer() {
        this.getPolicyList();
      },
    },
  },
  lifetimes: {
    created() {
      // this.getPolicyList();
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    staticUrl: staticUrl,
    mainColor: Storage.getMainColor(),
    policyList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getPolicyList() {
      if (Storage.getMid()) {
        const res = await queryPolicyList({
          curPage: 1,
          pageSize: this.data.policyListNum,
          sort: {
            field: '',
            sort: '',
          },
        });
        if (res.code === 0 && res.data) {
          this.setData({ policyList: res.data || [] });
        }
      }
    },
  },
});
