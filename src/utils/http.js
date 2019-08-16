// 设置请求统一信息
import axios from 'axios';
import store from '@/store/index.js';
import qs from 'qs';
import { messages } from './msg-box.js';

const service = axios.create({
  timeout: 300000, // 超时设置
  withCredentials: true // 跨域请求
});

let hasLogoutStatus = false; // 是否某个请求存在需要退出的状态

const queue = []; // 请求队列

const CancelToken = axios.CancelToken; // axios内置的中断方法

/**
 * 拼接请求的url和方法；
 * 同样的`url + method` 可以视为相同的请求
 * @param {Object} config 请求头对象
 */
const token = config => {
  return `${config.url}_${config.method}`;
};

/**
 * 中断重复的请求，并从队列中移除
 * @param {Object} config 请求头对象
 */
const removeQueue = config => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i];
    if (!task) return;
    // 出现401，403状态码中断后续请求
    const isLogout = token(config).includes('logout');
    // 退出接口跳过中断逻辑
    if (!isLogout && hasLogoutStatus) {
      task.token();
      queue.splice(i, 1);
    } else {
      const cancelMethods = ['post', 'put', 'delete']; // 需要中断的请求方式
      const { method } = config;
      if (cancelMethods.includes(method)) {
        if (task.token === token(config)) {
          task.cancel();
          queue.splice(i, 1);
        }
      }
    }
  }
};

/**
 * 请求错误统一处理
 * @param {Object} response 错误对象
 */
const errorHandle = response => {
  // eslint-disable-next-line prettier/prettier
  const { status, data: { message = '' }} = response;
  let msg = message;
  if (!message) {
    switch (status) {
      case 401:
        msg = '您没有权限访问此操作！';
        break;
      case 403:
        msg = '您的登录状态已失效，请重新登录。';
        break;
      case 424:
        msg = response.data.error;
        break;
      default:
        msg = '服务请求异常，请刷新重试。';
    }
  }
  hasLogoutStatus = status === 401 || status === 403;
  if (hasLogoutStatus) {
    messages('error', msg, () => {
      store.dispatch('Logout');
    });
  }
  messages('error', msg);
};

/**
 * 修改开发环境下mock配置
 * @param {Object} config 请求配置
 */
const mockApi = config => {
  if (process.env.NODE_ENV === 'development') {
    const isMock = config.url.includes('/mock');
    if (isMock) {
      const api = config.url.match(/\/api(.+)/g);
      config.url = `http://${window.location.host}${api}`;
      return config;
    }
  }
};

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 中断之前的同名请求
    removeQueue(config);
    // 添加cancelToken
    config.cancelToken = new CancelToken(c => {
      queue.push({ token: token(config), cancel: c });
    });
    // 登录后添加token
    if (store.getters.token) {
      config.headers['Authorization'] =
        store.getters.token.token_type + ' ' + store.getters.token.access_token;
    }
    mockApi(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 在请求完成后，自动移出队列
    removeQueue(response.config);
    // 关闭全局按钮Loading响应
    store.dispatch('CancalLoading');
    // 错误码处理
    if (response.status !== 200) {
      return Promise.reject(response);
    }
    return response;
  },
  error => {
    const { response } = error;
    if (response) {
      // 错误处理
      errorHandle(response);
      return Promise.reject(response);
    } else {
      // 请求超时
      if (error.message.includes('timeout')) {
        console.log('超时了');
        messages('error', '请求已超时，请刷新或检查互联网连接');
      } else {
        // 断网，可以展示断网组件
        console.log('断网了');
        messages('error', '请检查网络是否已连接');
      }
    }
  }
);

export default {
  get: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .get(store.getters.api.API + url, { params: data })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      throw new Error(error);
    });
  },
  post: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .post(store.getters.api.API + url, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          withCredentials: true,
          transformRequest: [
            data => {
              return qs.stringify(data);
            }
          ]
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  put: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .put(store.getters.api.API + url, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          withCredentials: true,
          transformRequest: [
            data => {
              return qs.stringify(data);
            }
          ]
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  putJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .put(store.getters.api.API + url, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  postJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .post(store.getters.api.API + url, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  delete: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .delete(store.getters.api.API + url, {
          data
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  deleteJson: (url, data = {}) => {
    return new Promise((resolve, reject) => {
      service
        .delete(store.getters.api.API + url, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          data
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  },
  /**
   * blob下载
   * @param {String} url 请求地址
   * @param {String} method 请求方式 默认`get`
   * @param {Object} data 请求数据
   */
  exportFile({ url = '', data = {}, method = 'get' }) {
    return new Promise((resolve, reject) => {
      const isPost = method.toLocaleUpperCase() === 'POST';
      const postConfig = isPost
        ? { headers: { 'Content-Type': 'application/json' }, data }
        : { params: data };
      const downConfig = {
        withCredentials: true,
        method: method.toLocaleLowerCase(),
        responseType: 'blob',
        ...postConfig
      };
      // eslint-disable-next-line no-unexpected-multiline
      service(store.getters.api.API + url, downConfig)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    }).catch(error => {
      return Promise.reject(error);
    });
  }
};
