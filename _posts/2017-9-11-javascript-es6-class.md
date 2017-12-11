---
layout: post
title: ES6 - class
categories:
- ES6
subhead: class
---

es5的构造方法。

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

es6的写法。

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

注意，定义“类”的方法的时候，前面不需要加上 `function` 这个关键字，直接把函数定义放进去了就可以了。
另外，方法之间不需要逗号分隔，加了会报错。

es6的类，完全可以看作构造函数的另一种写法。
<!--break-->

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]

```

上面代码中，`toString` 方法是 `Point` 类内部定义的方法，它是不可枚举的。这一点与 `ES5` 的行为不一致。

```js
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function() {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

上面代码采用 `ES5` 的写法，`toString` 方法就是可枚举的。

类的属性名，可以采用表达式。