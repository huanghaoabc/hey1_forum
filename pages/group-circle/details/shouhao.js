// pages/group-circle/details/index.js
import { circlesModel } from "../../../models/circles.js"
import { articlesModel } from "../../../models/articles.js"
const articles = new articlesModel()
const circles = new circlesModel()
const app = getApp()
var pageNum = 1
const pageSize = 6
var gse= app.globalData.gse
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navData: {
      color : '#fff',
      frontColor : '#ffffff',
      bgcolor : '',
      title : ''
    },
    height: (app.globalData.height * 2 + 24) * 2,
    navTitle: gse['list_Tab1'],
    commodity:gse['commodity'],
    commodityIndex:0,
    checkIndex: 0,
    iden: 'All',
    showLoading: true,
    isEmpty: false,
    list: [],
    cir: {
      key: 'cir',
      id: 0,
      title: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    let id = options.id;
    this.setData({
      id
    })
    this.circlesDet()
    this.adminList()
    this.articlesList() 
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
      this.articlesList()
      this.circlesDet()
      this.adminList()
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
      navData.title = this.data.circles.title
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
   * 获取圈子详情
   */
  circlesDet: function(){
    circles.circlesDet({
      id: this.data.id
    }).then(res => {
      let cir = this.data.cir
      cir.id = res.id
      cir.title = res.title
      this.setData({
        circles: res,
        cir
      })
    })
  },

  /**
   * 入圈/出圈
   */
  inCircle: function(){
    circles.follow({
      id: this.data.id
    }).then(res => {
      let data = this.data.circles
      data.followed = data.followed == 0 ? 1 : 0;
      this.setData({
        circles: data
      })
    })
  },

  /**
   * 申请圈主/管理圈子
   */
  adminRule: function(){
    if (this.data.circles.admin == 1){
      wx.showToast({
        title: '功能暂未开放',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.setStorageSync('admin_rule', this.data.circles.admin_rule)
    wx.navigateTo({
      url: '/pages/group-circle/into-rule/index?id=' + this.data.id
    })
  },

  /**
   * 获取圈主列表
   */
  adminList: function(){
    circles.adminList({
      id: this.data.id
    }).then(res => {
      this.setData({
        admins: res
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
      by: 'Acquisition',
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
      let list = this.data.list.concat(res.list);
      for(var i=0; i<list.length;i++)
      {
        
        //this.data.infoArr[i] = JSON.parse(res.list[i].kuaishouinfo);
        //console.log(list[i].douyininfo);
         if(list[i].douyininfo !='')
         {
           
           if(list[i].kuaishouinfo !='')
           {
              list[i].douyininfo = JSON.parse(list[i].kuaishouinfo);
           }
         }
      }
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
    let index = e.currentTarget.dataset.index
    let iden = e.currentTarget.dataset.iden
    pageNum = 1
    this.setData({
      checkIndex: index,
      iden,
      list: [],
      isEmpty: false,
      showLoading: true,
    })
    this.articlesList()
  },gotoarticle:function(e)
  {
    let id = e.currentTarget.dataset.id
    var sub_type = e.currentTarget.dataset.subtype
    wx.navigateTo({
      url: '/pages/article/details/shangjia?id=' + id
    })
  }
})