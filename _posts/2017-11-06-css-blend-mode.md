---
layout: post
title: css混合模式
categories:
- Css
subhead: css3新特性混合模式：可以实现Photoshop中的图层效果
---

### example
主要涉及到 `mix-blend-mode` 和 `background-blend-mode`。

先看一个视觉效果[【demo】](https://codepen.io/giana/full/PqVbRr/)。
<!--break-->

### `mix-blend-mode`

`mix-blend-mode` 主要是 `img`
```css
mix-blend-mode: normal;          //正常
mix-blend-mode: multiply;        //正片叠底
mix-blend-mode: screen;          //滤色
mix-blend-mode: overlay;         //叠加
mix-blend-mode: darken;          //变暗
mix-blend-mode: lighten;         //变亮
mix-blend-mode: color-dodge;     //颜色减淡
mix-blend-mode: color-burn;      //颜色加深
mix-blend-mode: hard-light;      //强光
mix-blend-mode: soft-light;      //柔光
mix-blend-mode: difference;      //差值
mix-blend-mode: exclusion;       //排除
mix-blend-mode: hue;             //色相
mix-blend-mode: saturation;      //饱和度
mix-blend-mode: color;           //颜色
mix-blend-mode: luminosity;      //亮度
mix-blend-mode: initial;         //初始
mix-blend-mode: inherit;         //继承
mix-blend-mode: unset;           //复原
```

`mix-blend-mode` 默认情况下是会混合所有比起层叠顺序低的元素的，如果我们希望值混合某一两个元素，而不是全部，该怎么办呢？

我们可以使用 `isolation` 属性将文字和它的包裹元素隔离起来，使它们不和背景图片进行混合。
```css
.haorooms {
    isolation: isolate;
}
```

### `background-blend-mode`

`background-blend-mode` 主要是背景图和背景色之间

<div class="div">
</div>