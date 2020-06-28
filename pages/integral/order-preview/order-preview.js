// pages/integral/order-preview/order-preview.js
// import { promisic } from "../../../utils/common.js"
import { orderModel } from "../../../models/integral/order.js"
import { productModel } from "../../../models/integral/product.js"
const product = new productModel()
const order = new orderModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: {
      color: '',
      frontColor: '#ffffff',
      bgcolor: 'rgba(255,255,255,0.95)',
      title: '订单预览',
      share: false,
      underfill: true,
      back: true,
    },
    remakes:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    const details = product.details(id)
    details.then(s=>{
      this.setData({
        product: s
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
  /**
 * 选择地址
 */
  selectAddress: function (e) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success(e) {},
            fail:e=>{
              wx.showModal({
                title: '提示',
                content: '您未授权通讯地址使用',
                showCancel:false,
                success(res) {
                  wx.openSetting({
                    success(res) {
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
    console.log(1);
    wx.chooseAddress({
      success: res=> {
        var address = {};
        address.userName = res.userName;
        address.postalCode = res.postalCode;
        address.provinceName = res.provinceName;
        address.cityName = res.cityName;
        address.countyName = res.countyName;
        address.detailInfo = res.detailInfo;
        address.nationalCode = res.nationalCode;
        address.telNumber = res.telNumber;
        this.setData({
          address: address
        })
      }
    })
  },
  /**
   * 设置备注
   */
  setRemakes(e){
    let value = e.detail
    this.setData({
      remakes: value
    })
  },
  /**
   * 提交订单
   */
  onSubmit(){
    wx.showLoading({
      title: '创建订单中',
      mask:true
    })
    var data = {}
    data.username = this.data.address.userName
    data.tel = this.data.address.telNumber
    data.address = this.data.address.provinceName + this.data.address.cityName + this.data.address.countyName + this.data.address.detailInfo
    data.p_id = this.data.product.id
    data.remakes = this.data.remakes
    const placeAnOrder = order.placeAnOrder(data)
    placeAnOrder.then(s=>{
      wx.showToast({
        title: '兑换成功',
        mask:true,
        icon:'none',
        success: s => {
          wx.redirectTo({
            url: '/pages/integral/order/order',
          })
        }
      })
    }, e => { }).catch(e=>{
      wx.hideLoading()
    })
  }
})