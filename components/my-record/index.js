// components/my-record/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    todes: function(e){
      console.log(e)
      let iden = e.currentTarget.dataset.iden
      wx.navigateTo({
        url: '/pages/user-colle/index?iden=' + iden,
      })
    }
  }
})
