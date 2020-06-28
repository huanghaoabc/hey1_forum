// components/article-des/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
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
    poster: function(){
      var myEventDetail = {}
      var myEventOption = {}
      this.triggerEvent('click-poster', myEventDetail, myEventOption)
    },

    jumpToDes: function(e){
      let url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url,
      })
    }
  }
})
