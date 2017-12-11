---
layout: post
title: javascript - this
categories:
- ES5
---

<br/>
 `this` 是 `JavaScript` 的一个关键字。代表在函数运行时，自动生成的一个内部对象，这个内部对象被称为函数上下文，只在函数内部调用。

在看本文章时。先把下面的话记住。不然你会懵逼！血崩！

`this` 对象是在运行时基于函数的执行环境绑定的：
1. 在全局函数中，this等于window。
2. 当函数作为某个对象的方法调用时，this指向那个对象。
3. 匿名函数的执行环境具有全局性，因此this通常指向window。

<!--break-->
### 纯粹的函数调用

```js
/* 这是函数的最通常用法，属于全局性调用，因此this就代表全局对象Global。
   ps:在非严格模式下。如果在严格模式下则为undefined。
   test() 又可以写作 window.test() */

// 写法1
function test () {
     this.x = 1;
     alert(this.x);
};

test();                    // 1

// 写法1拓展
function test () {
     'use strict'
     this.x = 1;
     alert(this.x)
};

test()                    // error! x undefined

// 写法2
var x = 1 ;
function test () {
     alert(this.x);
};

test()                     // 1

// 写法3
var x = 1 ;
function test () {
     this.x = 0;
};

test();

alert(x);                 // 0
```

### 作为对象方法的调用

```js
/* 函数还可以作为某个对象的方法调用，这时this就指这个上级对象。 */

function test (){
     alert(this.x);
}

var o = {};
o.x = 1;
o.m = test;
o.m();     // 1
```

### 作为构造函数调用

```js
/* 所谓构造函数，就是通过这个函数生成一个新对象（object）。这时，this就指这个新对象。*/

// 写法1
function test () {
     this.x = 1;
}

var o = new test();

alert(o.x);     // 1

// 写法2
var x = 2;

function test () {
     this.x = 1;
}

var o = new test();

alert(o.x);     // 1
```

### apply(,[])和call(,[],[])调用

```js
/* apply()是函数对象的一个方法，它的作用是改变函数的调用对象。
   apply()的第一个参数就表示改变后的调用这个函数的对象。因此，this指的就是这第一个参数
   apply()传入2个参数。一个作为函数上下文对象，另一个作为函数参数所组成的数组。
   call() 与 apply()唯一不同的是给函数传入的参数是一个参数列表，而不是单个数组。*/

// example 1
var x = 0;

function test(){
     alert(this.x);
}

var o={};
o.x = 1;
o.m = test;
o.m.apply();      //0

// example 2
var x = 0;

function test(){
     alert(this.x);
}

var o={};
o.x = 1;
o.m = test;
o.m.apply(o);      //1
```

### ES6 this

```js
/* es6中，箭头函数中始终会捕捉其“定义时”所在上下文的this值，作为自己的this. */

// example 1
const obj = {
    func: () => {
        console.log(this === window); // true，非箭头函数时指向 obj
    }
};

obj.func();

// example 2
const obj = {
     func: function(){
          console.log(this === obj); // true
     }
};
obj.func();
```

```js
/* 创建一个含有bar方法的obj对象，bar返回一个函数，这个函数返回它自己的this，
   这个返回的函数是以箭头函数创建的，所以它的this被永久绑定到了它外层函数的this。
   bar的值可以在调用中设置，它反过来又设置返回函数的值。*/
var obj = {
    bar: function() {
        var x = (() => this);
        return x;
    }
};

/* 作为obj对象的一个方法来调用bar，把它的this绑定到obj。
   x所指向的匿名函数赋值给fn。*/
var fn = obj.bar();

/* 直接调用fn而不设置this，通常(即不使用箭头函数的情况)默认为全局对象，若在严格模式则为undefined */
console.log(fn() === obj); // true

/* 但是注意，如果你只是引用obj的方法，而没有调用它(this是在函数调用过程中设置的) */
var fn2 = obj.bar;
/* 那么调用箭头函数后，this指向window，因为它从 bar 继承了this。*/
console.log(fn2()() == window); // true
```

### 其他

```js
/* bind() 改变函数上下文
   ECMAScript 5 引入了 `Function.prototype.bind`，其会创建一个绑定函数，当调用这个绑定函数时，函数上下文将会是 bind() 方法的第一个
   参数。上面的例子中，将 obj1 设置为函数上下文，所以利用 func 来调用函数时，函数的上下文为 obj1，而不是它的调用者 obj2。*/

const obj1 = {
     a: 1
};

const obj2 = {
     a: 2,
     func: function() {
          console.log(this.a);
     }.bind(obj1)
};

obj2.func(); // 1

// Array 的 5 个 方法（ 暂时不看 ）
every,some,forEach,map,filter

const arr = ["segmentfault"];
const obj = {};
arr.forEach(function(ele, ind) {
     console.log(this === window); // true
});
arr.forEach(function(ele, ind) {
     console.log(this === obj); // true
}, obj);
```

## PS - 相关问题

```js
// example 1
console.log(this)

// example 2
const obj = {
     someData: 'string'
}

function myFun(){
     console.log(this);
}
obj.staticFunction = myFun;
obj.staticFunction();

// example 3
const obj = {
     myFunc: function(){
          console.log(this);
     }
}
const myFun = obj.myFunc;
myFun()

// example 4
function myFun(){
     console.log(this);
}
const obj = {
     someData : 'a'
}
myFun.call(obj);
```

```js
// 知乎一个人的提问：https://www.zhihu.com/question/34450250
// ps:这是一个坑！！！
// ps: this 是基于函数的执行环境绑定的。而不是定义环境。

// example1
var name = 'obj';
var objA = {
     name: 'A',
     showName: function(){
          console.log(this.name);
     }
}
var objB = {
     name: 'B',
     showName: function(){
          var show = objA.showName();
          show;               // show;
     }
}
objB.showName();                         // A

// example 2
var name = 'obj';
var objA = {
     name: 'A',
     showName: function(){
          console.log(this.name);
     }
}
var objB = {
     name: 'B',
     showName: function(){
          var show = objA.showName;
          show();
     }
}
objB.showName();                         // obj

// example 2 又可以理解成
var name = 'obj';
var objA = {
     name: 'A',
     showName: function(){
          console.log(this.name);
     }
}
var objB = {
     name: 'B',
     showName: function(){
          return function(){
               alert(this.name)
          }
     }
}
objB.showName();                         // obj

// example 3
var name = 'obj';
var objA = {
     name: 'A',
     showName: function(){
          alert(self.name);
          console.log(‘a:'+self);
     }
}
var objB = {
     name: 'B',
     showName: function(){
          var self = this;
          var show = objA.showName;
          console.log('b:'+self);
          show();
     }
}
objB.showName();                         // obj
                                         // b
                                         // window
```

相关文章地址：

* [知乎: https://zhuanlan.zhihu.com/p/23023311](https://zhuanlan.zhihu.com/p/23023311)
* [阮一峰：http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
* [秘密花园：https://bonsaiden.github.io/JavaScript-Garden/zh/#function.this](https://bonsaiden.github.io/JavaScript-Garden/zh/#function.this)