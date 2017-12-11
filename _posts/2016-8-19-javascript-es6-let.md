---
layout: post
title: ES6 - let
categories:
- ES6
---

传送门: [ES6文档](http://es6.ruanyifeng.com/#docs/let)

## Getting Started

es5变量声明：

* `var`

* `function`

es6新增的变量声明：

* `let`

* `const`

* `import`

* `class`
<!--break-->
## let

声明变量。

类似于`var`但是声明的变量只在`let`命令所在的代码块内有效。

```js
let a = 1;
var b = 2;

a;              // 1

b;              // 2

***************

// 另外一个例子
{
    let a = 1;
    var b = 2;
}

a;              // undefined

b;              // 2

```

```js
var a = [];

for ( var i = 0; i < 10; i ++ ){
     a[i] = function(){
          console.log(i);
     };
};

a[6]()   // 10

****************************************

// 另外一个例子
var b = [];

for ( let i = 0; i < 10; i ++ ){
     b[i] = function(){
          console.log(i);
     };
};

b[6]()   // 6
```

`let` 不存在变量提升。

```js
console.log(foo);               // 输出undefined
console.log(bar);               // error

var foo = 2;
let bar = 2;
```

`let` 暂时性死区

只要块级作用域内存在命令 `let` 不在受外部的影响。

### 块级作用域

外层作用域无法读取内层作用域的变量。

```js
{
  {let insane = 'Hello World'}
  console.log(insane); // 报错
};
```
块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了。

```js
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());

// 块级作用域写法
{
  let tmp = ...;
  ...
}
```

### do 表达式

现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上 `do`，使它变为 `do` 表达式。

```js
let x = do {
  let t = f();
  t * t + 1;
};
```