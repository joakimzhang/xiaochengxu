// pages/databaseGuide/databaseGuide.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    tempFilePaths2: [],
  },
  /**
   * 上传图片方法
   */

  upload: function () {
/*
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;


        // 上传图片
        that.setData({
          tempFilePaths: tempFilePaths
        })

*/


    let that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePaths
        })
        const dirName = app.globalData.userName + "_" + app.globalData.userPhone
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours()
        var minute = now.getMinutes()
        var second = now.getSeconds()

        const dateDir = year+"_"+month+"_"+day
        const timeDetail = hour + "_" + minute + "_" + second


        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          const filePath = res.tempFilePaths[i]
          // 上传图片
          const cloudPath = dateDir + "/" + dirName + "/" + timeDetail+"/"+'image_'+i+ filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        }
      },
      fail: e => {
        console.error(e)
      }
    })
  },


/*

    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
       

        // 上传图片
        that.setData({
          tempFilePaths: tempFilePaths
        })

        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          const filePath = tempFilePaths[i]
          const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
          //上传文件
          wx.cloud.uploadFile({
            url: cloudPath,
            filePath: tempFilePaths[i],
            success: function (res) {
              count++;
              //如果是最后一张,则隐藏等待中  
              if (count == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }  
        
      }
    })
  },
  
*/




  upload2: function () {
    let that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths2 = res.tempFilePaths;
        that.setData({
          tempFilePaths2: tempFilePaths2
        })
        const dirName = app.globalData.userName + "_" + app.globalData.userPhone
        //const dateDir = Date.parse(new Date());

        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours()
        var minute = now.getMinutes()
        var second = now.getSeconds()

        const dateDir = year + "_" + month + "_" + day
        const timeDetail = hour + "_" + minute + "_" + second


        var count = 0;
        for (var i = 0, h = tempFilePaths2.length; i < h; i++) {
          const filePath = res.tempFilePaths[i]
          // 上传图片
          const cloudPath = dateDir + "/" + dirName + "/" + timeDetail + "/" + 'image_' + i + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)

              app.globalData.fileID = res.fileID
              app.globalData.cloudPath = cloudPath
              app.globalData.imagePath = filePath
              app.globalData.imgUrl = filePath

              this.setData({
                fileID: res.fileID,
                cloudPath: cloudPath,
                imagePath: filePath,
                imgUrl: filePath
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        }
      },
      fail: e => {
        console.error(e)
      }
    })
  },


  /**
   * 预览图片方法
   */
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths[index],
      urls: that.data.tempFilePaths,
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },

  listenerButtonPreviewImage2: function (e) {
    let index = e.target.dataset.index;
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths2[index],
      urls: that.data.tempFilePaths2,
      //这根本就不走
      success: function (res) {
        //console.log(res);
      },
      //也根本不走
      fail: function () {
        //console.log('fail')
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})