// pages/group-circle/details/index.js
import { circlesModel } from "../../../models/circles.js"
import { articlesModel } from "../../../models/articles.js"
const articles = new articlesModel()
const circles = new circlesModel()
const app = getApp()
var pageNum = 1
const pageSize = 6
var gse = app.globalData.gse;
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
    navTitle: gse.list_Tab1,
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
    where:{
      jiage:0, //desc or asc
      accounttype:0, //1=千粉号，2=万粉号，3=橱窗,4=蓝V
      createtime:0, //desc or asc 
      Account:0,
      Playtype:0,
      FandsNumer:0,
      FandsType:0,
      ChuchungType:0,
      RealnameType:0,
      BlueVType:0
    },selectType:'千粉号',
    timetype:0,
    jiagetype:0,
    ShowSelectBox:false,
    atypeIndex:0,
    shouShaixuan:false, //开启筛选遮罩
    AccountArr:gse.listSelectTab[0].type,
    Playtype:gse.listSelectTab[1].type,
    FandsNumer:gse.listSelectTab[2].type,
    FandsType:gse.listSelectTab[3].type,
    ChuchungType:gse.listSelectTab[4].type,
    RealnameType:gse.listSelectTab[5].type,
    BlueVType:gse.listSelectTab[6].type,
    AccounttypeIndex:0,
    leftTabSelect:['账号类型','播放量','粉丝量','粉丝属性','橱窗','实名','蓝V'],
    leftTabSelectIndex:0,
	PlaytypeIndex:0,
	FandsNumerIndex:0,
	FandsTypeIndex:0,
	ChuchungTypeIndex:0,
	RealnameTypeIndex:0,
	BlueVTypeIndex:0,
	
	
	
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    pageNum = 1;
    console.log("==>",options);
    let id = 99999;
    let nav = this.data.navData;
    if (options.gettype=='chuchuanghao')
    {
        nav.title="橱窗号";
    }
    if (options.gettype=='qianfenhao')
    {
        nav.title="千粉号";
    }
    if (options.gettype=='wanfenhao')
    {
        nav.title="万粉号";
    }
    console.log("nav==>",nav);
    this.setData({
      id,
      navData:nav,
      gettype:options.gettype
    })
    //this.circlesDet()
    //this.adminList()
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
    // let navData = {}
    // navData.color = '#fff'
    // navData.frontColor = '#ffffff'
    // navData.bgcolor = ''
    // navData.title = ''
    // if (scrollTop > 50) {
    //   navData.frontColor = '#000000'
    //   navData.color = '#000'
    //   navData.bgcolor = '#fff'
    //   navData.title = this.data.circles.title
    // }
    // wx.setNavigationBarColor({
    //   frontColor: navData.frontColor,
    //   backgroundColor: '#ff0000',
    //   animation: {
    //     duration: 400,
    //     timingFunc: 'easeIn'
    //   }
    // })
    // this.setData({
    //   //navData
    // })
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
    console.log("id==>",this.data.id)
    articles.getArtByTopicOrCir({
      id: this.data.id,
      iden: this.data.iden,
      by: this.data.gettype,
      pageNumber: pageNum,
      pageSize: pageSize,
      whereArr:this.data.where
    }).then(res => {
      console.log("ssss=>",res.list);
      
      let list = this.data.list.concat(res.list);
      list = app.returnNumber(list);
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
    let index = e.currentTarget.dataset.index
    // let iden = e.detail.dataset.iden
    pageNum = 1;
    var aid = 0;
    if (index == 0)
    {
        aid=99999
    }else if(index == 1)
    {
      aid=22
    }else if(index == 2)
    {
      aid=23
    }
    this.setData({
      checkIndex: index,
      
      list: [],
      isEmpty: false,
      showLoading: true,
      id:aid
    })
    this.articlesList()
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
        url: '/pages/article/details/douyin?id=' + id
      })
    }else
    {

      wx.navigateTo({
        url: '/pages/article/details/index?id=' + id
      })
    }
  },timeSelect:function (e)
  {
    // where:{
    //   jiage:0,
    //   fandsNum:0, //千粉号，万粉号，
    //   Chuchuang:0, //橱窗号
    //   createtime:0, //desc or asc 
    //   AccountType:0
    // }
    var GetType = e.currentTarget.dataset.timetype;
    var where = this.data.where;
    if(GetType == 0)
    {
      where.createtime='desc';
      this.setData({
        timetype:1,
        where
      })
    }else if (GetType == 1)
    {
      where.createtime='asc';
      this.setData({
        timetype:2,
        where
      })
    }else if(GetType==2)
    {
      where.createtime=0;
      this.setData({
        timetype:0,
        where
      })
    }
    this.setData({
      list: []
    })
    pageNum = 1;
    this.articlesList()
    console.log("time==>",where,this.data.timetype);
  },jiageSelect:function (e)
  {
    var GetType = e.currentTarget.dataset.jiagetype;
    var where = this.data.where;
    if(GetType == 0)
    {
      where.jiage='desc';
      this.setData({
        jiagetype:1,
        where
      })
    }else if (GetType == 1)
    {
      where.jiage='asc';
      this.setData({
        jiagetype:2,
        where
      })
    }else if(GetType==2)
    {
      where.jiage=0;
      this.setData({
        jiagetype:0,
        where
      })
    }
    this.setData({
      list: []
    })
    pageNum = 1;
    this.articlesList()
    console.log("time==>",where,this.data.jiagetype);
  },ShowSelectBoxFn:function ()
  {
    this.setData({
      ShowSelectBox:!this.data.ShowSelectBox
    })
  },clickAccount:function(e)
  {
    var atype = e.currentTarget.dataset.atype;
    var where = this.data.where;
    where.accounttype=atype;
    var t=['','千粉号','万粉号','橱窗号','蓝V号'];
    this.setData({
      list: [],
      atypeIndex:atype,
      where,
      selectType:t[atype],
      atype:atype
    })
    console.log("time==>",where,this.data.atypeIndex);
    pageNum = 1;
    this.articlesList()
  },shouShaixuanFn:function ()
  {
    console.log("未重置：",this.data.where);
    this.setData({
      shouShaixuan:!this.data.shouShaixuan,
      ShowSelectBox:false,
    })
    this.chongzhiFn();
    console.log("已重置",this.data.where);
  },closeShaixuanFn:function ()
  {
    this.setData({
      shouShaixuan:false,
      ShowSelectBox:false
    })
  },LeftTabClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    this.setData({
      leftTabSelectIndex:index
    })
  },
  /*
  <!-- 
  Accounttype:['','明星','影视','娱乐'],
    Playtype:['','十万+','五十万+','百万+','五百万+','千万+'],
    FandsNumer:['','千粉','万粉','十万粉','百万粉','千万粉以以上'],
    FandsType:['','女','男'],
    ChuchungType:['','否','是'],
    RealnameType:['','否','是'],
    BlueVType:['','否','是'],
 -->
  */
  AccountTagClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.Account=this.data.AccountArr[index].name;
      //AccounttypeIndex
      this.setData({
        AccounttypeIndex:index,
        where
      })
      console.log("账号类型:where==>",this.data.where)
  },
  PlaytypeClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.Playtype=this.data.Playtype[index].index;
      //AccounttypeIndex
      this.setData({
        PlaytypeIndex:index,
        where
      })
      console.log("播放量：where==>",this.data.where)
  },
  FandsNumerClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.FandsNumer=this.data.FandsNumer[index].index;
      //AccounttypeIndex
      this.setData({
        FandsNumerIndex:index,
        where
      })
      console.log("粉丝量：where==>",this.data.where)
  },
  ChuchungTypeClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.ChuchungType=this.data.ChuchungType[index].index;
      //AccounttypeIndex
      this.setData({
        ChuchungTypeIndex:index,
        where
      })
      console.log("橱窗：where==>",this.data.where)
  }
  ,
  RealnameTypeClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.RealnameType=this.data.RealnameType[index].index;
      //AccounttypeIndex
      this.setData({
        RealnameTypeIndex:index,
        where
      })
      console.log("实名：where==>",this.data.where)
  },
  FandsTypeClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.FandsType=this.data.FandsType[index].index;
      //AccounttypeIndex
      this.setData({
        FandsTypeIndex:index,
        where
      })
      console.log("性别：where==>",this.data.where)
  },chongzhiFn:function ()
  {
    let row={
      jiage:0, //desc or asc
      accounttype:0, //1=千粉号，2=万粉号，3=橱窗,4=蓝V
      createtime:0, //desc or asc 
      Account:0,
      Playtype:0,
      FandsNumer:0,
      FandsType:0,
      ChuchungType:0,
      RealnameType:0,
      BlueVType:0
    }
    this.setData({
      where:row,
      ChuchungTypeIndex:0,
      RealnameTypeIndex:0,
      BlueVTypeIndex:0,
      AccounttypeIndex:0,
      PlaytypeIndex:0,
      FandsNumerIndex:0,
      FandsTypeIndex:0,
      timetype:0,
      jiagetype:0,
      atype:0
    });
  },
  BlueVTypeClick:function (e)
  {
    var index = e.currentTarget.dataset.index;
    var where=this.data.where
    where.BlueVType=this.data.BlueVType[index].index;
      //AccounttypeIndex
      console.log(index);
      this.setData({
        BlueVTypeIndex:index,
        where
      })
      console.log("蓝V：where==>",this.data.where)
  },tijiao:function ()
  {
    this.setData({
      list: [],
      shouShaixuan:false
    })
    pageNum=1
    this.articlesList()
  },closeAccountButton:function()
  {
    let g= this.data.where;
    g.Account=0
    this.setData({
      AccounttypeIndex:0,
      g
    })
    console.log("close==>",g)
  }
})