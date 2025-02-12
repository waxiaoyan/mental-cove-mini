const HttpUtils = require('../../../../common/HttpUtils.js'); 
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    currentQuestion: {},
    currentIndex: 1,
    questions: [],
    answers: {},
    totalQuestions: 0,
    progress: 0,
    selected:false
    },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getQuestions();
  },

  handleOptionChange: function(e) {
    const selected = e.detail.value;
    const currentId = this.data.currentQuestion.id; 
    this.setData({
      answers: { ...this.data.answers, [currentId]: selected },
      selected:true
    });
    let newIndex = this.data.currentIndex + 1;
    if (newIndex <= this.data.totalQuestions) {
       this.nextQuestion();
    }
  },

  nextQuestion: function() {
    if (!this.data.selected) {
      // Notify the user to select an option
      wx.showToast({
        title: '请选择回答问题后提交',
        icon: 'none',
        duration: 2000
      });
      return; // Stop the function from proceeding
    }
    let newIndex = this.data.currentIndex + 1;
    if (newIndex <= this.data.totalQuestions) {
      this.updateQuestion(newIndex);
    }
    this.data.selected = false;
  },
  
  previousQuestion: function() {
    let newIndex = this.data.currentIndex - 1;
    if (newIndex >= 1) {
      this.updateQuestion(newIndex);
    }
    this.data.selected = true;
  },
  
  updateQuestion: function(index) {
    const newQuestion = this.data.questions[index - 1]; 
    const selectedOption = this.data.answers[newQuestion.id] || ''; 
    this.setData({
      currentQuestion: newQuestion,
      currentIndex: index,
      selectedOption: selectedOption 
    });
    this.updateProgress(); 
  },
  
  updateProgress: function() {
    const progress = (this.data.currentIndex / this.data.totalQuestions) * 100;
    this.setData({
      progress: progress
    });
  },

  getQuestions: function() {
    const url = app.config.env.API_HOST + '/questionnaires/mbti';
    HttpUtils.apiRequest(
      url, // 请求 URL
      'GET', // 请求方法
      null, // 请求数据（GET 请求通常不需要 data）
      (res) => { // 成功回调函数
        this.setData({
          questions: res.data.questions,
          currentQuestion: res.data.questions[0],
          progress: 0,
          totalQuestions: res.data.questions.length
        });
      }
    ); 
  },

  submit: function() {
    if (!this.data.selected) {
      // Notify the user to select an option
      wx.showToast({
        title: '请选择回答问题后提交',
        icon: 'none',
        duration: 2000
      });
      return; // Stop the function from proceeding
    }
    const url = app.config.env.API_HOST + '/questionnaires/submit-mbti';
    HttpUtils.apiRequest(
      url, 
      'POST', 
      this.data.answers, 
      (res) => {
            if (res.statusCode === 200) {
                // Process the successful response and navigate
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 2000,
                    complete: () => {
                        // Navigate to the result page after the toast
                        wx.navigateTo({
                            url: '/subPackages/pages/assessment/mbti-result/mbti-result?results=' + encodeURIComponent(JSON.stringify(res.data))
                        });
                    }
                });
            } else {
                // Handle non-200 responses
                wx.showToast({
                    title: '系统异常，请稍后重试',
                    icon: 'none',
                    duration: 2000
                });
            }
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