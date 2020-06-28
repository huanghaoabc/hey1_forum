// components/my-nav/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '',
  },

  /**
     * 生命周期初始化
     */
  attached: function () {
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tomsg: function(){
      wx.navigateTo({
        url: '/pages/notice/index',
      })
    }
  }
})
