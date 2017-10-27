---
layout: post
title: object
categories: [javascript]
---

### object.keys( )
返回一个数组，包含指定对象的所有自有可遍历属性的名称。

```js
var vendors = {
  '': '',
  Webkit: 'webkit',
  Moz: '',
  O: 'o',
  ms: 'ms'
};

Object.keys(vendors)            // ["", "Webkit", "Moz", "O", "ms"]
```
