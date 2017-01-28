---
layout: post
title: github & jekyll 编写自己的小网站
categories: [other]
weather: sunny
---

```
gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/  // 将gem资源指向 指向国内

sudo gem install jekyll  // 安装jekyll

jekyll -v // 查看jekyll 版本

jekyll server // 启服务

jekyll build // 构建
```

jekyll 语法 :
* layout：                           指定模板
* title:                             标题
* description：                      描述
* category/categories：              分类
* published:                         是否发布
* weather:                           自定义变量

```
---
layout: post
title: title
category: blog
published: true # default true (可以不写这一行)
weather: sunny # 天气
---
```

调用的时候使用

```
{{ post.weather }}
```