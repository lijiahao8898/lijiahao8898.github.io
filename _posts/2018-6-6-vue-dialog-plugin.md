---
layout: post
title: vue编写插件
categories:
- Vue
subhead: 学习vue
---

### 项目地址：[点击](https://github.com/lijiahao8898/vue-dialog)
<!--break-->

### 介绍 - 开发插件

官网网上说 插件通常会为 `Vue` 添加全局功能。插件的范围没有限制一般有以下几种

1. 添加全局方法或者属性，如：[`vue-custom-element`](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等，如 [`vue-touch`](https://cn.vuejs.org/v2/guide/plugins.html)
3. 通过全局 `mixin` 方法添加一些组件选项，如: [`vue-router`](https://github.com/vuejs/vue-router)
4. 添加 `Vue` 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 `API`，同时提供上面提到的一个或多个功能，如 [`vue-router`](https://github.com/vuejs/vue-router)

`Vue.js` 的插件应当有一个公开方法 `install` 。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

第一次自己写其实感觉只是把组件放在 `NPM` 上而已


`index.js`
```js
import dialog from './components/dialog';

const vueDialog = {
    install: function (Vue, options) {
        this.VueDialog = Vue.extend(dialog);
        Vue.component('tinyDialog', dialog);
        const $dialog = function () {
        };
        this.options = options;
        Vue.dialog = Vue.prototype.$dialog = $dialog
    }
};

export default vueDialog

```

然后在 `package.json` 中定义文件

```package.json
 "main": "src/index.js",
  "files": [
      "dist",
      "src",
      "package.json"
  ],
```

最后 `npm publish` 发布

```
npm publish
```
