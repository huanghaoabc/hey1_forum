// components/circle-admin-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    adminList: {
      type: Array,
      value: []
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
    toDes: function(e){
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/user-center/index?user_id=' + id
      })
    }
  }
})
