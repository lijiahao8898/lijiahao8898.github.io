---
layout: post
title: javascript
categories: [javascript]
subhead: javascript - 基础
---

### Getting Start
javascript术语基本涵盖了以下三个部分：

* `ECMAScript` - 语言的核心部分（即变量，函数，和循环等等）。
* 文档对象模型（`DOM`）- DOM标准（与HTML，XML文档交互的方式）。
* 游览器对象模型（`BOM`）- 与游览器有关的对象集合。

面向对象程序设计的OOP常用到的概念：

* 对象（有时候也可以称作为"实例"）、方法、属性；
* 类 - 原型系统prototype，没有类的概念可以理解为模板；
* 封装 - 我们只需要知道所操作对象的接口，而不必去关心它的具体实现；
* 聚合 - 多个对象合并成一个新对象的过程；
* 重用和继承 - 实现代码的重用；
* 多态 - 不同的对象通过相同的方法调用来实现各自行为；

### 变量
变量的使用步骤：

1. 变量的声明
2. 变量的赋值

```js
var a = 1;
```

变量名可以由字母、数字、下划线及美元符号组合而成，但不能以数字开头。

变量名区分大小写。

### 操作符

* `+` - 加法运算

* `-` - 减法运算

* `*` - 乘法运算

* `/` - 除法运算

* `%` - 求余运算

* `++` - 自增1运算

```js
var a = 0;
var b = a++;
// b = 0;

var a = 0;
var b = ++a;
// b = 1;
```

* `--` - 自减1运算

```js
var a = 1;
var b = a--;
// b = 1;

var a = 1;
var b = --a
// b = 0;
```

* 复合操作符 `+=`，`-=`等。

### 数据类型
基本类型（原始类型）：

1. 数字 - 包括浮点数和整数：1、100、3.14。

2. 字符串 - 包括由任意数量字符组成的序列："a"，"one"，"one 2 three"。

3. 布尔值 - true 和 false

4. undefined

5. null

非基本类型（对象类型）：

1. 对象 - 特殊的对象包括（数组、函数）。如果函数使用 `new` 运算符新建一个对象，变将其称之为构造函数。类可以看做是对象类型的子类型，一共
有五种：数组类，函数类，日期类，正则类，错误类。

#### 数字
数字运算的 `Math` 对象。

* 无穷大 `Infinity`
* 负无穷大 `-Infinity`
* 非数字 `NaN` - 它和任何值都不相等，包括自身。

函数 `isFinite()` 在不是 `NaN`, `Infinity`, `-Infinity` 的时候返回 `true`。

用函数 `isNaN()` 在是 `NaN` 或者一个非数字值（字符串或者对象）的时候返回 `true`。
```js
Math.pow(2,53)          // 9007199254740992 2的53次幂
Math.round(.6)          // 1 四舍五入
Math.ceil(.6)              // 1 向上取整
Math.floor(.6)            // 0 向下取整
Math.abs(-5)             // 5 求绝对值
Math.max(2,3,5)        // 5 返回最大值
Math.min(2,3,5)         // 2 返回最小值
Math.random()          // 生成一个 >= 0 & < 1 的伪随机数
Math.PI                      // π 圆周率
Math.E                       // e 自然对数的底数
Math.sqrt(4)             // 2 4的平方根
Math.pow(8,1/3)        // 2 8的立方根
Math.sin(0)               // 三角函数。还有：Math.cos,Math.atan等
Math.log(10)              // 10的自然对数
Math.log(100)/Math.LN10 // 以10为底的100的对数
Math.exp(3)               // e的三次幂
```

#### 字符串
字符串是固定不变的。类似 `replace()` 和 `toUpperCase()` 都是返回新的字符串，原本的字符串并未发生改变。

字符串可以当做只读数组。
```js
var s = 'hello, world!'

// h 第一个字符
s.charAt(0)
// 类似于
s[0]

// d 最后一个字符
s.charAt(s.length - 1)

// ll 第三个到第四个字符
s.substring(2,4)

// ll 同上
s.slice(2,4)

// rld 最后三个字符
s.slice(-3)

// 2 首次出现"l"的位置
s.indexOf("l")

// 10 最后次出现"l"的位置
s.lastIndexOf("l")

// 3 在3位置及之后首次出现"l"的位置
s.indexOf("l",3)

// ["hello", " world"] 分割成子串
s.split(',')

// Hello, world 全文字符替换
s.replace("h", "H")

// HELLO, WORLD
s.toUpperCase()
```

#### 布尔值
下面的值都会转为 `false`
```
undefined
null
0
-0
NaN
""
```

#### null和undefined
```
null == undefined // true

null === undefined // false

typeof(null) // object

typeof(undefined) // undefined
```


