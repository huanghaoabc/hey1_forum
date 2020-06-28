// pages/group-circle/details/index.js
import { circlesModel } from "../../../models/circles.js"
import { articlesModel } from "../../../models/articles.js"
const articles = new articlesModel()
const circles = new circlesModel()
var pageNum = 1
const pageSize = 6
const app = getApp()
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
    navTitle: [
      { title: '全部', iden: 'new' },
      { title: '最热', iden: 'host' },
      { title: '精华', iden: 'ess' }
    ],
    height: (app.globalData.height * 2 + 24) * 2,
    jiagetype:0,
    yongjintype:0,
    xiaoliangtype:0,
    commodityIndex:0,
    commodity:gse['commodity'],
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
    where:{
      jiage:0, 
      yongjin:0, 
      xiaoliang:0, 
      Account:0,
    }
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
      by: 'cir',
      pageNumber: pageNum,
      pageSize: pageSize,
      whereArr:this.data.where
    }).then(res => {
      let list = this.data.list.concat(res.list);
      for(var i=0; i<list.length;i++)
      {
        
        //this.data.infoArr[i] = JSON.parse(res.list[i].kuaishouinfo);
        //console.log(list[i].douyininfo);
         if( !isNaN(list[i].salesVolume))
         {
           
           if(list[i].salesVolume >= 9999)
           {
              //list[i].douyininfo = JSON.parse(list[i].kuaishouinfo);
              list[i].salesVolume =(list[i].salesVolume/10000).toFixed(1)+"万"
           }else{
            list[i].salesVolume =(list[i].salesVolume/1000).toFixed(1)+"千"
           }
         }
         if(typeof list[i].content=='string')
         {
         list[i].content = JSON.parse(list[i].content);
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
  },gotoarticle:function(e)
  {
    let id = e.currentTarget.dataset.id
    var sub_type = e.currentTarget.dataset.subtype
    wx.navigateTo({
      url: '/pages/article/details/shangjia?id=' + id
    })
  },jiageSelect:function (e)
  {
    //jiage:0,     yongjin:0,   xiaoliang:0,     Account:0,
    var GetType = e.currentTarget.dataset.jiagetype;
    var where = this.data.where;
    if(GetType == 0)
    {where.jiage='desc';this.setData({jiagetype:1,where})
    }else if (GetType == 1)
    {where.jiage='asc';this.setData({jiagetype:2,where})
    }else if(GetType==2)
    {where.jiage=0;this.setData({jiagetype:0,where})}
    this.setData({
      list: []
    })
    pageNum = 1;
    this.articlesList()
    console.log("价格==>",where,this.data.jiagetype);
  }
  ,yongjinSelect:function (e)
  {
    //jiage:0,     yongjin:0,   xiaoliang:0,     Account:0,
    var GetType = e.currentTarget.dataset.yongjintype;
    var where = this.data.where;
    if(GetType == 0)
    {where.yongjin='desc';this.setData({yongjintype:1,where})
    }else if (GetType == 1)
    {where.yongjin='asc';this.setData({yongjintype:2,where})
    }else if(GetType==2)
    {where.yongjin=0;this.setData({yongjintype:0,where})}
    this.setData({list: []})
    pageNum = 1;
    this.articlesList()
    console.log("佣金==>",where,this.data.yongjintype);
  },xiaoliangSelect:function (e)
  {
    //jiage:0,     yongjin:0,   xiaoliang:0,     Account:0,
    var GetType = e.currentTarget.dataset.xiaoliangtype;
    var where = this.data.where;
    if(GetType == 0)
    {where.xiaoliang='desc';this.setData({xiaoliangtype:1,where})
    }else if (GetType == 1)
    {where.xiaoliang='asc';this.setData({xiaoliangtype:2,where})
    }else if(GetType==2)
    {where.xiaoliang=0;this.setData({xiaoliangtype:0,where})}
    this.setData({list: []})
    pageNum = 1;
    this.articlesList()
    console.log("销量==>",where,this.data.xiaoliangtype);
  },itemNameClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where = this.data.where;
    if (index == 0)
    {
      where.Account=0;
    }else{
      where.Account=this.data.commodity[index].name;
    }
    
    this.setData({
      commodityIndex:index,
      where,
      list:[]
    })
    pageNum = 1;
    this.articlesList()
    console.log("销量==>",where,index);
  }
})