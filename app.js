// app.js
import {Store} from './common/Storage'
import {KEY_TOKEN} from './common/Constants'
App({
  onLaunch: function() {
      // 应用启动时调用登录
      // this.userLogin();
  },
  globalData: {
      userInfo: {}
  },
  isLoggedIn() {
    return Store.getItem(KEY_TOKEN);
  },
  userLogin: function() {
      return new Promise((resolve, reject) => {
        if(this.globalData.userInfo)
          wx.login({
              success: res => {
                  if (res.code) {
                    let code = res.code;
                      wx.request({
                          url: 'http://localhost:8000/mental-cove/api/login', 
                          method: 'POST',
                          data: {
                              code: res.code
                          },
                          success: res => {
                              if (res.statusCode === 200) {
                                  Store.setItem(KEY_TOKEN, res.data);
                                  resolve('登录成功')
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