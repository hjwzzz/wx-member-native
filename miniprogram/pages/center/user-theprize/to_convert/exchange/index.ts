// pages/center/user-theprize/to_convert/exchange/index.ts
import { updatePrizeStatus, queryDetail } from '../../../../../api/foolt.js';
import { getAdressList } from '../../../../../api/address.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    code: '',
    name: '',
    showDefaultAdress: true,
    showAdress: {},
    item: {},
    show: false,
    columns: ['到店', '邮寄'],
    mode: "到店"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    this.setData(options)
    this.getData()
  },
  tapClick(e: any) {

    this.setData(e.currentTarget.dataset)

  },
  async getData() {

    const { data: item } = await queryDetail(this.data.id)
    this.setData({
      item
    })
  },
  openShow(show: any) {
    this.setData({ show: show })
  },
  changeMode(e: any) {
    this.setData({
      mode: ["到店", "自取"][e.detail.value]
    })
    console.log(e);

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    getAdressList({
      mid: wx.getStorageSync(`mid`)
    })
      .then(res => {
        const { records } = res.data;
        // 个人中心的收货地址，已添加有地址时，如果没有设置默认地址，则显示“请选择收货地址”，点击跳转选择收货地址页面
        const isDefalutAdress = records.some((item: { isDefault: string; }) => item.isDefault == 'true');
        const params = records.filter((item: { isDefault: string; }) => item.isDefault == 'true')[0];
        if (isDefalutAdress && this.data.showDefaultAdress) {
          this.data.showAdress = false;
          this.firlterParams(params);
        }
      });
  },
  firlterParams(a: any) {
    console.log(a);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})