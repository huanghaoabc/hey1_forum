// pages/red-view/index.js
const app = getApp()
import { commonModel } from "../../models/common.js"
const common = new commonModel()
import { redevnModel } from "../../models/redevn.js"
const redevn = new redevnModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2) * 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    redevn.getRedEnv({
      id: id
    }).then(res => {
      this.setData({
        data: res,
        id: options.id
      })
    })
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
    return {
      title: '快来看帖抢红包啦！',
      path: '/pages/article/details/index?id=' + this.data.id
    }
  },

  toMoney: function(){
    wx.navigateTo({
      url: '/pages/wallet/index',
    })
  }
})