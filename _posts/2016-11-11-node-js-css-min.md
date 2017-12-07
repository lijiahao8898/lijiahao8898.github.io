---
layout: post
title: node单个文件压缩-js&css
categories:
- node
---

# node

### 1 - node 压缩 js

```
// 安装
npm install uglify-js -g 或者 sudo npm install uglify-js -g

// 压缩
uglifyjs *.js -o *.min.js

uglifyjs *.js -m -o *.min.js

ps -m 将参数压缩成a.b.c
```

### 2 - node 压缩 css

```
// 安装
npm install clean-css-cli -g 或者 sudo npm install clean-css-cli -g

// 压缩
cleancss -o *.min.css *.css
```
<!--break-->
