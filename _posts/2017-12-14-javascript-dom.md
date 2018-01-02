---
layout: post
title: javascript - dom
categories:
- ES5
subhead:
---

### 创建节点

```js
document.createTextNode('text node content');
```

### 插入节点
```js
appendChild()

insertBefore()
```

### 删除和替换节点
```js
removeChild()

replaceChild()
```

### 文档坐标和视口坐标
```js
window.pageXOffset
window.pageYOffset

window.scrollX
window.scrollY

document.documentElement.clientHeight
document.documentElement.clientWidth

document.documentElement.offsetHeight

document.documentElement.scrollLeft

// 查询元素的几何尺寸
// getBoundingClientRect 返回的坐标包含元素的边框和内边距
document.documentElement.getBoundingClientRect()
```