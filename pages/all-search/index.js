// pages/all-search/index.js
import { commonModel } from "../../models/common.js"
const common = new commonModel()
var pageNum = 1;
const pageSize = 6;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    showLoading: true,
    isEmpty: false,
    list: [],
    key: 1,
    value: '',
    isSearch: false,
    checkSea: false,
    history: [],
    hostKey:[],
    check: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    console.log(options)
    if (options.key){
      this.setData({
        key: options.key
      })
    }
    if (options.check){
      this.setData({
        check: options.check
      })
      
    }
    this.upHis()
    this.hostKey()
    
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
    if (this.data.isEmpty) {
      return
    }
    this.setData({
      showLoading: true,
    });
    if (this.data.totalPage < pageNum) {
      this.setData({
        showLoading: false,
        isEmpty: true,
      });
      return
    }
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 绑定搜索
   */
  inputValue: function (e){
    pageNum = 1
    let value = e.detail
    if(value.length > 0){
      var isSearch = true
    }else{
      var isSearch = false
    }
    this.setData({
      value,
      showLoading: true,
      isEmpty: false,
      list: [],
      isSearch,
      checkSea: false
    })
  },

  /**
   * 搜索
   */
  search: function(){
    if(!wx.getStorageSync('seas')){
      var seas = [];
      seas.push(this.data.value)
      wx.setStorageSync('seas', seas)
    }else{
      var seas = wx.getStorageSync('seas')
      if(seas.length > 10){
        seas.splice(seas.length-1, 1)
      }
      console.log(seas.indexOf(this.data.value))
      if (seas.indexOf(this.data.value) == -1){
        seas.push(this.data.value)
        wx.setStorageSync('seas', seas)
      }
      
    }
    this.upHis()
    common.search({
      pageNumber: pageNum,
      pageSize: pageSize,
      key: this.data.key,
      value: this.data.value
    }).then(res => {
      let list = this.data.list.concat(res.list)
      this.setData({
        list: list,
        totalNum: res.total,
        totalPage: res.total_page,
        checkSea: true
      });
      if (res.total_page <= pageNum) {
        this.setData({
          isEmpty: true,
          showLoading: false
        })
      }
      pageNum++
    })
  },

  /**
   * 清空历史搜索
   */
  emptyHis: function(){
    wx.removeStorage({
      key: 'seas',
      success(res) {
        console.log(res)
      }
    })
    this.setData({
      history: []
    })
  },

  /**
   * 更新历史搜索
   */
  upHis: function(){
    if (wx.getStorageSync('seas')) {
      var seas = wx.getStorageSync('seas')
      seas.reverse()
      this.setData({
        history: seas
      })
    }
  },

  /**
   * 获取热搜关键字
   */
  hostKey: function(){
    common.hostKey().then(res => {
      this.setData({
        hostKey: res
      })
    })
  },

  /**
   * 点击关键字
   */
  checkKey: function(e){
    pageNum = 1
    console.log(e)
    let value = e.currentTarget.dataset.value
    this.setData({
      value,
      isSearch : true
    })
    this.search()
  },

  /**
   * 点击导航
   */
  checkNav: function(e){
    pageNum = 1
    let key = e.currentTarget.dataset.key
    if(this.data.check == 'true'){
      return
    }
    this.setData({
      key,
      list: [],
      isEmpty: false,
      showLoading: true,
    })
    if (this.data.checkSea){
      this.search()
    }
    
  },

  /**
   * 跳转详情
   */
  toDes: function(e){
    let id = e.currentTarget.dataset.id
    let key = this.data.key
    let url = ''
    if(key == 1){
      url = '/pages/article/details/index?id='
    }
    if (key == 2) {
      url = '/pages/group-circle/details/index?id='
      if (this.data.check == 'true') {
        var pages = getCurrentPages() // 获取页面栈
        var currPage = pages[pages.length - 1]; // 当前页面
        var prevPage = pages[pages.length - 3]; // 上上一个页面
        let title = e.currentTarget.dataset.title
        prevPage.setData({
          cir: { id: id, title:title}
        })
        wx.navigateBack({
          delta: 2
        })
        return
      }
    }
    if (key == 3) {
      url = '/pages/topic/details/index?id='
      if (this.data.check == 'true') {
        var pages = getCurrentPages() // 获取页面栈
        var currPage = pages[pages.length - 1]; // 当前页面
        var prevPage = pages[pages.length - 3]; // 上上一个页面
        let title = e.currentTarget.dataset.title
        prevPage.setData({
          topic: { id: id, title: '#' + title + '#' }
        })
        wx.navigateBack({
          delta: 2
        })
        return
      }
    }
    if (key == 4) {
      url = '/pages/user-center/index?user_id='
    }
    if (key == 5) {
      url = '/pages/integral/details/details?id='
    }
    wx.redirectTo({
      url: url + id
    })
  },

  back:function(){
    wx.navigateBack({
      delta: 1
    })

  }
})