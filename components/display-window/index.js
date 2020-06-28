// components/display-window/index.js
import { commonModel } from "../../models/common.js";
const common = new commonModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 轮播图类容
    imgUrls:{
      type:Array,
      value: [
        'http://sdev.car.dmoit.com/uploads/20190612/350e384cb226da7b27af4f3aa9bf314d.png',
        'http://sdev.car.dmoit.com/uploads/20190612/f4574cc6b28bfd2f15e3d9b03c81074a.png',
          'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=c87e52ca1a38534393cf8121a312b01f/e1fe9925bc315c60c9fcca4987b1cb134954772f.jpg'
      ]
    },
    // 轮播图高度
    heiget:{
      type:String,
      value:'150rpx'
    },
    // 背景色
    bgColor:{
      type:String,
      value:"#fff"
    },
    // 形状
    shape:{
      type:String,
      value:'round'
    },
    //位置
    position:{
      type: Number,
      value: 1
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgUrls: ,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  lifetimes: {
    attached: function () {
      common.getImageNav({
        type: this.properties.position
      }).then(res => {
        this.setData({
          images: res
        })
      })
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpPage:function(e){
      console.log(e)
      let index = e.currentTarget.dataset.index
      let images = this.data.images
      if(images[index].type == 1){
        wx.navigateTo({
          url: images[index].url
        })
      }else{
        wx.setStorageSync('junp_url', images[index].url)
        wx.navigateTo({
          url: '/pages/web-view/index?src=' + images[index].url
        })
      }
    }
  }
})