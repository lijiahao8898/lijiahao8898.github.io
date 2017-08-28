---
layout: post
title: javascript - 对象
categories: [javascript]
---

JavaScript中所有变量都可以当做对象使用，除了两个例外 null 和 undefined。

注意：一个常见的误解是数字的字面值（literal）不能当作对象使用。这是因为 JavaScript 解析器的一个错误， 它试图将点操作符解析为浮点数字面值的一部分。

```js
2.toString();   // 出错：SyntaxError

// 变通方法
2..toString();
2 .toString();
(2).toString();
```
- - -

> 访问属性

有两种方式来访问对象的属性。点操作符或者中括号操作符

```js
var foo = { name: 'kitten' }

foo.name;               // kitten
foo['name’];            // kitten

var get = 'name';
foo[get];               // kitten

var foo = { 1234: 'kitten' }

foo.1234;               // SyntaxError
foo['1234'];            // kitten
```

两种语法是等价的，但是中括号操作符在下面两种情况下依然有效

* 动态设置属性
* 属性名不是一个有效的变量名 （比如属性名中包含空格，或者属性名是 JS 的关键词）

- - -

> 删除属性

删除属性唯一的方法是delete.

undefined和null 并不能删除属性. 而仅仅是移除了属性和值的关联

```js

var obj = {
    bar: 1,
    foo: 2,
    baz: 3
};
obj.bar = undefined;
obj.foo = null;
delete obj.baz;

for(var i in obj) {
    if (obj.hasOwnProperty(i)) {
        console.log(i, '' + obj[i]);
    }
}
```