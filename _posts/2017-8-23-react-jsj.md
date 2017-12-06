---
layout: post
title: react 脚手架
categories:
- react
---

### facebook react脚手架

主要的特性：
* 无需配置；
* 集成了对 `React`, `JSX`, `ES6` 和 `Flow` 的支持；
* 集成了开发服务器；
* 配置好了浏览器热加载的功能；
* 在 `JavaScript` 中可以直接 `import CSS` 和图片；
* 自动处理 `CSS` 的兼容问题，无需添加 `-webkit` 前缀；
* 集成好了编译命令，编译后直接发布成产品，并且还包含了 `sourcemaps`。

值得注意：
* `Node` 的版本必须 >= 4，推荐 `Node` >= 6 and `npm` >= 3；
* 运行起来后浏览器已经实现了热加载刷新，修改代码保存后浏览器会自动刷新；
* 执行 `npm test` 或 `yarn test` 可以执行测试动作。；
* 编译项目执行 `npm run build` 或 `yarn build`；
<!--break-->

#### how to use ?
1. 先去安装全局的命令

```
npm install -g create-react-app
```

2. 进入你想要的文件下目录下创建自己都react应用

```
create-react-app ant-react // ant-react自己项目应用的名称
```

3. 启动服务

```
cd ant-react

npm start
```

生成的目录结构如下

```
    ant-react
    ├── README.md
    ├── node_modules
    ├── package.json
    ├── .gitignore
    ├── public
    │   └── favicon.ico
    │   └── index.html
    │   └── manifest.json
    └── src
        └── App.css
        └── App.js
        └── App.test.js
        └── index.css
        └── index.js
        └── logo.svg
        └── registerServiceWorker.js
```

4. 编译

```
npm run build
```

### 蚂蚁金服 ant.design react脚手架

### 下载
* [facebook react脚手架](https://github.com/facebookincubator/create-react-app)