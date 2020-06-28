// pages/login/login.js
const app = getApp()
import { commonModel } from "../../models/common.js"
import Notify from '../../vant-weapp/dist/notify/notify';
const common = new commonModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  _back: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 微信登陆
   */
  wxlogin: function(e){
    console.log("wxLogin==>",e);
    let userMsg = e.detail
    if (userMsg.errMsg != 'getUserInfo:ok'){
      console.log('授权失败')
      return
    }
    wx.login({
      success(res) {
        console.log("loginInfo",res);
        if (res.code) {
          common.login({
            code: res.code,
            encryptedData: userMsg.encryptedData,
            iv: userMsg.iv,
            signature: userMsg.signature,
            rawData: userMsg.rawData
          }).then(res => {
            wx.setStorageSync('token', res.token)
            let userAuth = {}
            userAuth.user_limit = res.user_limit
            userAuth.limit_endtime = res.limit_endtime
            userAuth.limit_msg = res.limit_msg
            wx.setStorageSync('userAuth', userAuth)
            if (res.user_limit == 3){
              wx.reLaunch({
                url: '/pages/limit-msg/index'
              })
            }else{
              wx.navigateBack({
                delta: 1
              })
            }
            
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})