// pages/center/user-theprize/component/good-row/index.ts
import Storage from '../../../../../utils/storage';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
    },
    status: {
      type: Boolean,
      defalue: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mainColor: Storage.getMainColor(),
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
