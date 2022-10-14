// pages/center/user-theprize/index.ts
import Storage from '../../../utils/storage';
import { queryFront } from "../../../api/foolt";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainColor: Storage.getMainColor(),
    active: 0,
    tabList: [
      {
        key: ["TEXC"],
        name: "待兑换"
      },
      {
        key: ["CONFIRMERD", "DELIVERED", "UNCLAIMED", "SHIPPED", "CHOICE"],
        name: "待领取"
      },
      {
        key: ["FINISHED"],
        name: "已领取"
      },
      {
        key: ["CLOSED"],
        name: "已失效"
      },

    ],
    list: []
  },
  page: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getData()
  },
  onChange(e: any) {
    console.log(e.detail);
    this.setData({
      active: e.detail.index
    })
    this.getData()
  },
  async getData(page = 1) {
    const { active, tabList } = this.data
    const params = {
      curPage: page,
      pageSize: 10,
      status: tabList[active].key,
      status: ["TEXC"]
    };
    const { code, data: { records: list } } = await queryFront(params)
    if (code !== 0) return
    this.page = page
    if (page > 1) {
      this.setData(Object.fromEntries(list.map((i: object, idx: number) => [
        `list[${this.data.list.length + idx}]`, i
      ])))
      return
    }
    this.setData({
      list
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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
    this.getData(0)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getData(this.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

})