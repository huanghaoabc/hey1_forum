// pages/group-circle/details/index.js
import { circlesModel } from "../../models/circles.js"
import { articlesModel } from "../../models/articles.js"
const articles = new articlesModel()
const circles = new circlesModel()
var pageNum = 1
const pageSize = 6
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
    cir: {
      key: 'cir',
      id: 0,
      title: ''
    },
    infoArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    pageNum = 1
    let id = options.id;
    if (options.id == 22)
    {
      this.setData({
        tit:'抖音未审核文章'
      })
    }
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
    console.log("id:",this.data.id);
    articles.getArtByTopicOrCir({
      id: this.data.id,
      iden: this.data.iden,
      by: 'cir',
      pageNumber: pageNum,
      pageSize: pageSize,
      shenhe:1
    }).then(res => {
      console.log("ssss=>",res.list);
      
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
      //console.log("eeee=>",list);
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
  },clickTitle: function (e) {
    let id = e.currentTarget.dataset.id;
    let user_id=e.currentTarget.dataset.id;
    let sub_type = e.currentTarget.dataset.subtype
    let cid = e.currentTarget.dataset.cid
    console.log("click",e);
    if (cid == 24)
    {
      wx.navigateTo({
        url: '/pages/admin/shenheshop?id=' + id+"&user_id="+user_id+"&sub_type="+sub_type
      })

    }else if (cid == 25)
    {
      wx.navigateTo({
        url: '/pages/admin/shenheNeed?id=' + id+"&user_id="+user_id+"&sub_type="+sub_type
      })

    }else
    {
      {
        wx.navigateTo({
          url: '/pages/admin/shenheNeedo?id=' + id+"&user_id="+user_id+"&sub_type="+sub_type
        })
  
      }
    }
    
    
  },
})