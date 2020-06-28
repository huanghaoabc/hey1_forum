// pages/wallet/withd/index.js
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
    type: 1,
    msg: '',
    trueMoney: 0,
    money: '',
    zhiName: '',
    zhiAcc: '',
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWidhSet()
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
   * 获取提现配置
   */
  getWidhSet: function(){
    common.getWidhSet().then(res => {
      let type = 1
      if (res.wit_type==2){
        type = 2
      }
      this.setData({
        data: res,
        type
      })
    })
  },

  /**
   * 更换提现方式
   */
  changeType: function(e){
    console.log(e)
    let type = e.currentTarget.dataset.type
    this.setData({
      type
    })
  },

  /**
   * 绑定输入
   */
  onChange: function (event){
    let money = event.detail
    this.checkMoney(money)
  },

  /**
   * 全部提现
   */
  allPrice: function(){
    let money = this.data.data.money
    this.checkMoney(money)
  },

  /**
   * 验证金额
   */
  checkMoney: function(money){
    let data = this.data.data
    var message = ''
    if (money != '') {
      money = parseFloat(money)
    }
    if (money < data.min_with) {
      message = '提现金额必须满' + data.min_with + '元'
    } else if (money > data.money) {
      message = '余额不足'
    } else {
      message = ''
    }

    let trueMoney = 0
    if (money != '') {
      trueMoney = money - (money / 100 * data.charge)
    }
    trueMoney = trueMoney.toFixed(2)
    this.setData({
      msg: message,
      trueMoney,
      money
    })
  },

  /**
   * 提现检验
   */
  toWith: function(){
    let userMoney = this.data.data.money
    let inputMoney = this.data.money
    let minMoney = this.data.data.min_with
    let msg = ''
    if (inputMoney == ''){
      msg = '请输入提现金额'
    }
    if (inputMoney > userMoney){
      msg = '余额不足'
    }
    if (inputMoney < minMoney){
      msg = '提现金额必须满' + minMoney + '元'
    }
    if (msg != ''){
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.type == 2){
      if (this.data.zhiName == '' || this.data.zhiAcc == ''){
        wx.showToast({
          title: '请填写支付宝信息',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
    this.setData({
      show: true
    })

  },

  /**
   * 支付宝信息绑定
   */
  inputZhi: function(e){
    let value = e.detail
    let type = e.currentTarget.dataset.type
    if(type == 'name'){
      this.setData({
        zhiName: value
      })
    }
    if (type == 'acc') {
      this.setData({
        zhiAcc: value
      })
    }
  },

  /**
   * 提现
   */
  postOrder: function(){
    common.postWith({
      money: this.data.money,
      type: this.data.type,
      zhiName: this.data.zhiName,
      zhiAcc: this.data.zhiAcc,

    }).then(res => {
      wx.showModal({
        showCancel: false,
        title: '',
        content: '申请成功，等待后台打款',
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