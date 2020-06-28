// pages/report/index.js
const app = getApp()
import { userModel } from "../../models/user.js"
const user = new userModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 30) * 2,
    list: [
      '淫秽色情',
      '违法信息',
      '营销广告',
      '恶意攻击谩骂',
      '内容不实',
      '侵权',
    ],
    result: [],
    message: '',
    to_user_id : 0,
    to_id: 0,
    type: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      to_user_id: options.to_user_id,
      to_id: options.to_id,
      type: options.type,
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

  onChange(event) {
    this.setData({
      result: event.detail
    });
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() { },

  inputMes(event) {
    console.log(event.detail);
    this.setData({
      message: event.detail
    })
  },

  /**
   * 提交信息
   */
  save: function(){
    if (this.data.message == '' && this.data.result.length <= 0){
      wx.showToast({
        title: '请填写举报内容',
        icon: 'none',
        duration: 2000
      })
      return
    }
    user.report({
      to_user_id: this.data.to_user_id,
      to_id: this.data.to_id,
      type: this.data.type,
      result: this.data.result,
      message: this.data.message

    }).then(res => {
      wx.showModal({
        title: '提示',
        content: '举报成功',
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
})