// pages/user-colle/index.js
import { articlesModel } from "../../models/articles.js"
const articles = new articlesModel()
import { commentModel } from "../../models/comment.js"
const comment = new commentModel()
const app = getApp()
var pageNum = 1
const pageSize = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkIndex: 0,
    iden: 0,
    height: (app.globalData.height * 2 + 28) * 2,
    navTitle: [
      {
        title: '收藏',
        iden: 0
      },
      {
        title: '评论',
        iden: 1
      },
      {
        title: '点赞',
        iden: 2
      },
      {
        title: '足迹',
        iden: 3
      },
    ],
    showLoading: true,
    isEmpty: false,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1
    this.setData({
      iden: options.iden,
      checkIndex: options.iden,
      options:options,
      uid:options.user_id
    })
    if (options.iden==1){
      this.myComments()
    }else{
      this.myColl()
    }
    
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
    let iden = this.data.iden
    setTimeout(() => {
      pageNum = 1
      this.setData({
        list: [],
        arrange: false,
        isEmpty: false,
        showLoading: true,
      })
      if (iden == 1) {
        this.myComments()
      } else {
        this.myColl()
      }
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh()
    }, 1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let iden = this.data.iden
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
    if (iden == 1) {
      this.myComments()
    } else {
      this.myColl()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取用户收藏
   */
  myColl: function(){
    articles.myColl({
      iden: 3,
      pageNumber: pageNum,
      pageSize: pageSize
    }).then(res => {
      let list = this.data.list.concat(res.list)
      this.setData({
        list: list,
        totalNum: res.total,
        totalPage: res.total_page,
        showLoading: false
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
   * 获取用户评论
   */
  myComments: function(){
    comment.myComments({
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
    if (iden == 1){
      this.myComments()
    }else{
      this.myColl()
    }
    
  },

  /**
   * 前往文章详情
   */
  toDes: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/article/details/index?id=' + id,
    })
  },

  /**
   * 前往评论
   */
  clicktitle: function(e){
    console.log(e)
    let aid = e.currentTarget.dataset.id;
    let cid = e.currentTarget.dataset.cid;
    // wx.navigateTo({
    //   url: '/pages/article/comment/index?id=' + aid,
    // })
    if (cid=="22")
    {
      //pages/article/details/kuaishou
      wx.navigateTo({
           url: '/pages/article/details/douyin?id=' + aid,
         })
    }
    if (cid=="23")
    {
      //pages/article/details/kuaishou
      wx.navigateTo({
           url: '/pages/article/details/kuaishou?id=' + aid,
         })
    }

    if (cid=="24")
    {
      //pages/article/details/kuaishou
      wx.navigateTo({
           url: '/pages/article/details/shangjia?id=' + aid,
         })
    }
    if (cid=="25")
    {
      //pages/article/details/kuaishou
      wx.navigateTo({
           url: '/pages/article/details/shangjia?id=' + aid,
         })
    }
  },clear:function (e)
  {
    let aid = e.currentTarget.dataset.aid;
    let uid = e.currentTarget.dataset.uid;
    var page = this;
    
    //deleteLishi
    wx.showModal({
      title: '提示',
      content: '确定清除这条浏览记录吗',
      success(res) {
        if (res.confirm) {
          page.setData({
            list:[]
          });
          articles.deleteLishi({
            aid: aid,
            uid: uid
          }).then(res => {
            pageNum = 1;
            page.myColl();
            
            console.log("delete==>",res)
          })
        }
      }
    })

    
  }
})