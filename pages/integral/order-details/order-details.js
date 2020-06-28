// pages/integral/order-details/order-details.js
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
      title: '订单详情',
      share: true,
      underfill: true,
      back: true,
    },
    steps: [
      {
        text: '下单'
      },
      {
        text: '待发货'
      },
      {
        text: '待收货'
      },
      {
        text: '订单完成'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    order.details(id)
    .then(s=>{
      var steps = this.data.steps
      var active = this.data.active
      if(s.status == '0'){
        steps =  [
                    {
                      text: '下单'
                    },
                    {
                      text: '待发货'
                    },
                    {
                      text: '已取消'
                    }
                  ]
        active = 2
      }else{
        active = s.status
      }
      this.setData({
        active: active,
        steps: steps,
        details:s
      })
    }).catch(e=>{})
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
  // 确认收货
  confirmReceip(e) {
    var id = e.currentTarget.dataset.id
    Dialog.confirm({
      title: '提示',
      message: '您要确认收货喽~',
      asyncClose: true,
      cancelButtonText: "手滑了"
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
              url: '/pages/integral/order-details/order-details?id=' + id,
            })
          }, 1000);
        }
      }).catch(e => { })
  },
  // 订单取消
  cancelOrder(e) {
    var id = e.currentTarget.dataset.id
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
              url: '/pages/integral/order-details/order-details?id='+id,
            })
          }, 1000);
        }
      }).catch(e => { })
  },
})