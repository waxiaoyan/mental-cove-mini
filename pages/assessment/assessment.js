// pages/assessment/assessment.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    showLoginModal: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.hideShareMenu();
    if (!app.isLoggedIn()) {
      this.showLoginModal();
    }
  },
  mbtiQuestionnaire: function() {
    if (app.isLoggedIn()) {
      wx.navigateTo({
        url: '/subPackages/pages/assessment/mbti-questionnaire/mbti-questionnaire'
      });
    }else {
      this.showLoginModal();
    }
  },
  handleLoginModalChange(e) {
    this.setData({
      showLoginModal: e.detail.showLoginModal
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

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
  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    if (!app.isLoggedIn()) {
      // 显示登录模态框时隐藏 tabBar
      this.showLoginModal();
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
    return {
      title: '心理测评 - MBTI职业性格测试',
      path: '/pages/assessment/assessment', // 分享的路径
      imageUrl: '/pages/assessment/image/16personalities.png', // 分享的图片
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'none',
          duration: 2000
        });
      }
    };
  }
})