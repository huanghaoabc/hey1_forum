//index.js
//获取应用实例
const app = getApp()
import { circlesModel } from "../../models/circles.js"
import {categorysModel} from "../../models/categorys.js"
import { articlesModel } from "../../models/articles.js"
import { topicsModel } from "../../models/topics.js"
import { commonModel } from "../../models/common.js"
const categorys = new categorysModel()
const circles = new circlesModel()
const articles = new articlesModel()
const topics = new topicsModel()
const common = new commonModel()
var pageNum = 10;
const pageSize = 6;
var gse = app.globalData.gse;
Page({
  data: {
    // 此页面 页面内容距最顶部的距离
    height: (app.globalData.height * 2 + 24) * 2,
    checkIndex: 0,
    iden:'all',//iden: 'is_recom',
    showLoading: true,
    isEmpty: false,
    list: [],
  },
  onLoad: function () {
    pageNum = 1
    console.log("gse==>",gse.listSelectTab);
    this.articlesList() //获取帖子列表
    this.articleCount();
    
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
      this.getCircles()
      this.getCategorys()
      this.articlesList()
      this.getMarkCheck() //营销配置
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
   * 获取推荐圈子
   */
  getCircles: function(){
    circles.circlesList().then(res => {
      console.log("circlesList==>",res)
      this.setData({
        hostCircles: res
      })
    })
  },

  /**
   * 获取精选分类
   */
  getCategorys: function(){
    var navTitle = [
      { title: '全部推荐', iden: 'is_recom' }
    ]
    categorys.index().then(res => {
      for(let i = 0; i < res.length; i++){
        let tpm = {}
        tpm.title = res[i].title
        tpm.iden = res[i].id
        console.log(tpm)
        navTitle.push(tpm)
      }
      this.setData({
        navTitle
      })
      console.log(res)
    })
  },

  /**
   * 获取帖子列表
   */
  articlesList: function () {
    articles.getList({
      iden: this.data.iden,
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
     
      let list = this.data.list.concat(res.list);
      list= app.returnNumber(list);
      
      
      this.setData({
        list: list,
        totalNum: res.total,
        totalPage: res.total_page,
        counts:res.counts
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

  /**
   * 获取热门话题
   */
  hostTopics: function(){
    topics.hostTopics().then(res => {
      this.setData({
        hostTopics:res
      })
    })
  },

  /**
   * 点击热门话题
   */
  onClickTopics: function(e){
    console.log(e)
    let id = e.detail.dataset.id
    wx.navigateTo({
      url: '/pages/topic/details/index?id=' + id
    })
  },

  formSubmit: function(e){
    console.log(e)
  },

  /**
   * 营销配置
   */
  getMarkCheck: function(){
    common.getMarkCheck().then(res => {
      wx.setStorage({
        key: "markCheck",
        data: res
      })
    })
  },
  toCircle:function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/group-circle/details/index?id=' + id,
    })
  },toShangjia:function(e)
  {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/group-circle/details/shangjia?id=' + id,
    })
  },clickTitle: function (e) {
    let id = e.currentTarget.dataset.id
    var sub_type = e.currentTarget.dataset.subtype
    console.log("click",e);
    if (sub_type==3)
    {
      wx.navigateTo({
        url: '/pages/article/details/kuaishou?id=' + id
      })

    }else if (sub_type==4)
    {
      wx.navigateTo({
        url: '/pages/article/details/kuaishou?id=' + id
      })
    }else
    {
      wx.navigateTo({
        url: '/pages/article/details/kuaishou?id=' + id
      })
    }
    
  },shouhaoFn:function(e)
  {
    //pages/group-circle/details/shouhao
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/group-circle/details/shouhao?id=' + id
    })
  },articleCount:function ()
  {
    
  },gotoCatalog:function(e)
  {
      let type = e.currentTarget.dataset.type;
      if (type =='topic')
      {
        //pages/topic/index/index
        wx.navigateTo({
          url: '/pages/topic/index/index'
        })
      }else
      {
      //pages/topic/index/index
        wx.navigateTo({
          url: '/pages/group-circle/details/catalog?gettype=' + type
        })
      }
  },clickUser:function (e)
  {

    let userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '/pages/my/myindex/index?user_id=' + userid
    })
  }
})
