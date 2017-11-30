---
layout: post
title: javascript （二）
categories: [javascript]
subhead: javascript - 基础
---

### 数组
数组的创建：
```js
var a = [];
var b = new Array();
```

数组的读：
```js
var a = [1,2];
a[0]; // 1
```

数组的写：
```js
var a = [];
a[0] = 1;
```

#### 稀疏数组
稀疏数组就是数组的 `length` 属性大于数组的元素的个数或者说是从0开始的不连续索引的数组。

#### 数组的添加和删除
数组的添加：
```js
var a = []
a[0] = 1;

 // 在数组的尾部添加一个 等价于 a[a.length] = 3;
a.push(2)

 // 在数组的首部添加一个
a.unshift(4)
```

数组的删除：
```js
var a = [1,2,3]

// 删除数组的最后一个元素
a.pop() // [1,2]

// 删除数组的第一个元素
a.shift() // [2]

var b = [1,2,3,4];

//
b.splice(1,1); // [1,3,4]
b.length       // 3;

// delete 删除数组不会改变数组的长度
delete b[0]
b.length       // 3
```

#### join()
```js
var a = [1,2,3];
a.join();  // "1,2,3"

var b = [1,2,3];
b.join(" "); // "1 2 3"
```

#### reserve()
`Array.reserve()` 是将数组颠倒顺序，返回逆序的数组。
```js
var a = [1,2,3];
a.reserve();  // [3,2,1];
```

#### sort()
`Array.sort()` 将数组排序，并返回排序后的数组。

当不带参数调用 `sort()` 时，默认按照字母表的顺序排序。

也可以传递一个比较函数：
```js
var a = [2,3,1];
a.sort(function(a,b){
    return a-b;
}) // [1,2,3]

a.sort(function(a,b){
    return b-a;
}) // [3,2,1]
```
如果第一个数应该在前，返回一个小于0的数。如果第一个数在后，返回一个大于0的数。如果两个数相等。返回一个等于0的数。

#### concat()
`Array.concat()` 创建并返回一个新的数组。
```js
var a = [1,2,3];

a.concat(4,5);  // [1,2,3,4,5]
a.concat([4,5]) // [1,2,3,4,5]
a.concat([4,5],[6,7]) // [1,2,3,4,5,6,7]
a.concat(4,[5,[6,7]]) // [1,2,3,4,5,[6,7]]
```

#### slice()
`Array.slice()`

....未完待续！