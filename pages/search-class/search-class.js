// pages/search-class/search-class.js
const app = getApp()
import { categorysModel } from "../../models/categorys.js"
const categorys = new categorysModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 30) * 2,
    activeName: '0',
    check:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.check == 1) {
      this.setData({
        check: true
      })
    }
    this.getCategorys()
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

  onChange(event) {
    console.log(event)
    this.setData({
      activeName: event.detail
    });
  },

  /**
   * 获取精选分类
   */
  getCategorys: function () {
    categorys.index().then(res => {
      this.setData({
        navTitle: res
      })
      console.log(res)
    })
  },

  agree: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    if (this.properties.check) {
      var pages = getCurrentPages() // 获取页面栈
      var currPage = pages[pages.length - 1]; // 当前页面
      var prevPage = pages[pages.length - 2]; // 上一个页面
      let title = e.currentTarget.dataset.title
      prevPage.setData({
        clases: { id: id, title: title  }
      })
      wx.navigateBack({
        delta: 1
      })
    }
  }
})