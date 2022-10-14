// component/page-footer/index.ts
import { staticUrl } from '../../utils/config';
import Storage from '../../utils/storage';
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    staticUrl: staticUrl,
    mainColor: Storage.getMainColor(),
    prizeList: [
      {
        id: Math.random(),
        name: '待兑换',
        img: 'icon-daiduihuan',
        status: 0,
      },
      {
        id: Math.random(),
        name: '待领取',
        img: 'icon-dailingqu',
        status: 1,
      },
      {
        id: Math.random(),
        name: '已领取',
        img: 'icon-yilingqu',
        status: 2,
      },
      {
        id: Math.random(),
        name: '已失效',
        img: 'icon-yishixiao',
        status: 3,
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
