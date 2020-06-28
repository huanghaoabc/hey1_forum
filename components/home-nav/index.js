// components/home-nav/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fontColor: {
      type: String,
      value: '#ffffff',
    },
    backColor: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
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
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转搜索
    _navback() {
      wx.navigateBack()
    },
    //前往搜索
    toSeach(){
      wx.navigateTo({
        url: '/pages/all-search/index',
      })
    },
    //前往积分
    toJfen(){
      wx.navigateTo({
        url: '/pages/my/mission/index',
      })
    }
  }
})
