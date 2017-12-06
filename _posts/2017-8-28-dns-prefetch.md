---
layout: post
title: dns-prefetch
categories:
- browser
subhead: 游览器性能提升
---

### what is dns-prefetch ?
`DNS` 请求需要的带宽非常小，但是延迟却有点高，这点在手机网络上特别明显。

`dns-prefetch`, 是 `DNS` 预获取，也是网页前端的优化的一种技术。其范围包括文档的所有链接，无论是
图片的，`CSS` 的，还是 `JavaScript` 等其他用户能够点击的 `URL`。

一般在前端优化中与 `DNS` 有关的两点：
1. 减少请求次数
2. 提前对 `DNS` 预获取。

`DNS` 作为互联网的基础协议，其解析速度很容易被网站优化人员、SEO人员忽视，其典型的一次 `dns-prefetch`解析需要“20-120ms",
减少 `DNS` 解析时间和次数是一个不错的优化方式。

`dns-prefetch` ​的作用简单说明就是当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页链接
无需 `DNS` 解析，减少浏览者等待时间，提高用户体验。
<!--break-->

浏览器对网站第一次的域名 `DNS` 解析查找流程依次为：
1. 浏览器缓存
2. 系统缓存
3. 路由器缓存
4. ISP DNS缓存
5. 递归搜索

<img src="../../../assets/2.jpeg">

### 那么如何添加 dns-prefetch ？

当然在浏览器支持方面 `chrome`、 `firefox3.5`、`safari 5+`、`IE9`等。`dns-prefetch` 放入位置推荐在后面。具体代码为：

```html
<!-- X-DNS-Prefetch-Control 头控制着浏览器的 DNS 预读取功能
content: on 启用 DNS预解析，off 关闭 DNS预解析 -->

<meta http-equiv="x-dns-prefetch-control" content="on" />

<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
```

### 打开和关闭 DNS 预读取

你可以通过在服务器端发送 `X-DNS-Prefetch-Control` 报头，或是在文档中使用值为 `http-equiv` 的 `<meta>` 标签：

```html
<meta http-equiv="x-dns-prefetch-control" content="off">
```

您可以通过将 `content` 的参数设置为 `“on”` 来改变设置。

### 强制查询特定主机名

你可以通过使用 `rel` 属性值为 `link type` 中的 `dns-prefetch` 的 `<link>` 标签来对特定域名进行预读取：

```html
<link rel="dns-prefetch" href="http://www.spreadfirefox.com/">
```

而且，`<link>` 元素也可以使用不完整的 `URL` 的主机名来标记预解析，但这些主机名前必需要有双斜线：

```html
<link rel="dns-prefetch" href="//www.spreadfirefox.com">
```

强制对域名进行预读取在有的情况下很有用, 比如, 在网站的主页上，强制在整个网站上频繁引用的域名的预解析，即使它们不在主页本身上使用。
即使主页的性能可能不受影响，这将提高整体站点性能。


需要注意，虽然 `dns-prefetch` 能够加快网页解析速度，但是也不能随便滥用，因为多页面重复 `DNS` 预解析会增加重复 `DNS` 查询的次数。

### 总结

在优化当中 `dns-prefetch` 对网页预获取，在提高大型网站浏览速度方面可以提高，不用让浏览者等待是一个不错的方法。