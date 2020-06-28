// pages/release/release.js
const app = getApp()
var weigh = 0
import {
  HTTP
} from "../../utils/http.js";
import { articlesModel } from "../../models/articles.js"
import { commonModel } from "../../models/common.js"
import Dialog from '../../vant-weapp/dist/dialog/dialog';
import Toast from '../../vant-weapp/dist/toast/toast';
const articles = new articlesModel()
const common = new commonModel()
const http = new HTTP()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: (app.globalData.height * 2 + 24) * 2,
    is_sort: true,
    is_jiage:false,
    title: '',
    topic: {
      id: 0,
      title: ''
    },
    cir: {
      id: 26,
      title: ''
    },
    clases: {
      id: 0,
      title: ''
    },
    video_url: '',
    subType: 12,
    data: [
      {
        type: 1,      //类型：1=文本，2=图片
        value: '',    //值
        aside: '',    //旁白
        is_aside: 0,  //是否有旁白
        weigh: weigh      //排序
      }
    ],
    fandsNumber:'',
    playNumnber:'',

    videoLim: 0,
    imagesArr:['首页','数据图','粉丝画像','其它图'],
    playTypeArr:['破万','破十万','破五十万','破百万','破千万'],
    fandsNeedArr:['千粉','万粉','十万粉','百万粉'],
    fandsNeedArrIndex:0,
    playTypeArrIndex:0,
    show: false,
    redSet: {
      status: false,
      redMoney: 0,
      redNumber: 0
    },
    sellTitle:"出售",
    Gender:['女','男'],
    GenderIndex:0,
    realNameArr:['否','是'],
    shopwindowArr:['否','是'],
    shopwindowArrIndex:0,
    BluevArr:['否','是'],
    BluevArrIndex:0,
    realNameArrIndex:0,
    platformArr:['抖音','快手'],
    platformArrIndex:0,
    StarArr:['未知','明星号','三无号','精品号','大鱼号','小鱼号'],
    StarArrIndex:0,
    needTypeArr:['1000粉橱窗号','1000粉三五','三千分三无','三千分橱窗','千粉撸过的号','万粉橱窗号','万粉三无号','万粉撸过的号','万粉评级号','万粉违规号','蓝V白号','蓝V千粉三无号','蓝V千粉橱窗号','垂直号','自定义需求'],
    needTypeArrIndex:0,
    punishArr:['否','是'],
    punishArrIndex:0,
    SocietyArr:['否','是'],
    SocietyArrIndex:0,
    StoreArr:['否','是'],
    StoreArrIndex:0,
    need_count:'',
    sendinfo:{
      'need_type':'1000粉橱窗号', //需求类型
      'platform_type':'抖音' //需求平台
    }
 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var arcId = options.id;
    var token = wx.getStorageSync('token')
    var cirSync = wx.getStorageSync('cir')
    var topicSync = wx.getStorageSync('topic')
    var markCheck = wx.getStorageSync('markCheck')
    this.setData({
      markCheck,
      subType: options.subtype,
      arcId:arcId
    })
    if(!token){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }
    if (cirSync){
      let cir = this.data.cir
      cir.id = cirSync.id
      cir.title = cirSync.title
      this.setData({
        cir
      })
    }
    if (topicSync) {
      let topic = this.data.topic
      topic.id = topicSync.id
      topic.title = topicSync.title
      this.setData({
        topic
      })
    }
    this.setData({
      subType: options.subType
    })
    common.videoLim().then(res => {
        this.setData({
          videoLim: res
        })
    })
    this.getDes();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 输入标题
   */
  inputTitle: function (event){
    this.setData({
      title: event.detail
    })
    
  },inputJiaGe:function (e)
  {
    
    if(!isNaN(e.detail.value)){
      var pjiage = "￥"+e.detail.value;  
      //return true;
      }else{
        var pjiage = e.detail.value;
      }
     this.setData({
       jiage: pjiage
     })
     console.log(pjiage);
  },

  inputPlayNum:function (e)
  {
	  this.setData({
       playNum: e.detail.value
     })
  },inputFandsNum :function (e)
  {
	  this.setData({
       fandsNum: e.detail.value
     })
	  
  },

  /**
   * 添加文本
   */
  addText: function(){
    console.log(weigh)
    weigh = weigh + 10
    let row = {
      type: 1, 
      value: '',    
      aside: '',    
      is_aside: 0,  
      weigh: weigh
    }
    let data = this.data.data 
    data.push(row)
    this.setData({
      data
    })
  },

  /**
   * 输入文本内容
   */
  inputContent: function(e){
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    let data = this.data.data
    data[index].value = value
  
    this.setData({
      data
    })

  },

  /**
   * 删除文本
   */
  delText: function(e){
    console.log(e)
    var page = this
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定删除该内容吗',
      success(res) {
        if (res.confirm) {
          let data = page.data.data
          let dataSA = data[index].value="http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png";
          let dataClose = data[index].isclose=false
          //data.splice(index, 1)
          page.setData({
            data,
            dataSA,
            dataClose
          })
        } else if (res.cancel) {
          return
        }
      }
    })
  },

  /**
   * 选择图片
   */
  chooseImg: function(e){
    var page = this
    var index = e.target.dataset.index;
    console.log("eee",index);
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        weigh = weigh + 10
        let row = {
          type: 2,
          value: res.tempFilePaths[0],
          aside: '',
          is_aside: 0,
          weigh: weigh
        }
        let data = page.data.data;
        let dataIndex = data[index].value=res.tempFilePaths[0];
        let dataIndexVal = data[index].isclose=true;
        //data.push(row)
        page.setData({
          data,
          dataIndex,
          dataIndexVal
        })
        console.log("chooseImg",data);
      }
    })
  },

  /**
   * 添加/删除旁白
   */
  changeAside: function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let data = this.data.data
    data[index].is_aside = data[index].is_aside == 0 ? 1 : 0
    if (data[index].is_aside == 0){
      data[index].aside = ''
    }
    this.setData({
      data
    })
  },

  /**
   * 输入旁白
   */
  inputAside: function(e){
    let index = e.currentTarget.dataset.index
    let value = e.detail.value
    let data = this.data.data
    data[index].aside = value
    this.setData({
      data
    })
  },

  /**
   * 排序
   */
  changeSort:function(e){
    console.log(e)
    let data = this.data.data
    let value = e.detail
    let index = e.target.dataset.index
    data[index].weigh = value
    this.setData({
      data
    })
  },

  /**
   * 排序开关
   */
  switchSort:function(){
    let is_sort = this.data.is_sort ? false : true
    if(!is_sort){
      let data = this.data.data
      data.sort(this.compare('weigh'))
      this.setData({
        data
      })
    }
    this.setData({
      is_sort
    })
  },

  /**
   * 数组根据元素排序
   */
  compare: function(property){
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },

  /**
   * 选话题
   */
  chooseTopic: function(){
    wx.navigateTo({
      url: '/pages/topic/index/index?check=1'
    })
  },

  /**
   * 选圈子
   */
  chooseCri: function(){
    wx.navigateTo({
      url: '/pages/group-circle/index/index?check=1'
    })
  },

  /**
   * 选精选分类
   */
  chooseClases: function(){
    wx.navigateTo({
      url: '/pages/search-class/search-class?check=1'
    })
  },

  /**
   * 删除话题
   */
  delTopic: function(){
    let topic = {
      id: 0,
      title: ''
    }
    this.setData({
      topic
    })
  },

  /**
   * 删除圈子
   */
  delCir: function(){
    let cir = {
      id: 0,
      title: ''
    }
    this.setData({
      cir
    })
  },

  /**
   * 删除精选分类
   */
  delClases: function () {
    let clases = {
      id: 0,
      title: ''
    }
    this.setData({
      clases
    })
  },

  /**
   * 发帖前检测
   */
  subBefore: function(){
    if(this.data.title.length < 6 || this.data.title.length > 30){
      wx.showToast({
        title: '标题在6-30字之间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(
      this.data.topic.id == 0 &&
      this.data.cir.id == 0 &&
      this.data.clases.id == 0 
    ){
      wx.showToast({
        title: '圈子、话题、分类至少选择一个',
        icon: 'none',
        duration: 2000
      })
      return
    }

    var data = this.data.data
    var imageNumber = 0
    if (this.data.subType == 3){
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == '') {
          wx.showToast({
            title: '请填写内容',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (data[i].type == 2) {
          imageNumber++
        }
      }
    }
    
    if(this.data.need_count =='')
    {
      wx.showToast({
        title: '请填写需求数量',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.video_url != '')
    {

      wx.showLoading({
        mask: true,
        title: '正在上传视频',
      })
      http.uploadFile({
        filePath: this.data.video_url
      }).then(res => {
        this.subData(res);
        wx.hideLoading()
      })
      
    }

    /*
    if (this.data.subType == 2){
      if (this.data.video_url == ''){
        wx.showToast({
          title: '请选择视频',
          icon: 'none',
          duration: 2000
        })
        return
      }else{
        wx.showLoading({
          mask: true,
          title: '正在上传视频',
        })
        http.uploadFile({
          filePath: this.data.video_url
        }).then(res => {
          this.subData(res);
          wx.hideLoading()
        })
      }
      
    }
    */
    if (this.data.subType == 3){
      if (imageNumber > 0){
        wx.showLoading({
          mask: true,
          title: '正在上传图片',
        })
        var index = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 2 ) {
              if(data[i].value !='http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png')
              {
            http.uploadFile({
              filePath: data[i].value
            }).then(res => {
              console.log("res==>",res);
              
              data[i].value = res
              index++
              if (index == imageNumber) {
                wx.hideLoading()
                this.subData();
              }
            })
          }else
          {
            index++
            data[i].value = "0";
              if (index == imageNumber) {
                wx.hideLoading()
                this.subData();
              }
          }
          }
        }
      }else{
        this.subData()
      } 
    }
    this.subData();
  },

  /**
   * 发帖
   */
  subData: function(res = ''){
    wx.showLoading({
      title: '发帖中',
    })
   
    var postData = {}
    postData.title = this.data.title;
    postData.subType = 12;
    postData.topic = this.data.topic;
    postData.cir = this.data.cir;
    postData.clases = this.data.clases;
    postData.data = this.data.data;
    postData.video_url = res;
    postData.redSet = this.data.redSet;
    //postData.jiage = this.data.jiage;
    postData.kuaishouinfo = this.data.sendinfo;

    /**/
    postData.need_count =this.data.need_count;

    /**/

      /*jiage playNum fandsNum  */
    /*-----*/
    console.log('postData',postData);
    articles.subData({
      postData
    }).then(res => {

      if (postData.redSet.status){
        wx.hideLoading()
        wx.showLoading({
          title: '正在创建支付',
          mask: true
        })
        articles.payRed({ id: res.id}).then( s=>{
          wx.hideLoading();

          wx.requestPayment({
            timeStamp: s.pay_data.timeStamp,
            nonceStr: s.pay_data.nonceStr,
            package: s.pay_data.package,
            signType: s.pay_data.signType,
            paySign: s.pay_data.paySign,
            success(res) {
              wx.showModal({
                title: '提示',
                content: '发帖成功',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              });
            },
            fail(res) {
              wx.showModal({
                title: '提示',
                content: '支付失败,您的帖子已发表,但红包帖功能不生效',
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              });
            }
          })
        })

      }else{
          wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '发帖成功',
          showCancel:false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })

            }
          }
        })
      }

     
    })
  },

  /**
   * 添加视频
   */
  addVideo: function(){
    var page = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res)
        let sizi = page.data.videoLim*1024*1024
        if (res.size>sizi){
          wx.showToast({
            title: '视频超过' + page.data.videoLim + 'MB，无法上传',
            icon: 'none',
            duration: 2000
          })
          return
        }
        page.setData({
          video_url: res.tempFilePath
        })
      }
    })
  },

  formSubmit: function (e) {
    console.log("formSubmit",e)
    let formId = e.detail.formId
    common.saveFormId({
      formId: formId,
      use_max: 1
    }).then(res => {

    })
  },

  showRedSet: function(){
    this.setData({
      show: true
    })
  },

  confResSet: function(){
    let redSet = this.data.redSet
    var page = this
    if (redSet.status){
      if (redSet.redMoney == 0 || redSet.redMoney == '' || redSet.redNumber == 0 || redSet.redNumber == ''){
        wx.showModal({
          title: '',
          showCancel: false,
          content: '请填写正确红包参数',
          success(res) {
            if (res.confirm) {
              page.setData({
                show: true
              })
            }
          }
        })
      } else if (redSet.redMoney / redSet.redNumber < 0.01){
        wx.showModal({
          title: '',
          showCancel: false,
          content: '单个红包金额不能少于0.01元',
          success(res) {
            if (res.confirm) {
              page.setData({
                show: true
              })
            }
          }
        })
      }else{
        page.setData({
          show: false
        })
      }

    }else{
      page.setData({
        show: false
      })
    }
  },

  /**
   * 开启或关闭红包贴
   */
  changeRedStatus: function(){
    let redSet = this.data.redSet
    redSet.status = redSet.status ? false : true
    this.setData({
      redSet
    })
  },

  /**
   * 绑定红包值
   */
  bindRedData: function(e){
    console.log(e)
    let value = e.detail
    let type = e.currentTarget.dataset.type
    let redSet = this.data.redSet
    if(type == '1'){
      redSet.redMoney = value
    }else{
      redSet.redNumber = value
    }

    this.setData({
      redSet
    })
  },

  showRedNumMsg: function(){
    wx.showModal({
      title: '',
      showCancel: false,
      content: '如红包个数为10个，系统将生成10个随机红包，10个随机红包相加总额为设置的红包金额(类似微信手气红包)',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },switch1Change:function (e)
  {

      console.log(e.detail.value);

  },isGender:function (e)
  {
    let data = this.data.data;
    let g = this.data.sendinfo;
    data.Gender = e.detail.value;
    g.is_Gender = this.data.Gender[e.detail.value];
    this.setData({
      data,
      GenderIndex: e.detail.value,
      g,
      Gender:this.data.Gender[e.detail.value]
    })
    console.log("粉丝偏向:",g.is_Gender,g)
  },
  fandsCount:function (e)
  {
    var fandC = e.detail.value;  
    let g = this.data.sendinfo;
    g.fands_count=fandC
     this.setData({
      g
     })
     console.log("粉丝数量：",g.fands_count);
  },playCount:function (e)
  {
    var playC = e.detail.value;  
    let g = this.data.sendinfo;
    g.play_count=playC
     this.setData({
      g
     })
     console.log("播放数量：",g.play_count);
  },priceCount:function (e)
  {
    var priceC = e.detail.value;  
    let g = this.data.sendinfo;
    g.price_count=priceC
     this.setData({
      g,
      jiage:priceC
     })
     console.log("价格：",g.price_count);
  },iswhether:function (or)
  {
      if (or)
      {
        return '是';
      }else{
        return '否';
      }

  },isStar:function (e)
  {
    let data = this.data.data;
    let g = this.data.sendinfo;
    data.StarArr = e.detail.value;
    g.is_Gender = this.data.StarArr[e.detail.value];
    this.setData({
      data,
      StarArrIndex: e.detail.value,
      g,
      AccountType:this.data.StarArr[e.detail.value]
    })
    console.log("分析偏向:",g.is_Gender,g)
  },isRealName:function (e)
  {
    let g = this.data.sendinfo;
    g.is_realName= this.data.realNameArr[e.detail.value];
    this.setData({
      g,
      realNameArrIndex:e.detail.value,
      Realname:this.data.realNameArr[e.detail.value]
     })
     console.log("是否实名:",g.is_realName,g)
  },isShopwindow:function (e)
  {
    let g = this.data.sendinfo;
    g.is_shopwindow= this.data.shopwindowArr[e.detail.value]
    this.setData({
      g,
      shopwindowArrIndex:e.detail.value,
      Chuchuang:this.data.shopwindowArr[e.detail.value]

     })
     console.log("是否开通橱窗:",g.is_shopwindow,g)
  }
  ,isBlueV:function (e)
  {
    let g = this.data.sendinfo;
    g.is_blueV= this.data.BluevArr[e.detail.value]
    this.setData({
      g,
      BluevArrIndex:e.detail.value
     })
     console.log("是否开通蓝V:",g.is_blueV,g)
  },isPunish:function (e)
  {
    let g = this.data.sendinfo;
    g.is_punish= this.data.punishArr[e.detail.value]
    this.setData({
      g,
      punishArrIndex:e.detail.value
     })
     console.log("是否违规:",g.is_punish,g)
  },isSociety:function (e)
  {
    let g = this.data.sendinfo;
    g.is_society= this.data.SocietyArr[e.detail.value]
    this.setData({
      g,
      SocietyArrIndex:e.detail.value
     })
     console.log("是否加入公会:",g.is_society,g)
  },
  
  // isStore:function (e)
  // {
  //   let g = this.data.sendinfo;
  //   g.is_store= this.data.StoreArr[e.detail.value]
  //   this.setData({
  //     g,
  //     StoreArrIndex:e.detail.value
  //    })
  //    console.log("是否开通小店:",g.is_store,g)
  // }
  isStore:function (e)
  {
    let g = this.data.sendinfo;
    g.is_store= this.data.StoreArr[e.detail.value];
    this.setData({
      g,
      StoreArrIndex:e.detail.value
     })
     console.log("是否开通小店:",g.is_store,g)
  },needType:function (e)
  {
    let g = this.data.sendinfo;
    g.need_type= this.data.needTypeArr[e.detail.value];
    this.setData({
      g,
      needTypeArrIndex:e.detail.value
     })
     console.log("需求类型:",g.need_type,g)
  },platformFn:function (e)
  {
    let g = this.data.sendinfo;
    g.platform_type= this.data.platformArr[e.detail.value];
    this.setData({
      g,
      platformArrIndex:e.detail.value
     })
     console.log("需求平台:",g.platform_type,g)
  }
  ,fandsCountFn:function (e)
  {
     let scount =e.detail.value;
     let g = this.data.sendinfo;
     g.fands_count_bak=scount;
    if (!isNaN(scount))
    {
      if (scount.length ==4)
      {
        var fandsNu = (scount/1000).toFixed(1)+"K"
        g.fands_count=fandsNu;
        console.log("sb",fandsNu);
      }
      if (scount.length >=5)
      {
        //var fandsNu = Math.round(scount/10000).toFixed(2)+"W";
        var fandsNu = (scount/10000).toFixed(1)+"W";
        g.fands_count=fandsNu;
        console.log("sb",fandsNu);
      }

    }else
    {
      g.fands_count=scount;
    }
    this.setData({
     g,
     fandsNumber:fandsNu,
     fandsNum:fandsNu
    })
    console.log("粉丝数量：",g.fands_count,g);
  }
  ,playCountFn:function (e)
  {
     let scount =e.detail.value;
     let g = this.data.sendinfo;
     g.play_count_bak=scount
    if (!isNaN(scount))
    {
      if (scount.length ==4)
      {
        var fandsNu = (scount/1000).toFixed(1)+"K"
        g.play_count=fandsNu;
        console.log("sb",fandsNu);
      }
      if (scount.length >=5)
      {
        //var fandsNu = Math.round(scount/10000).toFixed(2)+"W";
        var fandsNu = (scount/10000).toFixed(1)+"W";
        g.play_count=fandsNu;
        
        console.log("sb",fandsNu);
      }

    }else
    {
      g.play_count=scount;
    }
    this.setData({
     g,
     playNumnber:fandsNu,
     playNum:fandsNu
    })
    console.log("播放数量：",g.play_count,g);
  },needCount:function (e)
  {
    var priceC = e.detail.value;  
     this.setData({
      need_count:priceC
     })
     console.log("需求数量:",this.data.need_count);
  },playCountType:function (e)
  {
    let g = this.data.sendinfo;
    g.playCount_type= this.data.playTypeArr[e.detail.value];
    this.setData({
      g,
      playTypeArrIndex:e.detail.value
     })
     console.log("播放类型:",g.playCount_type,g)
  },fandsNeedFn:function(e)
  {
    let g = this.data.sendinfo;
    g.fands_need= this.data.fandsNeedArr[e.detail.value];
    this.setData({
      g,
      fandsNeedArrIndex:e.detail.value
     })
     console.log("粉丝需求:",g.fands_need,g)
  },returnIndex (arr,i)
  {
    console.log("test->returnIndex",arr.indexOf(i));
    return arr.indexOf(i);
  },getDes: function(){
    console.log("testId==>",this.data.arcId);
    articles.getDes({
      id: this.data.arcId
    }).then(res => {
      console.log("sssssssss",res,JSON.parse(res.kuaishouinfo))
      var ks = JSON.parse(res.kuaishouinfo);
      var con = JSON.parse(res.content);
      console.log("con->",con);
      let g = this.data.sendinfo;
      let d = this.data.data
      //'need_type':'1000粉橱窗号', //需求类型
      //'platform_type':'抖音' //需求平台
      g.need_type= ks.need_type;
      g.platform_type = ks.platform_type;
      d[0].value=con[0].value
      console.log(d)
      
      let cir = this.data.cir
      cir.id = res.circle_id
      cir.title = res.circle.title
      
      this.setData({
        data1: res,
        ks:ks,
        detailInfo:res,
          title:res.title,
          fandsNumber:res.need_count,
          playNumnber:res.playNum,
          g,
          uid:res.user_id,
          subType:res.sub_type,
          cir,
          needTypeArrIndex:this.returnIndex(this.data.needTypeArr,ks.need_type),
          platformArrIndex:this.returnIndex(this.data.platformArr,ks.platform_type),
          needCount:res.need_count,
          data:d
         
      })
    })
  }
})