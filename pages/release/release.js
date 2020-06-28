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
    is_sort: false,
    is_jiage:false,
    title: '',
    topic: {
      id: 0,
      title: ''
    },
    cir: {
      id: 0,
      title: ''
    },
    clases: {
      id: 0,
      title: ''
    },
    video_url: '',
    subType: 1,
    data: [
      {
        type: 1,      //类型：1=文本，2=图片
        value: '',    //值
        aside: '',    //旁白
        is_aside: 0,  //是否有旁白
        weigh: weigh      //排序
      }
    ],
    videoLim: 0,
    show: false,
    redSet: {
      status: false,
      redMoney: 0,
      redNumber: 0
    },
	Gender:['女', '男'],
	GenderIndex:0,
	ChuchuangIndex:0,
	Chuchuang:['否', '是'],
	Realname:['否', '是'],
	RealnameIndex:0,
	AccountType:['母婴','服装','猎奇','美食','生活','我也不知道写啥了'],
	AccountTypeIndex:0,
	jiage:'',
	playNum:'',
	fandsNum:''

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
          if(data.length <= 1){
            wx.showToast({
              title: '至少保留一个内容模块',
              icon: 'none',
              duration: 2000
            })
            return
          }
          data.splice(index, 1)
          page.setData({
            data
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
  chooseImg: function(){
    var page = this
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
        let data = page.data.data
        data.push(row)
        page.setData({
          data
        })
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
    console.log("test===>",this.data.Chuchuang[this.data.ChuchuangIndex],this.data.Realname[this.data.RealnameIndex])
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
     /*jiage playNum fandsNum  */
     console.log("inputValues",this.data.jiage,",",this.data.playNum,",",this.data.fandsNum);
     this.IsNumberFn(this.data.jiage,'1');
     this.IsNumberFn(this.data.playNum,'2');
     this.IsNumberFn(this.data.fandsNum,'3');
    var data = this.data.data
    var imageNumber = 0
    if (this.data.subType == 1){
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
    if (this.data.subType == 1){
      if (imageNumber > 0){
        wx.showLoading({
          mask: true,
          title: '正在上传图片',
        })
        var index = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 2) {
            http.uploadFile({
              filePath: data[i].value
            }).then(res => {
              data[i].value = res
              index++
              if (index == imageNumber) {
                wx.hideLoading()
                this.subData();
              }
            })
          }
        }
      }else{
        this.subData()
      } 
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
    postData.subType = this.data.subType;
    postData.topic = this.data.topic;
    postData.cir = this.data.cir;
    postData.clases = this.data.clases;
    postData.data = this.data.data;
    postData.video_url = res;
    postData.redSet = this.data.redSet;
	  postData.AccountType= this.data.AccountType[this.data.AccountTypeIndex];
    postData.Chuchuang= this.data.Chuchuang[this.data.ChuchuangIndex];
    postData.Realname= this.data.Realname[this.data.RealnameIndex];
    postData.Gender= this.data.Gender[this.data.GenderIndex];
    postData.jiage= this.data.jiage;
    postData.playNum= this.data.playNum;
    postData.fandsNum= this.data.fandsNum;
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
  },

  bindPickerChange: function (e) {
    let data = this.data.data
    data.Gender = e.detail.value
    this.setData({
      data,
      GenderIndex: e.detail.value
    })
  },ischuchuang:function (e)
  {
	  let data = this.data.data
		data.Chuchuang = e.detail.value
		this.setData({
		  data,
		  ChuchuangIndex: e.detail.value
		})

  },isRealname:function (e)
  {
	  let data = this.data.data
		data.Realname = e.detail.value
		this.setData({
		  data,
		  RealnameIndex: e.detail.value
		})
	  
  },isAccountType:function (e)
  {
	  let data = this.data.data
		data.AccountType = e.detail.value
		this.setData({
		  data,
		  AccountTypeIndex: e.detail.value
		})
	  
  },IsNumberFn:function (value,num)
  {
    if(num == 1)
    {
      var TName = "价格";
    }else if(num == 2){
      var TName = "播放量";
    }else
    {
      var TName = "粉丝量";
    }
    if (value == "" || isNaN(value)) {
      console.log("不是有效数字",value);
        wx.showToast({
          title: TName+'不是有效数字，请填写数字！',
          icon: 'none',
          duration: 2000
        })
        return
    }
  }


})