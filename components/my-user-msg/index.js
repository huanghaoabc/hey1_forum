// components/my-user-msg/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: {
      type: Object,
      value: ''
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
    login: function(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },

    /**
   * 前往动态
   */
    toDynamic: function () {
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-dynamic', myEventDetail, myEventOption)
    },

    toFollow:function(e){
      console.log(e)
      let iden = e.currentTarget.dataset.iden
      wx.navigateTo({
        url: '/pages/follow/index?iden=' + iden + '&user_id=' + this.properties.user.user.id,
      })
    },

    toMyCir: function(){
      wx.navigateTo({
        url: '/pages/my-circles/index',
      })
    },

    /**
     * 编辑个人信息
     */
    toEdit: function(){
      wx.navigateTo({
        url: '/pages/my-edit/index',
      })
    },
    // 签到
    _signIn(){
      this.triggerEvent('signIn',{},{})
    }
  },

})
