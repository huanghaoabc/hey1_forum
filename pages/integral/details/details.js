// pages/integral/details/details.js
const app = getApp()
import { productModel } from '../../../models/integral/product.js'
const product = new productModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: {
      color: '',
      frontColor: '#ffffff',
      bgcolor: 'rgba(255,255,255,0.95)',
      title: '商品详情',
      share: true,
      underfill:true,
      back:true,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    const data = product.details(id)
    data.then(s=>{
      this.setData({
        details:s
      })
    },e=>{})
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
  // 立即购买
  onIntegral(){
    wx.navigateTo({
      url: '/pages/integral/order-preview/order-preview?id='+this.data.details.id,
    })
  }
})