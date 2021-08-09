import { ElMessage } from 'element-plus';

const options = {
  duration: 1500
};

export default {
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
  }
};
