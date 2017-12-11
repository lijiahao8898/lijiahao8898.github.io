---
layout: post
title: tool - grunt
categories:
- Tool
---

### 插件介绍

* grunt插件：grunt插件有2部分：

第一类是grunt团队贡献的插件，这些插件的名字前面都带有“contrib-”前缀，而且在插件列表中有星号标注。

第二类是第三方提供的插件，不带有这两个特征。

| Contrib-jshint | javascript语法错误检查；|
| Contrib-watch  | 实时监控文件变化、调用相应的任务重新执行；|
| Contrib-clean  | 清空文件、文件夹；|
| Contrib-uglify | 压缩javascript代码；|
| Contrib-copy   | 复制文件、文件夹；|
| Contrib-concat | 合并多个文件的代码到一个文件中；|
| karma          | 前端自动化测试工具；|
| cssmin         | 压缩css代码；|
| filerev        | 给文件增加md5的后缀名（重命名文件）类似于增加时间戳；|
| usemin         | 替换html的引用 如果有filerev后的文件则优先使用；|

* grunt常用的插件：
<!--break-->
#### grunt引入html：

主要功能：主要用于公共部分的html引入。例如header和sidebar。

小解：

```
grunt.file.recuse(rootdir, callback)           // 递归遍历整个目录，对每个文件都执行 callback 函数。

grunt.file.read(filepath [,options])           // 读取并返回文件的内容。返回值为一个字符串，如果                            options.encoding 为 null ，则返回一个 Buffer。

grunt.file.write(filepath, content [,options]) // 将指定的内容写入文件中，如果需要，将创建文件路径中所有不存在的目录。字符串将按照指定的字符编码进行编码，Buffers 将会按照指定的方式写入磁盘。
```

```
grunt.registerTask('htmlpack', function () {
    var dir = 'view/';      //源文件的路径
    var destDir = 'html';  //要保存的路径
    var fs = grunt.file;
    //console.log(grunt.file)
    var srcArr = [];

    // 读取源文件
    fs.recurse(dir, function (filename) {

        var file = fs.read(filename);
        console.log(file);
        var include = file.match(/<!--\<include.+?\/\>-->/g);
        var files = file;

        // 替换内容
        if (include) {

            include.forEach(function (item) {

                var src = item.replace('<!--<include src="../', '').replace('" />-->', '');
                srcArr.push(src);

                if (srcArr) {
                    for (var i = 0; i < srcArr.length; i++) {
                        var html = fs.read(src);
                        files = files.replace(item, html);
                    }
                }

            });
        }
        // 输出文件
        fs.write(destDir + '/' + filename, files);
    })
});
```

### 相关文章

* [官方地址：http://www.gruntjs.net/](http://www.gruntjs.net/)
* [傻瓜教程：http://developer.51cto.com/art/201506/479127_2.htm](http://developer.51cto.com/art/201506/479127_2.htm)