// components/topic-row/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
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
    todes: function(e){
      console.log(e)
      let id = e.currentTarget.dataset.id
      if(this.properties.check){
        var pages = getCurrentPages() // 获取页面栈
        var currPage = pages[pages.length - 1]; // 当前页面
        var prevPage = pages[pages.length - 2]; // 上一个页面
        let title = e.currentTarget.dataset.title
        prevPage.setData({
          topic: { id: id, title: '#' + title + '#' } 
        })
        wx.navigateBack({
          delta: 1
        })
      }else{
        wx.navigateTo({
          url: '/pages/topic/details/index?id=' + id
        })
      }
      
    }
  } 
})
