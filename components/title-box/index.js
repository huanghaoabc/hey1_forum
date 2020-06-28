// components/title-box/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { 
      type: String,
      value: ''
    },
    jumpType: {
      type: String,
      value: 'navigate'
    },
    url: {
      type: String,
      value: ''
    },
    line:{
      type:Boolean,
      value:false
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
    _jump: function(){
      if (this.properties.jumpType == 'navigate'){
        wx.navigateTo({
          url: this.properties.url
        })
      }else{
        wx.switchTab({
          url: this.properties.url
        })
      }
      
    }
  }
})
