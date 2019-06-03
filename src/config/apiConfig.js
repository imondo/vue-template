/**
 * 前端项目接口配置
 */

console.log(process.env.LOCALHOST);

// 前端简易配置
export const config = {
  local: `http://${process.env.LOCALHOST}:9527/`, // 本地IP服务
  api: `http://nzb.ems.com/emsschool/api` // 测试环境单管IP,
};

const apiKey = [`api`][0]; // 联调IP，取对应环境变量
config[apiKey] = `http://192.168.2.0:8087/api`;

const CONFIG_API = {
  BASE_HOST: '',
  API: config.api, // 接口
  LOCAL_API: config.local, // 前端本地服务
  IPORTAL_LOCAL_API: `http://lytest33.com/iportal3-integrate/`, // 认证前端接口
  IPORTAL_API: `http://192.168.2.227:9091/`, // 认证后台接口
  OAUTH_API: `http://192.168.2.227:9091/`, // 认证passport服务接口
  SYSTEMCONFIG: {
    systemTitle: ''
  } // 本地开发系统内个性化配置
};

export default CONFIG_API;
