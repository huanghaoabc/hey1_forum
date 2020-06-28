// pages/topic/index/index.js
import { topicsModel } from "../../../models/topics.js"
const topics = new topicsModel()
const app = getApp()
var pageNum = 1;
const pageSize = 60;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    navTitle: [
      { title: '推荐', iden: 'is_recom' },
      { title: '最热', iden: 'host' },
      { title: '最新', iden: 'new' },
    ],
    checkIndex: 2,
    iden: 'new',
    showLoading: true,
    isEmpty: false,
    list: [],
    check: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    if(options.check == 1){
      this.setData({
        check:true
      })
    }
    this.topicsList()
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
    setTimeout(() => {
      pageNum = 1
      this.setData({
        list: [],
        arrange: false,
        isEmpty: false,
        showLoading: true,
      })
      this.topicsList()
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000);
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
    this.topicsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取话题列表
   */
  topicsList: function () {
    topics.topicsList({
      iden: this.data.iden,
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
      let list = this.data.list.concat(res.list)
      this.setData({
        list: list,
        totalNum: res.total,
        totalPage: res.total_page,
      });
      if (res.total_page <= pageNum) {
        this.setData({
          isEmpty: true,
          showLoading: false
        })
      }
      pageNum++
      console.log(res)
    })
  },

  onClickNav: function (e) {
    console.log(e);
    let index = e.detail.dataset.index
    let iden = e.detail.dataset.iden
    pageNum = 1
    this.setData({
      checkIndex: index,
      iden,
      list: [],
      isEmpty: false,
      showLoading: true,
    })
    this.topicsList()
  },todes: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    if(this.properties.check){
      var pages = getCurrentPages() // 获取页面栈
      var currPage = pages[pages.length - 1]; // 当前页面
      var prevPage = pages[pages.length - 2]; // 上一个页面
      let title = e.currentTarget.dataset.title
      prevPage.setData({
        topic: { id: id, title: '#' + title + '#' } 
      })
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.navigateTo({
        url: '/pages/topic/details/index?id=' + id
      })
    }
    
  }
})