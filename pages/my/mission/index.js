// pages/my/mission/index.js
import Dialog from '../../../vant-weapp/dist/dialog/dialog';
import { missionModel } from '../../../models/mission.js'
const task = new missionModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: {
      color: '#fff',
      fontColor: '#fff',
      bgcolor: 'rgba(255,255,255,0)',
      title: '任务中心',
      share: true,
      underfill: false,
      back: true,
    },
    cententBg: task.resourceUrl()+'wxapp/mission-bg.png?v=1.0',
    logModelShow: false,
    isEmpty: false,
    pageNumber: 1,
    list:[],
    signInShow:false,
    signData: {
      score: 0,
      exp: 0,
      lastScore: 0,
      lastExp: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.details()
  },
  details() {
    const index = task.index()
    index.then(s => {
      this.setData({
        user: s.user,
        task: s.task
      })
    }).catch(e => { })
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
   * 页面滚动监听
   */
  onPageScroll(e){
    if (e.scrollTop > 80) {
      let navData = this.data.navData
      if (navData.color == "#000"){
        return
      }
      navData.bgcolor = 'rgba(255, 255, 255,10)'
      navData.color = "#000"
      navData.fontColor = '#000'
      this.setData({
        navData: navData
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#000000'
      })
    } else {
      let navData = this.data.navData
      if (navData.color == "#fff") {
        return
      }
      navData.bgcolor = 'rgba(255, 255, 255,0)'
      navData.color = "#fff"
      navData.fontColor = '#fff'
      this.setData({
        navData: navData
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff'
      })
    }
  },
  // 任务说明
  showExplain(e){
    let index = e.target.dataset.index
    let classify = e.target.dataset.classify
    let explain = this.data.task[classify][index].explain
    Dialog.alert({
      title: '任务说明',
      message: explain
    }).then(() => {
      // on close
    });
  },
  // 做任务
  toWorking(e) {
    let index = e.target.dataset.index
    let classify = e.target.dataset.classify
    const working = this.data.task[classify][index]
    if (working.task_id == 1){
      const signIn = task.signIn()
      signIn.then(s=>{
        this.setData({
          signData:s,
          signInShow:true
        })
      }).catch(e=>{})
      return
    }
    if (working.skip == '/pages/index/index'){
      wx.switchTab({
        url: working.skip,
      })
    }else{
      wx.navigateTo({
        url: working.skip,
      })
    }
  },
  // 显示经验明细
  showExpLog()
  {
    this.setData({
      pageNumber:1,
      type:1,
      list:[]
    })
    this.getList({
      pageNumber:1
    })
    this.setData({
      logModelShow: true
    })
  },
  showScoreLog(){
    this.setData({
      pageNumber: 1,
      type: 2,
      list: []
    })
    this.getList({
      pageNumber: 1
    })
    this.setData({
      logModelShow: true
    })
  },
  getList(params){
    let type = this.data.type
    if(type==1){
      var data = task.exp(params)
    }else{
      var data = task.score(params)
    }
    var pageNumber = this.data.pageNumber
    data.then(s=>{
      let list = this.data.list
      this.setData({
        list: list.concat(s.list),
        totalPage: s.total_page
      })
      if (s.total_page <= pageNumber) {
        this.setData({
          isEmpty: true
        })
      }
      this.setData({
        pageNumber: pageNumber + 1
      })
    })
    .catch(e=>{})
  },
  // 明细弹框触底
  logModelOnbottom(e){
    if (this.data.isEmpty) {
      return
    }
    if (this.data.totalPage < this.data.pageNumber) {
      this.setData({
        isEmpty: true,
      })
      return
    }
    this.getList({
      pageNumber: this.data.pageNumber
    })
  },
  // 签到关闭
  onMyEvent(e){
    this.details()
  }
})