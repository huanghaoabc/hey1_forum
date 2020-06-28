// pages/follow/index.js
import { userModel } from "../../models/user.js"
import { articlesModel } from "../../models/articles.js"
import { followModel } from "../../models/follow.js"
const articles = new articlesModel()
const user = new userModel()
const follow = new followModel()
const app = getApp()
var pageNum = 1
const pageSize = 6
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    checkIndex: 0,
    navTitle: [
      {
        title: '关注',
        iden: 0
      },
      {
        title: '粉丝',
        iden: 1
      }
    ],
    showLoading: true,
    isEmpty: false,
    list: [],
    iden: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    this.setData({
      user_id: options.user_id,
      iden: options.iden,
      checkIndex: options.iden
    })
    this.follow()
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
      this.follow()
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
    this.follow()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取用户关注/粉丝
   */
  follow: function(){
    user.follows({
      iden: this.data.iden,
      user_id: this.data.user_id
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
    this.follow()
  },

  /**
   * 用户关注/取消关注
   */
  followed: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let data = this.data.list
    follow.followed({
      follow_id: id
    }).then(res => {
      data[index].followed = data[index].followed == 0 ? 1 : 0
      if (data[index].followed == 1) {
        wx.showToast({
          title: '关注成功',
          icon: 'none',
          duration: 2000
        })

      }
      this.setData({
        list: data
      })
    })
  },

  /**
   * 前往动态
   */
  tocenter: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user-center/index?user_id=' + id,
    })
  }
})