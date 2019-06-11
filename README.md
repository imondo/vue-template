# vue-template

> 使用vue-cli3搭建

## 程序依赖
```
yarn install or npm install
```

### 程序启动
```
yarn run dev or npm run dev
```

### 程序打包
```
yarn run build or npm run build
```

### 程序代码检查
```
yarn run lint or npm run lint
```

### 实现功能

- 动态请求配置方案

- 动态添加路由，实现路由权限

- 请求封装，重复请求限制，操作按钮实现loading效果方案

- 跨域请求token实现方案

- blob下载方案

1. 后台需要对请求头设置 `Access-Control-Expose-Headers: Content-Disposition`

2. 文件名称放置在`Content-Disposition`请求头内

其他功能待更新...