// subPackages/pages/assessment/mbti-result-interpretation/mbti-intj/mbti-intj.js
Page({

  /**
   * Page initial data
   */
  data: {
    showPersonality: false,
    showAdvantages: false,
    showCareers: false,
    showDevelopment: false,
    showLove: false,
    topNum: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.handleSectionDisplay(options.section);
  },
  handleSectionDisplay: function(section) {
    // 重置所有显示状态
    this.setData({
      showPersonality: false,
      showAdvantages: false,
      showCareers: false,
      showDevelopment: false,
      showLove: false
    });

    // 根据参数设置特定部分为true
    switch (section) {
      case 'personality':
        this.setData({ showPersonality: true });
        break;
      case 'advantages':
        this.setData({ showAdvantages: true });
        break;
      case 'careers':
        this.setData({ showCareers: true });
        break;
      case 'development':
        this.setData({ showDevelopment: true });
        break;
      case 'love':
        this.setData({ showLove: true });
        break;
      default:
        this.setData({ showPersonality: true }); // 默认显示个性特征
        break;
    }
  },
  goToAdvantages() {
    this.setData({
      showPersonality: false,
      showAdvantages: true,
      showCareers: false,
      showDevelopment: false,
      showLove: false,
      topNum: 0
    });
  },

  goToCareers() {
    this.setData({
      showPersonality: false,
      showAdvantages: false,
      showCareers: true,
      showDevelopment: false,
      showLove: false,
      topNum: 0
    });
  },
  goToDevelopment() {
    this.setData({
      showPersonality: false,
      showAdvantages: false,
      showCareers: false,
      showDevelopment: true,
      showLove: false,
      topNum: 0
    });
  },
  goToLoveAnalysis() {
    this.setData({
      showPersonality: false,
      showAdvantages: false,
      showCareers: false,
      showDevelopment: false,
      showLove: true,
      topNum: 0
    });
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