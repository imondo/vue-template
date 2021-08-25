import { ElMessage, ElMessageBox } from 'element-plus';

const options = {
  duration: 1500
};

export const message = {
  success(msg) {
    ElMessage.success(
      Object.assign(options, {
        message: msg,
        type: 'success'
      })
    );
  },
  err(msg) {
    ElMessage.error(
      Object.assign(options, {
        message: msg,
        type: 'error'
      })
    );
  },
  warning(msg) {
    ElMessage.warning(
      Object.assign(options, {
        message: msg,
        type: 'warning'
      })
    );
  },
  alert(msg, callback = () => {}, title = '提示') {
    ElMessageBox.alert(msg, title, {
      confirmButtonText: '确定',
      callback: action => {
        if (action === 'confirm') {
          callback();
        }
      }
    });
  },
  confirm(msg, callback = () => {}, callbackCatch = () => {}) {
    ElMessageBox.confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        callback();
      })
      .catch(() => {
        callbackCatch();
      });
  }
};

export default {
  install(app) {
    app.provide('message', message);
  }
};
