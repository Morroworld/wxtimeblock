//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      // env 参数说明：
      //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
      //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
      //   如不填则使用默认环境（第一个创建的环境）
      // env: 'my-env-id',
      env: 'morthal',
    })
  },
  wxlogin: function(cb){
    var that = this
    if(that.globalData.openid){
      typeof cb == "function" && cb(that.globalData.openid)
    }else{
      //调用登录接口
      wx.login({
        success: function(res){
          if(res.code){
            //发起网络请求
            wx.request({
              url: that.globalData.apiurl + 'c=xcxlogin',
              data: {code: res.code},
              success: function(e){
                console.log(e)
                if(e.data.code == '0'){
                  that.globalData.openid = e.data.data.openid
                  wx.setStorageSync('openid', that.globalData.openid)
                  typeof cb == 'function' && cb(that.globalData.openid)
                }else{
                  that.wxlogin(cb)
                }
              }
            })
          }else{
            typeof cb == 'function' && cb("")
            console.log('登录失败:'+res.msg)
          }
        }
      })
    }
  },
  getUserInfo: function(){
    var that = this
    if(that.globalData.userInfo){
      typeof cb == 'function' && cb(that.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success:function(){
          wx.getUserInfo({
            success:function(res){
              that.globalData.userInfo = res.userInfo
              typeof cb =="function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    apiurl: '',
    openid: null,
    userInfo: null
  },
})
