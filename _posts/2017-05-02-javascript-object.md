---
layout: post
title: Object
categories:
- ES5
---

> 整理一下碰到的 `Object` 的一些方法。 `Object.keys` 、`Object.defineProperty`、`Object.assign`

### Object.keys( )
返回一个数组，包含指定对象的所有自有可遍历属性的名称。
[MDN详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

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
<!--break-->

### Object.defineProperty
直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
[MDN详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

语法：
`Object.defineProperty(obj, prop, descriptor)`
* `obj` 要在其上定义属性的对象。
* `prop` 要定义或修改的属性的名称。
* `descriptor` 将被定义或修改的属性描述符。

```js
// 使用 __proto__
var obj = {};
var descriptor = Object.create(null); // 没有继承的属性
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// 显式
Object.defineProperty(obj, "key", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "static"
});

// 循环使用同一对象
function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      writable: false,
      configurable: false,
      value: null
    }
  );
  d.value = value;
  return d;
}
// ... 并且 ...
Object.defineProperty(obj, "key", withValue("static"));

// 如果 freeze 可用, 防止代码添加或删除对象原型的属性
// （value, get, set, enumerable, writable, configurable）
(Object.freeze||Object)(Object.prototype);
```
### Object.assign
`Object.assign` 浅复制对象。
1234
