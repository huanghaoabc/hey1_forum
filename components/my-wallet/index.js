// components/my-wallet/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    money: {
      type: String,
      value: 0.00
    },
    score: {
      type: Number,
      value: 0
    },
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
    //积分
    toscore: function () {
      wx.navigateTo({
        url: '/pages/my/mission/index',
      })
    },

    //余额
    tomoney: function(){
      wx.navigateTo({
        url: '/pages/wallet/index',
      })
    }
  }
})
