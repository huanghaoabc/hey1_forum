// pages/topic/details/index.js
import { topicsModel } from "../../../models/topics.js"
import { articlesModel } from "../../../models/articles.js"

var WxParse = require('../../../wxParse/wxParse.js');
const articles = new articlesModel()
const topics = new topicsModel()
var pageNum = 1
const pageSize = 6
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 此页面 页面内容距最顶部的距离
    height: (app.globalData.height * 2 + 24) * 2,
    navData: {
      color: '#fff',
      frontColor: '#ffffff',
      bgcolor: '',
      title: ''
    },
    navTitle: [
      { title: '全部', iden: 'new' },
      { title: '最热', iden: 'host' },
      { title: '精华', iden: 'ess' }
    ],
    checkIndex: 0,
    iden: 'new',
    showLoading: true,
    isEmpty: false,
    list: [],
    topic: {
      key: 'topic',
      id: 0,
      title: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    let id = options.id
    let navData = this.data.navData;
    navData.title=options.title;
    this.setData({
      id: id,
      navData
    })
    this.topicsDet()
    //this.articlesList()
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
      //this.articlesList()
      this.topicsDet()
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
    this.articlesList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 用户滑动事件的处理函数
   */
  onPageScroll: function (option) {
    let scrollTop = option.scrollTop;
    let navData = {}
    navData.color = '#fff'
    navData.frontColor = '#ffffff'
    navData.bgcolor = ''
    navData.title = ''
    if (scrollTop > 50) {
      navData.frontColor = '#000000'
      navData.color = '#000'
      navData.bgcolor = '#fff'
      navData.title = this.data.topicsDet.title
    }
    wx.setNavigationBarColor({
      frontColor: navData.frontColor,
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    this.setData({
      navData
    })
  },

  /**
   * 获取话题详情
   */
  topicsDet: function(){
    var page = this;
    topics.topicsDet({
      id: this.data.id
    }).then(res => {
      let topic = this.data.topic;
      
      topic.id = res.id
      topic.title = '#' + res.title + '#'
      console.log("desc==>",res.admin_rule);
      var detail = res.admin_rule;
      WxParse.wxParse("detail", "html", detail, page);
      this.setData({
        topicsDet:res,
        topic,
        showLoading: false
      })
    })
  },

  /**
   * 获取帖子列表
   */
  articlesList: function () {
    articles.getArtByTopicOrCir({
      id: this.data.id,
      iden: this.data.iden,
      by: 'top',
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

  /**
   * 点击精选分类
   */
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
    this.articlesList()
  },
})