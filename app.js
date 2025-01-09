// app.js
import {Store} from './common/Storage'
import {KEY_TOKEN} from './common/Constants'
import {envConfig} from './common/conf/EnvConfig'

App({
  config: {
    env: envConfig,
  },
  onLaunch: function() {

  },
  globalData: {
      userInfo: {}
  },
  isLoggedIn() {
    const token = Store.getItem(KEY_TOKEN);
    const userInfoExists = this.globalData.userInfo && Object.keys(this.globalData.userInfo).length > 0;
    return !!token && userInfoExists;
  },
  setUserInfo: function(userInfo) {
    this.globalData.userInfo = userInfo;
  },
  userLogin: function() {
      return new Promise((resolve, reject) => {
        if(!this.isLoggedIn())
          wx.login({
              success: res => {
                  if (res.code) {
                      wx.request({
                          url: `${this.config.env.API_LOCAL}`+'/login', 
                          method: 'POST',
                          data: {
                              code: res.code
                          },
                          success: res => {
                              if (res.statusCode === 200) {
                                  Store.setItem(KEY_TOKEN, res.data.token);
                                  this.globalData.userInfo.userId = res.data.userId;
                                  this.globalData.userInfo.userName = res.data.userName;
                                  resolve(this.globalData.userInfo);
                                } else {
                                  reject('登录失败：' + res.errMsg);
                              }
                          },
                          fail: err => {
                              reject('API调用失败：' + err.errMsg);
                          }
                      });
                  } else {
                      reject('wx.login失败：' + res.errMsg);
                  }
              },
              fail: err => {
                  reject('wx.login API调用失败：' + err.errMsg);
              }
          });
      });
  }
});