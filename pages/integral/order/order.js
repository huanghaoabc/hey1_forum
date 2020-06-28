// pages/integral/order/order.js
const app = getApp()
import { orderModel } from "../../../models/integral/order.js"
import Dialog from '../../../vant-weapp/dist/dialog/dialog'
import Toast from '../../../vant-weapp/dist/toast/toast'
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
      title: '兑换记录',
      share: false,
      underfill: true,
      back: true,
    },
    height: (app.globalData.height * 2 + 24) * 2,
    active: 0,
    pageSize: 3,
    list: [],
    showLoading: true,
    isEmpty: false,
    pageNumber: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderList()
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
    this.setData({
      list: [],
      pageNumber: 1,
      isEmpty: false,
      showLoading: true
    })
    this.getOrderList()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isEmpty) {
      return
    }
    this.setData({
      showLoading: true,
    });
    if (this.data.totalPage < this.data.pageNumber) {
      this.setData({
        showLoading: false,
        isEmpty: true,
      });
      return
    }
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getOrderList()
  {
    var pageNumber = this.data.pageNumber
    const data = order.orderList({
      pageNumber: pageNumber,
      pageSize: this.data.pageSize,
      status: this.data.active
    })
    data.then(s=>{
      let list = this.data.list
      this.setData({
        list: list.concat(s.list),
        totalPage: s.total_page,
        showLoading: false
      })
      if (s.total_page <= pageNumber) {
        this.setData({
          isEmpty: true
        })
      }
      this.setData({
        pageNumber: pageNumber + 1
      })
    }).catch(e=>{})
  },
  // 切换状态分类
  chooseTabs(e)
  {
    let active = e.detail.index
    this.setData({
      active: active,
      list:[],
      pageNumber:1,
      isEmpty:false,
      showLoading:true
    })
    this.getOrderList()
  },
  // 确认收货
  confirmReceip(e)
  {
    let id = e.currentTarget.dataset.id
    Dialog.confirm({
      title: '提示',
      message: '您要确认收货喽~',
      asyncClose: true,
      cancelButtonText:"手滑了"
    })
      .then(s => {
        return order.confirm(id)
      })
      .catch(e => {
        Dialog.close();
        return false
      })
      .then(s => {
        if (s !== false) {
          Dialog.close();
          Toast.success('确认收货成功');
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/integral/order/order',
            })
          }, 1000);
        }
      }).catch(e => {})
  },
  // 订单取消
  cancelOrder(e)
  {
    let id = e.currentTarget.dataset.id
    Dialog.confirm({
      title: '提示',
      message: '您确认要取消当前订单吗？',
      asyncClose: true,
      cancelButtonText: "手滑了"
    })
      .then(s => {
        return order.cancel(id)
      })
      .catch(e => {
        Dialog.close();
        return false
      })
      .then(s => {
        if (s !== false) {
          Dialog.close();
          Toast.success('取消订单成功');
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/integral/order/order',
            })
          }, 1000);
        }
      }).catch(e => { })
  },
  // 订单详情
  details(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/integral/order-details/order-details?id='+id,
    })
  }
})