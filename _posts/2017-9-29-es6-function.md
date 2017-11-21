---
layout: post
title: ES6 - function
categories: [javascript]
---

### 函数参数的默认值

可以直接写在参数定义的后面：

```js
function log(x, y = 'world') {
    console.log(x, y);
}

log(1);
```

注意点：

* 如果函数参数是默认声明的，不能用 `let` 或 `const` 再次声明。

* 使用参数默认值时，函数不能有同名参数

* 另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。如下

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

上面代码中，参数p的默认值是 `x + 1` 。这时，每次调用函数 `foo` ，都会重新计算 `x + 1` ，而不是默认 `p` 等于 `100` 。

### 与解构赋值默认值结合使用

### 参数默认值的位置

### 函数的 length 属性

### 作用域

### rest 参数

```js
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

### name 属性

### new.target

### 箭头函数

```js
var f = v => v;

// 等价于

var f = function(v) {
    return v;
}
```
箭头函数有以下注意点：

* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

* 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

### 尾调用

### 尾递归






