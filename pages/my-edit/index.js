// pages/my-edit/index.js
import { userModel } from "../../models/user.js"
import { HTTP } from "../../utils/http.js";
const user = new userModel()
const http = new HTTP()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 28) * 2,
    array: ['女', '男'],
    index:0,
    tagArr:['带货达人','商家','号商'],
    tagArrIndex:0,
    data: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    user.getData().then(res => {
      this.setData({
        user: res,
        index: res.gender,
        tagArrIndex:res.usertag
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

  },

  bindPickerChange: function (e) {
    let data = this.data.data
    data.gender = e.detail.value
    this.setData({
      data,
      index: e.detail.value
    })
  },
  bindTagChange: function (e) {
    let data = this.data.data
    data.usertag = e.detail.value
    this.setData({
      data,
      tagArrIndex: e.detail.value
    })
  },

  /**
   * 输入昵称
   */
  inputNickname: function(e){
    let value = e.detail.value
    let data = this.data.data
    let user = this.data.user
    user.nickname = e.detail.value
    data.nickname = value
    this.setData({
      data,
      user
    })
  },

  /**
   * 输入简介
   */
  inputBio: function(e){
    let value = e.detail.value
    let data = this.data.data
    let user = this.data.user
    user.bio = e.detail.value
    data.bio = value
    this.setData({
      data,
      user
    })
  },
  inputweixinhao:function (e)
  {
    let value = e.detail.value
    let data = this.data.data
    let user = this.data.user
    user.weixinhao = e.detail.value
    data.weixinhao = value
    this.setData({
      data,
      user
    })
  },

  /**
   * 选择图片
   */
  chooseImg: function () {
    var page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0]
        let data = page.data.data
        let user = page.data.user
        data.avatar = tempFilePaths
        user.avatar = tempFilePaths
        page.setData({
          data,
          user
        })
      }
    })
  },

  /**
   * 保存
   */
  save: function(){
    if(this.data.user.nickname == ''){
      wx.showToast({
        title: '请填写昵称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '保存中...',
    })
    let data = this.data.data
    if(data.avatar){
      http.uploadFile({
        filePath: data.avatar
      }).then(res => {
        data.avatar = res
        user.saveData({
          data:data
        }).then(res => {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '修改成功',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        })
      })
    }else{
      user.saveData({
        data: data
      }).then(res => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '修改成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      })
    }
  }
})