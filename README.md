# vue-template

> 使用vue-cli3搭建

## 程序依赖
```
yarn install or npm install
```

## 程序启动
```
yarn run dev or npm run dev
```

## 程序打包
```
yarn run build or npm run build
```

## 程序代码检查
```
yarn run lint or npm run lint
```

## 部分项目目录

```
...
|-- src                              // 源码目录
|-- public                           // 静态文件目录
|-- releaseNotes                     // 版本更新日志
...
|-- package.json                     // 配置项目相关信息
|-- .prettierrc                      // 风格配置
|-- README.md                        // 项目说明
```

### 实现功能

组件基于`EleemntUI`封装

- 动态请求配置方案

- 动态添加路由，实现路由权限

- 请求封装，重复请求限制，操作按钮实现loading效果方案

- 跨域请求token实现方案

- blob下载方案

1. 后台需要对请求头设置 `Access-Control-Expose-Headers: Content-Disposition`

2. 文件名称放置在`Content-Disposition`请求头内

- Mock数据请求

- 分页条组件封装

- 可编辑表格组件

1. 可编辑表格每列

2. 点击列可编辑

3. 可验证数据

- 可编辑的树

1. 可以增删改子节点

- svg图标组件

- 多表单组件处理

其他功能待更新...

## 模板更新到vue-cli 4.x版本

* 全局更新vue cli 版本

```js
npm i -g @vue/cli

vue -V
```

* 项目根目录执行更新命令 `vue upgrade`

* 启动程序

> 注意 sass-loader 升级， babel.config.js 更新