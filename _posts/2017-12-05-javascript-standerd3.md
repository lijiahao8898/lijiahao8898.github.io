---
layout: post
title: javascript （三）
categories:
- javascript
subhead: javascript - 基础 - 函数篇
---

> 函数

## 函数的调用
* 作为函数
* 作为方法
* 作为构造函数
* 通过他们的 `call()` 和 `apply()` 方法间接调用
<!--break-->

### 实参对象
`arguments` 并不是真正的数组，它是一个实参对象。每个实参对象都包含以数字为索引的一组元素以及 `length` 属性。