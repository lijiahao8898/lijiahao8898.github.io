---
layout: post
title: ES6
categories: [javascript]
---

传送门: [ES6文档](http://es6.ruanyifeng.com/#docs/let)

## 1. let

声明变量。

类似于`var`但是声明的变量只在`let`命令所在的代码块内有效。

```
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

```
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

let 不存在变量提升。

```
console.log(foo);               // 输出undefined
console.log(bar);               // error

var foo = 2;
let bar = 2;
```