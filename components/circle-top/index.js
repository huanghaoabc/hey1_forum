// components/circle-top/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    circles: {
      type:Object,
      value:{}
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
    console.log(app.globalData.height)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //入圈/出圈
    inCircle: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('in-circle', myEventDetail, myEventOption)
    },
    //申请圈组
    adminRule: function(){
      this.triggerEvent('admin-rule')
    }
  }
})
