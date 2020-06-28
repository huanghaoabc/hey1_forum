// components/my-shop-menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data:{
      type:Array
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
    toShop: function(e){
      console.log(e)
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/integral/details/details?id=' + id,
      })
    }
  }
})
