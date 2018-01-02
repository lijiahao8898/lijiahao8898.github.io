---
layout: post
title: javascript - css
categories:
- ES5
subhead: 脚本化css
---

### 脚本化内联样式

```js
element.style.fontSize = "16px"

/* 设置e的样式属性为字符串s */
e.setAttribute('style', s);
e.style.cssText = s;

/* 查询e的内联样式 */
e.getAttribute('style');
e.style.cssText
```
<!--break-->

#### 计算样式

```
getComputedStyle(element, ':before');
getComputedStyle(element, '');
getComputedStyle(element, 'null');
```
`getComputedStyle()` 返回的CSSStyleDeclaration对象和表示内联样式的对象之间有一些重要的区别：
* 计算样式是只读的
* 计算样式是绝对值
* 不计算复合属性
* 计算样式的 `cssText` 属性未定义