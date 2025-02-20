const HttpUtils = require('../../common/HttpUtils.js'); 
const { fetchInterpretationCount } = require('../../common/Utils.js'); // adjust the path as necessary

const app = getApp();

Page({
  /**
   * Page initial data
   */
  data: {
    showLoginModal: false,
    isAnalyzed:false,
    dreamResult:'',
    dreamContent:''
  },

  onInput(e) {
    this.setData({
      dreamContent: e.detail.value,
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.hideShareMenu();
    if (!app.isLoggedIn()) {
      this.showLoginModal();
      return;
    }
    fetchInterpretationCount()
    .then(isAnalyzed => {
      this.setData({
        isAnalyzed: isAnalyzed
      });
    })
    .catch(error => {
      console.error('Error fetching interpretation count:', error);
      // Optionally handle the error, e.g., show a message to the user
    });
  },
  analyzeDream(e) {
    if (!app.isLoggedIn()) {
      this.showLoginModal();
    }
    const data = this.data.dreamContent;
    if (!data.trim()) {
      wx.showToast({
        title: '请输入梦境内容',
        icon: 'none'
      });
      return;
    }
    const url = `${app.config.env.API_HOST}/openai/chat`;
    HttpUtils.apiRequest(
      url, 
      'POST',
      data, 
      (res) => {
        if (res.statusCode === 200) {
          this.setData({
            dreamResult: res.data, // 假设返回结果在 res.data.result 中
            isAnalyzed: true, 
          });
        } else {
          wx.showToast({
            title: '解析失败，请重试',
            icon: 'none',
          });
        }
      },
      (err) => {
        wx.showToast({
          title: '请求失败，请检查网络',
          icon: 'none',
        });
      }
    ); 
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
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
    fetchInterpretationCount()
    .then(isAnalyzed => {
      this.setData({
        isAnalyzed: isAnalyzed
      });
    })
    .catch(error => {
      console.error('Error fetching interpretation count:', error);
      // Optionally handle the error, e.g., show a message to the user
    });
  },
  handleLoginModalChange(e) {
    this.setData({
      showLoginModal: e.detail.showLoginModal
    });
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