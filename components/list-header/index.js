// components/list-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navTitle: {
      type: Array,
      value: [
        {title: '推荐'},
        {title: '退让' },
        {title: '最新' },
      ],
    },
    checkIndex: {
      type: String,
      value: 0
    },
    keyTitle: {
      type: String,
      value: '搜索关键字'
    },
    toType: {
      type: Number,
      value: 1
    },
    check: {
      type: Boolean,
      value: false
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
    onClickNav: function(e){
      let dataset = e.currentTarget.dataset
      var myEventDetail = {dataset} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('click-nav', myEventDetail, myEventOption)
    },

    toSeach: function(){
      console.log(this.properties.check)
      wx.navigateTo({
        url: '/pages/all-search/index?key=' + this.properties.toType + '&check=' + this.properties.check,
      })
    }
  }
})
