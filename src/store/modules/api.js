import axios from 'axios';
import CONFIGAPI from '@/config/config.default.js';
import { Message } from 'element-ui';

console.log(process.env);

const api = {
  state: null,
  mutations: {
    SET_CONFIG_API: (state, config) => {
      Object.assign(state, config);
    }
  },
  actions: {
    SetConfigApi({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'development') {
          commit('SET_CONFIG_API', CONFIGAPI);
          resolve();
        } else if (process.env.NODE_ENV === 'production') {
          if (!state.LOCAL_URL) {
            dispatch('GetConfigApi')
              .then(config => {
                commit('SET_CONFIG_API', config);
                resolve();
              })
              .catch(() => {
                Message({ message: '配置文件加载出错!', type: 'error' });
                reject();
              });
          }
        }
      });
    },
    // 获取接口路径
    GetConfigApi() {
      return new Promise((resolve, reject) => {
        axios
          .get(`/config.json?v=${new Date().getTime()}`)
          .then(result => {
            const configApi = {
              API: result.data['url'], // 统一接口
              PMS__File_HOST:
                result.data['file_url'] || result.data['url'], // 文件路径
              LOCAL_API: result.data['fe_url'], // 业务系统前端路径
              IPORTAL_LOCAL_API: result.data['iportal_fe_url'], // iportal前端路径
              IPORTAL_API: result.data[`iportal_url`], // iportal请求路径
              OAUTH_API: result.data[`iportal_oauth_url`], // iportal oauth请求路径
              SERVICE_API: result.data['service_url'], // 业务系统客服统一请求接口路径
              SYSTEMCONFIG: result.data['system_config'] || {} // 系统内个性化配置
            };
            resolve(configApi);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 更改所需API
    async SetApi({ rootGetters, commit, state }) {
      const config = Object.assign({}, state);
      const { IPORTAL_LOCAL_API } = config;
      // 节点名称
      const nodeName = localStorage.getItem('nodeName') || rootGetters.nodeName;
      // 平台
      config.PLATFORM_HREF = `${IPORTAL_LOCAL_API}platform`;
      // 前端退出直接到项目首页
      config.LOGOUT_HREF = `${IPORTAL_LOCAL_API}bus?node=${nodeName}`;
      commit('SET_CONFIG_API', config);
      return config;
    }
  }
};

export default api;
