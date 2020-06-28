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
var gse = app.globalData.gse
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
      id: 24,
      title: ''
    },
    clases: {
      id: 0,
      title: ''
    },
    video_url: '',
    subType: 5,
    data: [
      {
        type: 1,      //类型：1=文本，2=图片
        value: '',    //值
        aside: '',    //旁白
        is_aside: 0,  //是否有旁白
        weigh: weigh,      //排序
        typename:'产品链接',
        typeDesc:'请输入产品链接'
      },{
        type: 1,      
        value: '',    
        aside: '',    
        is_aside: 0,  
        weigh: weigh,      
        typename:'定向链接',
        typeDesc:'请输入定向链接'
      },{
        type: 1,      
        value: '',    
        aside: '',    
        is_aside: 0,  
        weigh: weigh,      
        typename:'素材链接',
        typeDesc:'请输入素材链接'
      },{
        type: 1,      
        value: '',    
        aside: '',    
        is_aside: 0,  
        weigh: weigh,      
        typename:'申请详细',
        typeDesc:'请输入申请详细'
      },{
        type: 1,      
        value: '',    
        aside: '',    
        is_aside: 0,  
        weigh: weigh,      
        typename:'补充说明',
        typeDesc:'请输入补充说明'
      },{
        type: 2,
        value: 'http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png',
        aside: '',
        is_aside: 0,
        weigh: 0,
        isclose:false,
      }
      ,{
        type: 2,
        value: 'http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png',
        aside: '',
        is_aside: 0,
        weigh: 1,
        isclose:false,
      }
      ,{
        type: 2,
        value: 'http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png',
        aside: '',
        is_aside: 0,
        weigh: 2,
        isclose:false,
      }
      
    ],
    fandsNumber:'',
    playNumnber:'',
    couponPrice:'',
    leaderName:'',
    jiage:'',
    couponPrice:'',
    salesVolume:'',
    videoLim: 0,
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
    CommissionArr:gse.commissionRate,
    CommodityType:gse.commodity,
    CommodityTypeIndex:1,
    CommissionArrIndex:0,
    CommissionTypeArr:gse.commissionType,
    CommissionTypeArrIndex:0,
    SampleArr:gse.isSamples,
    SampleArrIndex:0,
    sendinfo:{
      'price_count':'0',
      'coupon_count':0,
      'head_name':'',
      'is_ratio':'20%', //佣金比率
      'is_ratioType':'通用', //佣金类型
      'is_sample':'有', //领取样品

    }
 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var token = wx.getStorageSync('token')
    var cirSync = wx.getStorageSync('cir')
    var topicSync = wx.getStorageSync('topic')
    var markCheck = wx.getStorageSync('markCheck')
    this.setData({
      markCheck
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
    let data = this.data.data;
    console.log(e)
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
    if(this.data.jiage == ''){
      wx.showToast({
        title: '价格不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    var data = this.data.data
    var imageNumber = 0
    if (this.data.subType == 5){
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == '') {
          wx.showToast({
            title: data[i].typeDesc,
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
    
      if (imageNumber > 0){
        wx.showLoading({
          mask: true,
          title: '正在上传图片',
        })
        var index = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 2) {
            if( data[i].value !='http://jh.juhuchuanmei.cn/addons/hey1_forum/DefaultImage-40404040404.png')
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
    postData.subType = 5;
    postData.topic = this.data.topic;
    postData.cir = this.data.cir;
    postData.clases = this.data.clases;
    postData.data = this.data.data;
    postData.video_url = res;
    postData.redSet = this.data.redSet;
    
    //postData.kuaishouinfo = this.data.sendinfo;

    /**/
    // postData.AccountType =this.data.StarArr[this.data.StarArrIndex];
    // postData.Chuchuang =this.data.shopwindowArr[this.data.shopwindowArrIndex];
    // postData.Realname =this.data.realNameArr[this.data.realNameArrIndex];
    // postData.Gender =this.data.Gender[this.data.GenderIndex];
    // postData.playNum  =this.data.playNum ;
    // postData.fandsNum =this.data.fandsNum;
    /**/
    postData.commissionRate=this.data.CommissionArr[this.data.CommissionArrIndex].number;
    postData.commissionType=this.data.CommissionTypeArr[this.data.CommissionTypeArrIndex].name;
    postData.collectSamples=this.data.SampleArr[this.data.SampleArrIndex].name;
    postData.commodityType=this.data.CommodityType[this.data.CommodityTypeIndex].name;
    postData.couponPrice=this.data.couponPrice;
    postData.salesVolume=this.data.salesVolume;
    postData.leaderName=this.data.leaderName;
    postData.jiage = this.data.jiage;
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
      couponPrice:playC
     })
     console.log("播放数量：",g.play_count);
  },headName:function (e)
  {
    var playC = e.detail.value;  
    
     this.setData({
      leaderName:playC
     })
     console.log("播放数量：",g.head_name);
  },iswhether:function (or)
  {
      if (or)
      {
        return '是';
      }else{
        return '否';
      }

  },Is_CommodityType:function (e)
  {
    var detail= { ...e.detail };
    this.setData({
      CommodityTypeIndex:detail.id
    })
    wx.showToast({
      title: "已选："+`${detail.name}`,
      icon: 'success',
      duration: 1000
    })
    
    console.log("商品类型:",this.data.CommodityTypeIndex,detail.name)
  },isCommission:function (e)
  {
    // let data = this.data.data;
    // data.CommissionArrIndex = e.detail.value;
    // let g = this.data.sendinfo;
    // g.is_ratio=this.data.CommissionArr[e.detail.value]
    // this.setData({
    //   data,
    //   CommissionArrIndex: e.detail.value,
    //   g
    // })
    var detail= { ...e.detail };
    this.setData({
      CommissionArrIndex:detail.id
    })
    wx.showToast({
      title: "已选："+`${detail.name}`,
      icon: 'success',
      duration: 1000
    })
    
    console.log("佣金比率:",this.data.GenderIndex,detail.name)
    },isCommissionType:function (e)
  {
    var detail= { ...e.detail };
    this.setData({
      CommissionTypeArrIndex:detail.id
    })
    wx.showToast({
      title: "已选："+`${detail.name}`,
      icon: 'success',
      duration: 1000
    })
    
    console.log("佣金类型:",this.data.CommissionTypeArrIndex,detail.name)
  },isSample:function (e)
  {
    var detail= { ...e.detail };
    this.setData({
      SampleArrIndex:detail.id
    })
    wx.showToast({
      title: "已选："+`${detail.name}`,
      icon: 'success',
      duration: 1000
    })
    
    console.log("领取样品:",this.data.SampleArrIndex,detail.name)
    
  },couponCount:function (e)
  {
    var priceC = e.detail.value;  
     this.setData({
      couponPrice:priceC,
     })
     console.log("券后价：",g.price_count);
  },priceCount:function (e)
  {
    var priceC = e.detail.value;  
     this.setData({
      jiage:priceC,
     })
     console.log("价格：",priceC);
  },headName:function (e)
  {
    var priceC = e.detail.value;  
    let g = this.data.sendinfo;
    g.head_name=priceC
     this.setData({
      g,
      
     })
     console.log("价格：",g.price_count);
  },is_salesVolume:function (e)
  {
    var priceC = e.detail.value;  
    
     this.setData({
      salesVolume:priceC,
      
     })
     console.log("销量：",priceC);
  }


})