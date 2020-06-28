// components/user-nav/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    followed: {
      type: Number,
      value: 0
    }
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
    _back: function () {
      wx.navigateBack({
        delta: 1
      })
    },
    follow: function () {
      console.log(111)
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-follow', myEventDetail, myEventOption)
    },

    /**
   * 前往动态
   */
    tocenter: function (e) {
      let id = this.properties.data.id
      wx.navigateTo({
        url: '/pages/user-center/index?user_id=' + id,
      })
    }
  },
})
