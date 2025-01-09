// components/login-modal/login-modal.js
const app = getApp();

Component({
  properties: {
    showLoginModal: {
      type: Boolean,
      value: true
    },
  },
  methods: {
    login: function() {
      getApp().userLogin().then(userInfo => {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
          complete: () => {  // Changed to an arrow function
            this.closeModal(userInfo);
          }
      });
      app.setUserInfo(userInfo)
    }).catch(error => {
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      });
      this.closeModal();
    });    
    },
    closeModal(userInfo) {
      wx.showTabBar({
        animation: false,
        success: function() {
          // 成功显示后，可以设置状态隐藏登录模态框
          this.setData({ showLoginModal: false }, () => {
            this.triggerEvent('change', { userInfo: userInfo, isLoggedIn: true,showLoginModal: false });
          });
        }.bind(this)
      });
    }
  }
});