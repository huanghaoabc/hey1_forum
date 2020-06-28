// pages/wallet/order/index.js
const app = getApp()
import { commonModel } from "../../../models/common.js"
import Dialog from '../../../vant-weapp/dist/dialog/dialog';
const common = new commonModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 30) * 2,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserOrder()
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
   * 获取用户账单
   */
  getUserOrder: function(){
    wx.showLoading({
      title: '加载中',
    })
    common.getUserOrder().then(res => {
      this.setData({
        data: res
      })
      wx.hideLoading()
    })
  },

  orderDesc: function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let data = this.data.data
    this.setData({
      orderDesc: data[index],
      show: true
    })
  }
})