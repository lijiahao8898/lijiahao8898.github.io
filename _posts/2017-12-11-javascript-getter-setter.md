---
layout: post
title: getter 和 setter
categories:
- ES5
subhead: javascript 中的 getter 和 setter 介绍
---

## 简介

`javascript` 中的 `setter` 、`getter` 是平时接触比较少的方法，其本身也并不是标准方法，只在非ie浏览器里支持（ie内核也许有其他方法可以做到呢？暂
时不知其解），但是加以利用可以做许多事情<!--break-->。譬如：


1. 对数据的访问限制：

`a.value` 是对 `value` 变量的 `getter` 方法调用，如果在 `getter` 方法实现中抛出异常，可以阻止对 `value` 变量的访问。

2. 对dom变量进行监听：

`window.name` 是一个跨域非常好用的 `dom` 属性（大名鼎鼎，详见百度），如果覆盖 `window.name` 的 `setter`实现则可以实现跨页面的内存
异步通信

`Getters` 和 `Setters` 使你可以快速获取或设置一个对象的数据。一般来说，一个对象拥有两个方法，分别用于获取和设置某个值，比如：

```js
{
    getValue: function(){
        return this._value;
    },
    setValue: function(val){
        this._value = val;
    }
}
```

用这种方式写 `JavaScript` 的一个明显的好处是：

你可以用它来隐藏那些不想让外界直接访问的属性。最终的代码看起来就像下面这样（用闭包保存新创建的 `Filed` 对象的 `value` ）：
```js
function Field(val){
    var value = val;
    this.getValue = function(){
        return value;
    };
    this.setValue = function(val){
        value = val;
    };
}
```

于是我们可以这样使用：

```js
    var field = new Field("test");
    field.value         // undefined
    field.setValue("test2")
    field.getValue()    // "test2"
```

我们来模拟上例中的 “隐藏的value属性”，我们的代码就像这样：

```js
    function Field(val){
        var value = val;
        this.__defineGetter__("value", function(){
            return value;
        });
        this.__defineSetter__("value", function(val){
            value = val;
        });
    }
```

但是呢，你不喜欢这样写，而倾向在对象的 `prototype` 中定义 `getters` 和 `setters`（私有变量写在哪并不重要），我们可以用另一种语法。

```js
    function Field(val){
        this.value = val;
    }
    Field.prototype = {
        get value(){
            return this._value;
        },
        set value(val){
            this._value = val;
        }
    };
```

### 总结
* 一个对象内，每个变量只能有一个 `getter` 或 `setter` 。（因此 `value` 可以有一个 `getter` 和一个 `setter` ，但是 `value` 绝没有两
个 `getters`）。
* 删除 `getter` 或 `setter` 的唯一方法是：`delete object[name]`。`delete` 可以删除一些常见的属性，`getters` 和 `setters` 。
* 如果使用 `__defineGetter__` 或 `__defineSetter__` ，它会重写之前定义的相同名称的 `getter` 或 `setter`，甚至是属性( `property` )。