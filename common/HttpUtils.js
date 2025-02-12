import {KEY_TOKEN} from 'Constants'
import {Store} from 'Storage'

function apiRequest(url, method, data, callback) {
  const token = Store.getItem(KEY_TOKEN);
  if (!token) {
    wx.showToast({
      title: '未授权或授权失效',
      icon: 'none'
    });
    return; 
  }
  wx.showLoading({ title: '加载中...', mask: true }); 
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    success: (res) => {
      wx.hideLoading(); 
      if (res.statusCode === 200) {
        callback(res); // 成功回调
      } else {
        wx.showToast({
          title: '请求失败，请重试',
          icon: 'none'
        });
        console.error('API请求失败:', res);
      }
    },
    fail: (err) => {
      wx.hideLoading(); // 隐藏加载提示
      wx.showToast({
        title: '系统异常',
        icon: 'none'
      });
      console.error('API请求失败:', err);
    }
  });
}

module.exports = { apiRequest };