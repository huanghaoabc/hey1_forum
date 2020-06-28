// components/article-user/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    ctime: {
      type: String,
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    follow: function(){
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
  }
})
