// pages/my/index.js
import { userModel } from "../../models/user.js"
const user = new userModel()
import { missionModel } from '../../models/mission.js'
const task = new missionModel()
import { productModel } from '../../models/integral/product.js'
const product = new productModel()
import { commonModel } from '../../models/common.js'
const common = new commonModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    height: (app.globalData.height * 2 + 24) * 2,
    user: {},
    signInShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var markCheck = wx.getStorageSync('markCheck')
    this.setData({
      markCheck
    })
    this.getUserMsg()
    this.noticeCount()
    this.hotProduct()
    this.getCopay()
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
    var markCheck = wx.getStorageSync('markCheck');
    console.log('markCheck==>',markCheck);
    this.setData({
      markCheck
    })
    this.getUserMsg()
    this.noticeCount()
    this.hotProduct()
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
   * 获取用户信息
   */
  getUserMsg: function(){
    user.getUserMsg({
      user_id: 0
    }).then(res => {
      if(res.length <= 0){
        res = ''
      }
      this.setData({
        user: res
      })
    })
  },
  // 获取热门商品
  hotProduct(){
    product.userCenter()
    .then(s=>{
      this.setData({
        product:s
      })
    })
  },

  /**
   * 前往动态
   */
  dynamic: function(){
    let user_id = this.data.user.user.id
    wx.navigateTo({
      url: '/pages/user-center/index?user_id=' + user_id,
    })
  },

  /**
   * 获取系统消息数量
   */
  noticeCount: function(){
    user.noticeCount().then(res => {
      this.setData({
        noticeCount: res
      })
    })
  },
  // 签到
  signIn(){
    const signIn = task.signIn()
    signIn.then(s => {
      this.setData({
        signData: s,
        signInShow: true
      })
    }).catch(e => { })
  },
  // 签到关闭
  onMyEvent(e) {
    this.getUserMsg()
  },

  //获取公司配置
  getCopay: function(){
    common.getCopay().then(res => {
      this.setData({
        copay: res
      })
    })
  },gotoMyHome:function ()
  {
					//console.log(e.currentTarget.dataset.userid)
          //"pathName": "pages/my/myindex/index",
          let user_id = this.data.user.user.id
      wx.navigateTo({
        url: '/pages/my/myindex/index?user_id=' + user_id,
      })
  },shenhe:function ()
  {
    wx.navigateTo({
      url: '/pages/admin/index',
    })
  },gotoMyShop:function ()
  {
    let user_id = this.data.user.user.id
    wx.navigateTo({
      url: '/pages/my/myindex/myshop?user_id=' + user_id,
    })
  },gotoMyShangpin:function ()
  {
    let user_id = this.data.user.user.id
    wx.navigateTo({
      url: '/pages/my/myindex/myshangpin?user_id=' + user_id,
    })
  },gotoMyneed:function ()
  {
    let user_id = this.data.user.user.id
    wx.navigateTo({
      url: '/pages/my/myindex/myneed?user_id=' + user_id,
    })
  },gotoMylishi:function ()
  {
    let user_id = this.data.user.user.id
    wx.navigateTo({
      url: '/pages/user-colle/index?user_id=' + user_id+"&iden=3",
    })
  }
})