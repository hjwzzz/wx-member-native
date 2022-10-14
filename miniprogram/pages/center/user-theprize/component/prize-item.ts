// pages/center/user-theprize/component/prize-item.ts
import Storage from '../../../../utils/storage';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
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
    exchange() {
      const { id, recvManner: { code, name } } = this.data.item
      wx.navigateTo({
        url: `/pages/center/user-theprize/to_convert/exchange/index?id=${id}&code=${code}&name=${name}&flag=true`
      });
    }
  }
})
