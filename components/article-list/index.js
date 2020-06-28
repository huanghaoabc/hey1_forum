// components/article-list/index.js
import { articlesModel } from "../../models/articles.js"
const articles = new articlesModel()
Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      var markCheck = wx.getStorageSync('markCheck')
      this.setData({
        markCheck
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
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
    onClickGood: function (e) {
      // console.log(e)
      // let dataset = e.currentTarget.dataset
      // var myEventDetail = { dataset } // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项
      // this.triggerEvent('click-good', myEventDetail, myEventOption)
      console.log(e)
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      articles.getGood({
        id: id
      }).then(res => {
        let data = this.properties.list
        let goods = data[index].goods
        if (goods == 1) {
          data[index].goods = 0
          data[index].good_count--
        } else {
          data[index].goods = 1
          data[index].good_count++
        }
        this.setData({
          list: data
        })
      })
    },

    clickCircle: function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/group-circle/details/index?id=' + id
      })
    },

    clickTopic: function(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/topic/details/index?id=' + id
      })
    },

    clickTitle: function (e) {
      let id = e.currentTarget.dataset.id
      var sub_type = e.currentTarget.dataset.subtype
      console.log("click",e);
      if (sub_type==3)
      {
        wx.navigateTo({
          url: '/pages/article/details/kuaishou?id=' + id
        })
  
      }else if (sub_type==4)
      {
        wx.navigateTo({
          url: '/pages/article/details/kuaishou?id=' + id
        })
      }else if (sub_type==11)
      {
        wx.navigateTo({
          url: '/pages/article/details/shouhao?id=' + id
        })
      }else
      {
  
        wx.navigateTo({
          url: '/pages/article/details/index?id=' + id
        })
      }
    },

    viewImages: function(e){
      console.log(e)
      let imageindex = e.currentTarget.dataset.imageindex
      let index = e.currentTarget.dataset.index
      let images = this.properties.list[index].images
      console.log(images)
      wx.previewImage({
        current: images[imageindex], // 当前显示图片的http链接
        urls: images // 需要预览的图片http链接列表
      })
    },

    /**
     * 单图展示
     */
    showImage: function(e){
      let src = e.currentTarget.dataset.src
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: [src] // 需要预览的图片http链接列表
      })
    },

    /**
   * 前往动态
   */
    tocenter: function (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/user-center/index?user_id=' + id,
      })
    }
  }
})
