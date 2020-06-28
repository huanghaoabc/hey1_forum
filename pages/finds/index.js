// pages/finds/index.js
import { circlesModel } from "../../models/circles.js"
const circles = new circlesModel()
import { articlesModel } from "../../models/articles.js"
const articles = new articlesModel()
const app = getApp()
var pageNum = 1
const pageSize = 3
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    hostCircles: [],
    list: [],
    cirList:[],
    checkIndex: 1,
    navTitle: [
      {
        title: '关注',
        iden: 0
      },
      {
        title: '随便看看',
        iden: 1
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    this.circlesList()
    this.latelyCir()
    this.randomArt()
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
    this.setData({
      hostCircles: [],
    })
    this.latelyCir()
    this.circlesList()
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
      this.circlesList()
      this.latelyCir()
      if(this.data.checkIndex == 0){
        this.friendArt()
      }else{
        this.randomArt()
      }
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
    if(this.data.checkIndex == 0){
      this.friendArt()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取用户最近逛的圈
   */
  latelyCir: function(){
    circles.latelyCir().then(res => {
      this.setData({
        hostCircles: res
      })
    })
  },

  /**
   * 获取圈子列表
   */
  circlesList: function () {
    circles.myCir({
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
      this.setData({
        cirList: res.list
      });
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
      list: [],
      isEmpty: false,
      showLoading: true,
    })
    if (index == 1) {
      this.randomArt()
    } else {
      this.friendArt()
    }

  },

  /**
   * 随机获取6篇文章
   */
  randomArt: function(){
    articles.randomArt().then(res => {
      this.setData({
        list: res,
        isEmpty: true,
        showLoading: false
      })
    })
  },

  /**
   * 获取用户关注的好友动态文章
   */
  friendArt: function(){
    articles.friendArt({
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
  }
})