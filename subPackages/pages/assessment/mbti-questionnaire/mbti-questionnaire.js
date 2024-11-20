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
    const newQuestion = this.data.questions[index - 1]; // 假设 `questions` 是一个包含所有问题的数组
    const selectedOption = this.data.answers[newQuestion.id] || ''; // 获取已保存的答案，如果没有则为空字符串
    this.setData({
      currentQuestion: newQuestion,
      currentIndex: index,
      selectedOption: selectedOption // 更新选中的选项
    });
    this.updateProgress(); // 更新进度
  },
  
  updateProgress: function() {
    const progress = (this.data.currentIndex / this.data.totalQuestions) * 100;
    this.setData({
      progress: progress
    });
  },

  getQuestions: function() {
    const url = 'http://localhost:8000/mental-cove/api/questionnaires/mbti';
    wx.request({
      url: url,
      method: 'GET',
      header: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NfdG9rZW4iOiJiYTU3YzNiYi0wNDgwLTQzMTYtOTBmMC04YjA1YWIzYjQzOTciLCJzdWIiOiJmNWFjMzI0MC04ZTczLTQ5YjQtOGNmZC1lMGRmODdjOWM1MjEiLCJpYXQiOjE3MzA0Mzc4NTQsImV4cCI6MTgwMjQzNzg1NH0.WD2Gu5ghFFYcYYkbgdmBHGhZC8joBxGOsD1qmyoTVsw"},
      success: (res) => {
        this.setData({
          questions: res.data.questions,
          currentQuestion: res.data.questions[0],
          progress: 0,
          totalQuestions:res.data.questions.length
        });
      }
    });
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
    const url = 'http://localhost:8000/mental-cove/api/questionnaires/submit-mbti';
    wx.request({
        method: 'POST',
        url: url,
        header: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NfdG9rZW4iOiJiYTU3YzNiYi0wNDgwLTQzMTYtOTBmMC04YjA1YWIzYjQzOTciLCJzdWIiOiJmNWFjMzI0MC04ZTczLTQ5YjQtOGNmZC1lMGRmODdjOWM1MjEiLCJpYXQiOjE3MzA0Mzc4NTQsImV4cCI6MTgwMjQzNzg1NH0.WD2Gu5ghFFYcYYkbgdmBHGhZC8joBxGOsD1qmyoTVsw"
        },
        data: this.data.answers,
        success: (res) => {
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
        },
        fail: (err) => {
            // Handle network errors or server unreachable issues
            wx.showToast({
                title: '网络错误或服务器无响应',
                icon: 'none',
                duration: 2000
            });
            console.error("请求失败:", err);
        }
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