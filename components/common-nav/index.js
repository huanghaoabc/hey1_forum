// components/common-nav/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    back:{
      type:Boolean,
      value:true
    },
    share: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: '自定义',
    },
    color: {
      type: String,
      value: '#fff',
    },
    bgcolor: {
      type: String,
      value: '#fd3f48',
    },
    underfill:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    },
  },

  /**
     * 生命周期初始化
     */
  attached: function () {
    let statusBarHeight = 22
    wx.getSystemInfo({
      success(res) {
          statusBarHeight = res.statusBarHeight
      }
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height,
      statusBarHeight
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _back: function(){
      wx.navigateBack({
        delta: 1
      })
    },

    _home: function(){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
