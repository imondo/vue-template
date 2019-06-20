/**
 * 前端项目接口配置
 */

// 前端简易配置
export const config = {
  local: `http://${window.location.host}/`, // 本地IP服务
  api: `http://test.com/api` // 测试环境单管IP,
};

const apiKey = [`api`][2]; // 联调IP，取对应环境变量
config[apiKey] = `http://192.168.2.29:8080/api`;

const CONFIG_API = {
  BASE_HOST: '',
  API: config.api, // 接口
  LOCAL_API: config.local, // 前端本地服务
  IPORTAL_LOCAL_API: `http://${window.location.host}${process.env.BASE_URL}`, // 认证前端接口
  IPORTAL_API: `http://192.168.2.0:9091/`, // 认证后台接口
  OAUTH_API: `http://192.168.2.0:9091/`, // 认证passport服务接口
  SYSTEMCONFIG: {
    systemTitle: ''
  } // 本地开发系统内个性化配置
};

export default CONFIG_API;
