// pages/integral/index/index.js
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
      title: '积分商城',
      underfill:true,
      share:true
    },
    height: (app.globalData.height * 2 + 24) * 2,
    classify:[],
    active:0,
    pageSize:10,
    product: [],
    showLoading: true,
    isEmpty: false,
    pageNumber:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classify = product.classify()
    classify.then(s=>{
      this.setData({
        classify:s
      })
      if (s.length <= 0) {
        this.setData({
          isEmpty: true,
          showLoading: false
        })
        return
      }
      this.getProduct()
    },e=>{})
  },
  getProduct(){
    var classify = this.data.classify
    var pageNumber = this.data.pageNumber
    const productList = product.product({
      pageNumber: pageNumber,
      pageSize: this.data.pageSize,
      class_id: classify[this.data.active].id ? classify[this.data.active].id:0
    })
    productList.then(s=>{
      let product = this.data.product
      this.setData({
        product: product.concat(s.list),
        // totalNum: s.total,
        totalPage: s.total_page,
        showLoading: false
      })
      if (s.total_page <= pageNumber) {
        this.setData({
          isEmpty: true
        })
      }
      this.setData({
        pageNumber:pageNumber+1
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
    if (this.data.isEmpty){
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
    this.getProduct()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  classifyClick(e){
    var active = e.detail.index
    this.setData({
      isEmpty: false,
      showLoading: true,
      product:[],
      active: active,
      pageNumber:1
    })
    this.getProduct()
  },

  onSearch: function(){
    wx.navigateTo({
      url: '/pages/all-search/index?key=' + 5,
    })
  }
})