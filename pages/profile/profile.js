import {Store} from '../../common/Storage'

const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginModal: false,
    userInfo: {},
    isLoggedIn: false
},

logout: function() {
  Store.clear();
  app.globalData.userInfo = {};
  this.setData({
    userInfo: {},
    isLoggedIn: false
  });
  wx.showToast({
      title: '已退出登录',
      icon: 'success',
      duration: 2000
  });
},

showLoginModal() {
  wx.hideTabBar({
    animation: false, // 是否需要动画效果
    success: function() {
      // 成功隐藏后，可以设置状态显示登录模态框
      this.setData({ showLoginModal: true });
    }.bind(this)
  });
},
handleLoginModalChange(e) {
  if (e.detail.isLoggedIn) {
    app.setUserInfo(e.detail.userInfo);  // 更新全局用户信息
    this.setData({
      userInfo: e.detail.userInfo,
      isLoggedIn: true,
      showLoginModal: false
    });
  }
},
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    if (!app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
    }else {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLoggedIn: true
      });
    }  
  },

  navigateToMyAssessment() {
    if (!app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
    } else {
      wx.navigateTo({
        url: '/subPackages/pages/assessment/my-assessment/my-assessment'
      });
    }
  },
  navigateToSettings() {
    if (!app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
    } else {
      
    }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (app.isLoggedIn()) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLoggedIn: true
      });
    } else {
      this.showLoginModal();
      this.setData({ isLoggedIn: false });
    }
   },
  
  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})