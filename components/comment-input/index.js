// components/comment-input/index.js
import { commentModel } from "../../models/comment.js"
import {
  HTTP
} from "../../utils/http.js"
const http = new HTTP()
const comment = new commentModel()
import { commonModel } from "../../models/common.js"
const common = new commonModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: true
    },
    postId: {
      type: Number,
      value: 0
    },
    oneId:{
      type: Number,
      value: 0
    },
    twoId:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: [],
    value: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    downShow: function () {
      this.setData({
        isShow: false
      })
    },

    upShow: function () {
      this.setData({
        isShow: true
      })
    },

    /**
   * 选择图片
   */
    chooseImg: function () {
      var page = this
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          var images = page.data.images.concat(tempFilePaths);
          if (images.length > 6) {
            wx.showModal({
              title: '提示',
              content: '图片最多只能上传3张',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  return;
                }
              }
            });
            return;
          }
          page.setData({
            images
          })
          console.log(images)
        }
      })
    },

    formSubmit: function (e) {
      console.log(e)
      let formId = e.detail.formId
      common.saveFormId({
        formId: formId,
        use_max: 1
      }).then(res => {

      })
    },

    /**
     * 删除图片
     */
    delImage: function(e){
      console.log(e)
      let index = e.currentTarget.dataset.index
      let images = this.data.images
      images.splice(index, 1)
      this.setData({
        images
      })
    },

    /**
     * 输入内容
     */
    input: function(e){
      console.log(e)
      let value = e.detail.value
      console.log(value)
      this.setData({
        value
      })
    },

    /**
     * 父类发布评论
     */
    putComments(){
      var myEventDetail = {
        value: this.data.value,
        post_id: this.properties.postId,
        one_id: this.properties.oneId,
        two_id: this.properties.twoId,
        value: this.data.value,
        images: this.data.images
      } 
      var myEventOption = {} 
      this.triggerEvent('click-put', myEventDetail, myEventOption)
    },

    /**
     * 发表评论
     */
    putComment(){
      if (this.data.value == ""){
        wx.showModal({
          title: '提示',
          content: '请输入内容',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        });
        return;
      }
      let data = {}
      data.post_id = this.properties.postId
      data.one_id = this.properties.oneId
      data.two_id = this.properties.twoId
      data.value = this.data.value
      if(this.data.images.length > 0){
        var index = 0
        var images = this.data.images
        for (let i = 0; i < images.length; i++) {
          http.uploadFile({
            filePath: images[i]
          }).then(res => {
            images[i] = res
            index++
            if (index == images.length) {
              data.images = images
              comment.putComment({
                data
              }).then(res => {
                this.setData({
                  isShow: false
                })
              })
            }
          })
        }
      }else{
        comment.putComment({
          data
        }).then(res => {
          this.setData({
            isShow: false
          })
        })
      }
      
    }
  }
})
