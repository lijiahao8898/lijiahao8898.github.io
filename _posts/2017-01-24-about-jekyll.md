---
layout: post
title: jekyll
categories: [jekyll]
---

```
_config.yml :存储配置数据。把配置写在这个文件里面，可以让你不用在命令行中写。
_drafts:草稿，格式是:没有日期.md
_includes:包含一些模板，可以重复利用。你可以用通过{% include file.ext %}包含_includes/file.ext文件{这种方式是liquid语法}
_layouts:里面的文件通过{{ content }}包含_posts里面的文章。
_posts:存放你要发表的文章。格式YEAR-MONTH-DAY-title.MARKUP。
文件名确定了发表的日期和标记语言。博客的日期格式通过_config.yml的permalink字段设置或者通过YAML FRONT Matter设置
_data:保存数据的。jekyll会自动加载这里的所有
.jml或者.yaml结尾的文件。
比如你有一个members.yml。那么你可以通过site.data.members
访问该文件里的数据。
_site：
jekyll生成的网站会放在该文件夹下。
最好把它放到.gitignore文件里面，这样Git就不会管理它了。
```
