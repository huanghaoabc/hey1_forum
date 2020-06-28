// pages/user-center/index.js
import { userModel } from "../../../models/user.js"
import { articlesModel } from "../../../models/articles.js"
import { followModel } from "../../../models/follow.js"
const follow = new followModel()
const articles = new articlesModel()
const user = new userModel()
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
        title: '动态',
        iden: 0
      }
    ],
    showLoading: true,
    isEmpty: false,
    list: [],
    need: [],
    myindexTab:0,
    tabType:'myrelease',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: options.user_id,
      options:options
    })
    pageNum = 1
    this.articlesList() //获取帖子列表
    //this.articlesList2();
    this.getUserMsg()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    console.log(e)
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
    this.articlesList();
    //this.articlesList2();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取用户信息
   */
  getUserMsg: function () {
    user.getUserMsg({
      user_id: this.data.user_id
    }).then(res => {
      if (res.length <= 0) {
        res = ''
      }
      this.setData({
        user: res
      })
    })
  },

  /**
   * 获取帖子列表
   */
  articlesList: function () {
    articles.userArt({
      user_id: this.data.user_id,
      pageNumber: pageNum,
      pageSize: pageSize,
      tabType:'myshangpin'
    }).then(res => {
      let list = this.data.list.concat(res.list);
      for(var i=0; i<list.length;i++)
      {
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
  },articlesList2: function () {
    articles.userArt({
      user_id: this.data.user_id,
      pageNumber: pageNum,
      pageSize: pageSize,
      tabType:'myneed'
    }).then(res => {
      let list = this.data.need.concat(res.list);
      for(var i=0; i<list.length;i++)
      {
         if(list[i].douyininfo !='')
         {
           if(list[i].kuaishouinfo !='')
           {
            list[i].douyininfo = JSON.parse(list[i].kuaishouinfo);
           }
         }
      }
      this.setData({
        need: list,
        needtotalNum: res.total,
        needtotalPage: res.total_page,
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
   * 用户关注/取消关注
   */
  followed: function () {
    let user = this.data.user
    follow.followed({
      follow_id: user.user.id
    }).then(res => {
      user.followed = user.followed == 0 ? 1 : 0
      if (user.followed == 1) {
        user.fans++
        wx.showToast({
          title: '关注成功',
          icon: 'none',
          duration: 2000
        })
      }else{
        user.fans--
      }
      this.setData({
        user
      })
    })
  },

  toFollow: function (e) {
    console.log(e)
    let iden = e.currentTarget.dataset.iden
    wx.navigateTo({
      url: '/pages/follow/index?iden=' + iden + '&user_id=' + this.data.user.user.id,
    })
  },

  toJubao: function(){
    wx.navigateTo({
      url: '/pages/report/index?to_user_id=' + this.data.user_id + '&type=1&to_id=' + this.data.user_id
    })
  },TabFn:function (e)
  {
    let index = e.currentTarget.dataset.index;
    if(index == 0)
    {
      var type ='myrelease';
    }else
    {
      var type ='myneed';
    }
    this.setData({
      myindexTab:index,
      tabType:type
    });
    pageNum = 1;
  },shangjia:function (e)
  {
    var page = this;
    console.log(e.currentTarget.dataset.id);
    var aid = e.currentTarget.dataset.id;
    articles.shangjia({
      aid: aid,
      status:1
    }).then(res => {
      page.setData({
        list:[]
      })
        page.onLoad(page.data.options);
    })
  },xiajia:function (e)
  {
    var page = this;
    console.log(e.currentTarget.dataset.id);
    var aid = e.currentTarget.dataset.id;
    articles.shangjia({
      aid: aid,
      status:0
    }).then(res => {
      page.setData({
        list:[]
      })
      page.onLoad(page.data.options);
    })
  }
})