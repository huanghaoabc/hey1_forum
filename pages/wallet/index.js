// pages/wallet/index.js
const app = getApp()
import { commonModel } from "../../models/common.js"
const common = new commonModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 30) * 2,
    money: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserMoney()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUserMoney()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取用户余额
   */
  getUserMoney: function(){
    common.getUserMoney().then(res => {
      this.setData({
        money: res
      })
    })
  },

  toOrder: function(){
    wx.navigateTo({
      url: '/pages/wallet/order/index',
    })
  },

  towithd: function(){
    wx.navigateTo({
      url: '/pages/wallet/withd/index',
    })
  }
})