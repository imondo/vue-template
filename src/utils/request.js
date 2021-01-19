import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { LOADING_RESET } from '@/store/modules/loading-server'
import defaultSetting from '@/settings'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.common.token = store.state.user.token
    }
    if (config.url.includes('/examples')) {
      config.baseURL = ''
    }
    if (config.url.includes('/largescale')) {
      config.baseURL = defaultSetting.dev ? '' : process.env.VUE_APP_HTTP_API
    }
    if (config.params && config.params.errorBack) {
      // 设置错误回调
      config.errorBack = true
      Reflect.deleteProperty(config, config.params.errorBack)
    }
    if (config.data && config.data.errorBack) {
      // 设置错误回调
      config.errorBack = true
      Reflect.deleteProperty(config, config.data.errorBack)
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

const errorHanlder = (status, message, errorBack) => {
  if (!errorBack) {
    Message({
      message: message || '请求有误，请稍后再试',
      type: 'error',
      duration: 5 * 1000
    })
  }

  if ([401].includes(status)) {
    MessageBox.confirm('暂无登录权限', '退出', {
      confirmButtonText: '确定',
      cancelButtonText: '返回',
      type: 'warning'
    }).then(() => {
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    })
  }
}

service.interceptors.response.use(
  response => {
    const res = response.data
    const {
      status,
      data: { message = '' }
    } = response
    store.dispatch(LOADING_RESET)
    if (status !== 200) {
      errorHanlder(status, message)
      return Promise.reject(res.message || 'Error')
    } else {
      return res
    }
  },
  error => {
    store.dispatch(LOADING_RESET)
    const {
      data: { message = '' },
      status,
      config: { errorBack }
    } = error.response
    errorHanlder(status, message, errorBack)
    return Promise.reject(error)
  }
)

export default {
  get: (url, params = {}) =>
    new Promise((resolve, reject) => {
      service
        .get(url, { params })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    }),
  post: (url, data = {}) =>
    new Promise((resolve, reject) => {
      service
        .post(url, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: [item => qs.stringify(item)]
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    }),
  postJson: (url, data = {}) =>
    new Promise((resolve, reject) => {
      service
        .post(url, data, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    }),
  put: (url, data) =>
    new Promise((resolve, reject) => {
      service
        .put(url, data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: [item => qs.stringify(item)]
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    }),
  putJson: (url, data) =>
    new Promise((resolve, reject) => {
      service
        .put(url, data, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    }),
  delete: url =>
    new Promise((resolve, reject) => {
      service
        .delete(url)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          console.error(error)
          reject(error)
        })
    }).catch(error => {
      console.error(error)
      throw new Error(error)
    })
}
