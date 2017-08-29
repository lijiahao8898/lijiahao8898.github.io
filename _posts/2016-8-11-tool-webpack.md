---
layout: post
title: tool - webpack
categories: [打包工具]
---

## 基本

可能用到的相关知识：

* `commonJS` 、`NodeJS`
* `React`
* `gulp` 、`grunt`
* `express`

`webpack` 是以 `commonJS` 的形式来书写的，但对 `AMD/CMD` 的支持也很全面。

什么是 `commonJS` 规范？[点击查看](http://javascript.ruanyifeng.com/nodejs/module.html)

`webpack` 的配置文件 `webpack.config.js` 主要分为三大块：

* `entry`     入口文件 让 `webpack` 用哪个文件作为项目的入口
* `output`    出口 让 `webpack` 把处理完成的文件放在哪里
* `module`    模块 要用什么不同的模块来处理各种类型的文件

### 安装：

```
mkdir  forwebpack

cd     forwebpack

npm    init                              创建package.json）

sudo npm install webpack --save-dev

--save                                  （将安装信息放入package.json的dependencies（产品模式））

—save-dev                                (将安装信息放入package.json的devDependencies（开发模式）)
```

`git` 管理项目的时候记得将不必要上传的文件加入到 `gitignore` 里面

创建 `.gitignore` 文件

```
touch .gitignore
```

### 工程目录：

```
| - dist
    | - src
    | - fn
        | - *.js
| - node_modules
| - src
    | - fn
        | - *.js
| - plugin
| - style
    | - *.css
| - view
    | *.html
| - .gitignore
| - package.json
| - webpack.config.js
```

### webpack.config.js配置文件

```js
var webpack           = require('webpack');
var commonsPlugin     = new webpack.optimize.CommonsChunkPlugin('common.js');
var path              = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

// 定义了一些文件夹的路径
var ROOT_PATH   = path.resolve(__dirname);
var APP_PATH    = path.resolve(ROOT_PATH, 'src/fn/entry.js');
var BUILD_PATH  = path.resolve(ROOT_PATH, 'dist/src/fn');

module.exports = {
    // 插件项
    plugins: [
        commonsPlugin,
        new HtmlwebpackPlugin({
        title: 'Hello World app'
    })
    ],
    // 页面入口文件配置
    entry: {
        // 支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        // index : './src/js/page/index.js'
        index: APP_PATH
    },
    // 入口文件输出配置
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        // 加载器配置，loader的处理顺序 右到左
        loaders: [
            // .css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            // .js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            // .scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            // 图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    // 其它解决方案配置
    resolve: {
        // 查找module的话从这里开始查找
        root: '/Users/lijiahao/projects/forWebpack',           // 绝对路径
        // 自动扩展文件后缀名，意味着我们 require 模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss','css'],
        // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',                // 后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js',
            indexCss: './style/index.css'
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};
```
### webpack 文件详解

* `entry`入口：（可以是数组）这里我们使用的 `entry.js`

`entry` 下的路径。`index` 可能是将来生成的文件名。`index.js`   注：如果 `output` 的 `filename` 是有名称的则会使用 `filename` 来命名,否则使用自身的名称

* `output` 出口：让 `webpack` 把处理完成的文件放在哪里

`path` - 输出的路径

`filename` - 定义输出的文件名称（支出数组 `【name】`，根据入口文件的 `entry` 的数量）

`module` 加载器：将用到的文件处理后再输出

`-loader` 可以省略不写，多个 `loader` 之间用 `!` 连接

`loader` 是需要安装的 `sudo npm install *-loader —save-dev`

入口文件entry.js
require相关的文件

```
require('./module1');
require('../../style/main.css');
require('./common.js');
require('./index.js');
```

其他文件：
common.js

```
console.log('hello world!');
```

index.js

```
var $ = require('jquery');

;(function () {
    var test = {
        init: function () {
            this.addEvent();
        },
        addEvent: function () {
            this.time = this.getTime();
            var that = this;
            setInterval(function () {
                that.time = that.getTime();
                $('body').html('<div class="time">'+that.time+'</div>');
            },500)
        },
        getTime: function () {
            var date = new Date();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();

            if( minutes < 10 ){
                minutes = '0' + minutes
            }
            if( seconds < 10 ){
                seconds = '0' + seconds
            }

            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + minutes + ':' + seconds;
        }
    };
    $(function () {
        test.init()
    });
})();
```

module1.js

```
// 修改module1.js
require(["./module3"], function(){
    console.log("Hello Webpack!");
});
```

module2.js

```
// module2.js，使用的是CommonJs机制导出包
module.exports = function(a, b){
    return a + b;
}
```

module3.js

```
// module3.js，使用AMD模块机制
define(['./module2.js'], function(sum){
    return console.log("1 + 2 = " + sum(1, 2));
})
```

main.css

```
body{
    background: red;
    color: white;
}
```

运行webpack

```
在命令行内输入webpack 或者 webpack —display-error-details（出错时能查阅更详尽的信息）
```

其他有用的指令：

```
- webpack —config *.js  // 使用另外一份config文件在打包
- webpack —watch        // 监听变动自动打包
- webpack -p                  // 压缩混淆脚本
- webpack -d                  // 生成map映射文件，告知哪些模块被最终打包到哪里了
```

相关插件介绍：

1.CommonsChunkPlugin（webpack插件）
功能介绍：提取入口文件的公共脚本部分，然后生成一个*.js 在方面多页面之间的复用
配置：

```
var commonsPlugin     = new webpack.optimize.CommonsChunkPlugin(‘【name】.js');
plugin: [
     commonsPlugin
]
```

2.html-webpack-plugin
功能介绍：自动快速生成HTML
安装：

```
sudo npm install html-webpack-plugin —save-dev
```

配置：

```
plugins: [
     new HtmlwebpackPlugin({
          title:''
     })
]
```

3.webpack-dev-server      server服务器代理
功能：1.代码变动时候自动编译并且刷新浏览器
安装：

```
sudo npm install webpack-dev-server —save-dev
```

配置：
（1）

```
devServer: {
     historyApiFallback: true,
     hot: true,
     inline: true,
     progress: true
}
```

再在package.json里面配置

```
"scripts": {
  "start": "webpack-dev-server --hot --inline"
},
```

然后输入npm start  在游览器里面输入localhost:8080。

（2）这个不是很明白？
既然常用webpack做React一类的SPA，那么一个典型的例子就是前后端分离。
后端是一个RESTful的server不管用什么写的。
假定在本机他是类似http://localhost:8080/api/*这类的请求，现在添加配置让ajax请求可以直接proxy过去。

//其实很简单的，只要配置这个参数就可以了

```
proxy: {
'/api/*': {
target: 'http://localhost:8080',
secure: false
}
}
```

4.第三方库 如 jquery、underscore、momnet、zepto等
安装：

```
sudo npm install jquery —save-dev
```

5.ProvidePlugin（webpack插件）
功能：将全局变量插入到所有代码中
配置：

```
new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"

    })
```
6.import-loader
安装：

```
sudo npm install import-loader —save-dev
```

//注意这种写法 我们把jQuery这个变量直接插入到plugin.js里面了
//相当于在这个文件的开始添加了 var jQuery = require('jquery');

import 'imports?jQuery=jquery!./plugin.js';

7.添加es6的支持（未做）

8.jshint-loader
功能：检查代码规范
安装：

```
sudo npm install jshint-loader —save-dev
```

//和loaders一样的语法，很简单

```
perLoaders: [
     {
     test: /\.jsx?$/,
     include: APP_PATH,
      loader: 'jshint-loader'
      }
]
```

// 配置jshint 支持es6校验。

```
jshint: {
  "esnext": true

},
```

启动：

```
npm run start
```

### 其他

链接：

* [官网 - http://webpack.github.io/](http://webpack.github.io/)
* [文档地址 - http://webpack.github.io/docs/](http://webpack.github.io/docs/)
* [一小时包教会—webpack入门指南 - http://www.w2bc.com/Article/50764](http://www.w2bc.com/Article/50764)
* [webpack傻瓜式指南（1) - https://zhuanlan.zhihu.com/p/20367175](https://zhuanlan.zhihu.com/p/20367175)
* [webpack傻瓜式指南（2）开发和部署技巧 - https://zhuanlan.zhihu.com/p/20397902](https://zhuanlan.zhihu.com/p/20397902)
* [webpack傻瓜式指南（3）和React配合开发 - https://zhuanlan.zhihu.com/p/20522487](https://zhuanlan.zhihu.com/p/20522487)
* [webpack和grunt、gulp的比较 - http://survivejs.com/webpack/webpack-compared/](http://survivejs.com/webpack/webpack-compared/)


