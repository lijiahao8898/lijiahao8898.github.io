---
layout: post
title: javascript - XMLHttpRequest
categories:
- ES5
subhead:
---

## XMLHttpRequest
一个请求一般由四部分组成：
1. 请求的方法或者动作。
2. 请求的RUL。
3. 一个可选的请求头集合，可能包含身份验证信息<!--break-->。
4. 一个可选的请求主体
服务器的响应包含三部分：
1. 一个数字和文字组成的状态码，用来显示请求的成功或者失败。
2. 一个响应头集合。
3. 响应主体。

### 请求

```js
/* 实例化 XMLHttpRequest 对象 */
var request = new XMLHttpRequest();

// 设定请求头
request.setRequestHeader("Content-Type", "text/plain");

/*
 * open() 第一个参数指定HTTP的动作或方法，不区分大小写。
 * 还支持 DELETE HEAD OPTIONS PUT
 * open() 第二个参数是url地址。
 */
request.open('GET/POST', 'data.scv');

// 发送请求的主体
request.send(null)
```

`GET` 请求没有绝对的主体，所以应该传递 `null` 或者省略这个参数。 `POST` 请求通常拥有主体，同时它应该匹配使用 `setRequestHeader()`
指定的 `Content-Type` 头。

### 响应

```js
// 获取响应的状态
request.status
request.statusText

// 获取响应头
getResponseHeader()
getAllResponseHeaders()

// 获取响应主体
responseText()
responseXML()
```

为了在响应准备就绪时得到通知，必须监听 `XMLHttpRequest` 对象上的 `readystatechange` 事件，当然还必须要了解 `readyState` 属性。

`readyState` 的状态：

| 常量               | 值     | 含义 |
|:----------------- |:--------|:---------------------|
| UNSENT            | 0       | `open()` 尚未调用 |
| OPENED            | 1       | `open()` 已调用 |
| HEADERS_RECEIVED  | 2       | 接收到头信息 |
| LOADING           | 3       | 接收到响应的主体 |
| DONE              | 4       | 响应完成|

下面是一个获取HTTP响应的例子
```js
/*
 * 发送一个HTTP GET请求以获得指定URL内容
 * 当响应成功，验证是否是纯文本
 * 如果是，则传递给回调函数
 */
 function getText(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);

    request.onreadystatechange = function(){
        // 如果请求完成，并且它是成功的。
        if(request.readyState === 4 && request.status === 200){
            var type = request.getResponseHeader('Content-Type');
            // 确定响应的是文本
            if(type.match(/^text/)){
                // 把他传递给回调函数
                callback(request.responseText)
            }
        }
    }

    // 立即发送请求
    request.send(null);
 }
```

#### 同步响应

```js
// 只要将 open() 的第三个参数 设置为 false
request.open('GET', url, false);
```