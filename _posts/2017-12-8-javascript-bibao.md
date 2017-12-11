---
layout: post
title: 闭包
categories:
- ES5
subhead: javascript - 闭包
---

## 简述
函数的执行依赖变量作用域，这个作用域是在函数定义时决定的，而不是函数执行时决定的。为了实现这种词法作用域，`JavaScript` 函数对象的内部
状态不仅包含函数的代码逻辑，还必须引用当前的作用域链。函数对象可以通过作用域链互相关联起来，函数体内部的变量都可以保存在函数的作用域内，
这就是 "闭包"。

也就是说：函数定义时的作用域链到函数执行的时候依然有效。d

```js
var a = 'window'

function check(){
    var a = 'local';
    function f(){
        console.log(a);
    }
    return f;
}

check()() // local
```
`JavaScript` 的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。

```js
var uniqueInteger = (function(){
    var count = 0;
    return function(){ return count++ }
}())
```
