---
layout: post
title: 初识react（一）- react
categories:
- React
---

## 简介

### 前言

> 总觉得 `React` 特别难上手，主要还是对javascript这门语言本身的掌握存在着欠缺。所以断断续续的折腾了很久。
> 写这篇文章，主要是用来记录 `React@16.3` 和 `React-dom` 的相关知识。当然大部分还是看别人博文和文章并结合自身理解进行适当的记录和摘抄。
> 前端知识日新月异，麻麻我学不动了~>.<。

> * [React - 中文站 - http://react.yubolun.com/](http://react.yubolun.com/)
> * [React - 中文文档 - https://discountry.github.io/react/](https://discountry.github.io/react/)
> * [Lean React - 知乎专栏 - https://zhuanlan.zhihu.com/leanreact](https://zhuanlan.zhihu.com/leanreact)

```
You cannot improve your past, but you can improve your future.
so.
once time is wasted, life is wasted.
```
<!--break-->

### React相关

* `React` - 实现React功能的核心库。
* `React-dom` - 将虚拟DOM渲染到浏览器当中。
* `React-redux` - 解决状态管理问题的react版本。
* `React-router-dom@4.0` - react路由相关(4.0以组件的形式存在于各页面中)。

`react` 组件化的开发模式，所以非常适合高级做架构，中级封组件，初级写业务的模式。

## VirtualDOM
`React` 把真实的 `DOM树` 转换为 `javascript对象树`。

## JSX 语法

`JSX` 是 `JavaScript` 的扩展语法，也可以说是 `JavaScript` 的一种语法糖~。
`JSX` 对 `JavaScript` 的功能没有影响，只是便于程序猿使用。
`React` 独有的 `JSX` 语法， `javascript` 不兼容。使用 `Browser.js` ，将 `JSX` 语法转换成 `javascript` 语法。
```html
<script type="text/babel">
  // ** Our code goes here! **
</script>
```
当然一般项目中使用 `Webpack` 进行打包的，所以使用脚手架工具 `create-react-app` 构建的项目就自带了 `babel` 。<br/>
什么是 `JSX` 语法？ 就是 `HTML` 不使用引号直接和 `javascript` 混写。<br/>
`JSX` 语法基本规则：遇到 `HTML` 标签（以 `<` 开头），就用 `HTML` 规则解析；遇到代码块（以 `{` 开头），就用 `JavaScript` 规则解析。<br/>
`JSX` 允许直接在模板插入 `JavaScript` 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

### 基本用法

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
    <h1>hello,world</h1>,
    document.getElementById('example')
)
```
一般在项目中使用了 `jsx` 语法，所以需要默认引入 `react` 库，`react-dom` 是对dom进行相关的操作。<br/>
`ReactDOM.render` 实际上是使用了 `react` 的 `createElement` 方法。
```js
React.createElement(component, props, ...children)
```

## 组件
`React` 的组件一般分为 类组件 和 函数组件。类组件使用 `ES6` 的类方法和类的继承。

#### 老版本的react创建组件的方法

```jsx
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

`React.createClass` 方法就用于生成一个组件类，`HelloMessage`就是一个组件类。

注意：
* 组件类的第一个字母必须大写，否则会报错。
* 添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor` ，这是因为 `class` 和 `for` 是 JavaScript 的保留字。
* 组件类只能包含一个顶层标签，否则会报错。如下例子会报错：

```jsx
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1>
    <p>
      some text
    </p>
  }
});
```

新的注意点：在 `react@15.6` 当中已经废弃了 `createClass` 方法。下面分析函数定义组件和类定义组件：

#### 函数定义组件
比较简单的一些，只接受外部传入的数据的组件，我们一般通过函数定义的方式来编写：

```jsx
var Button = function(props) {
    return <button onClick={props.onClick}>+</button>;
}

// 当然也可以用 ES6 的 箭头函数 arrow function
const Number = ({ number }) => <p>{number}</p>;
```

#### 类定义组件
比较复杂的，需要处理事件，调用声明周期函数，与服务器交互数据的组件，我们通过类定义组件的方式来声明：

```jsx
// 从 React 库当中获取组件的基础支持
const { Component } = React;

// 使用 ES6 当中的 class 关键字来声明组件
class Container extends Component {
    /* 类中的构造方法，调用super方法来确保我们能够获取到this，组件自身的 state 数据也在构造方法当中初始化。*/
    constructor() {
        super();
        this.state = {
            number: 0
        }
    }
    /* 事件处理方法，在 React 当中我们通过调用 `setState` 方法来修改 state 数据，这样才能出发组件在界面当中自动重新渲染更新 */
    handleClick() {
        this.setState({number: this.state.number+1});
    }
    // 渲染方法，返回 React 元素
    render() {
        return (
            <div>
                <Title />
                <Number number={this.state.number} />
                <Button onClick={() => this.handleClick()} />
            </div>
            );
    }
}
```

#### 组件的生命周期

组件的生命周期钩子函数只在类组件中才有，所以一般要用到生命周期都要定义成类组件。而函数组件一般定义无状态的组件多点。
![avatar](../../../assets/react-lifecycle.jpg)
```
Mounting：已插入真实 DOM
Updating：正在被重新渲染
Unmounting：已移出真实 DOM

生命周期下对应的方法：
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()

特殊状态的处理函数：
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```

#### 组件的样式写法

```js
// 错误写法
style="opacity:{this.state.opacity};"

// 正确写法。因为文档的渲染语法的问题，这里增加了两个点区分，实际不需要。
style={`{opacity: this.state.opacity}`}
```

### this.props.children

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点。

```jsx
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

这里需要注意， `this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined` ;如果有一个子节点，数据类型是 `object` ；
如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children` 的时候要小心。
`React` 提供一个工具方法 `React.Children` 来处理 `this.props.children` 。
我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。

### PropTypes

验证别人使用组件时，提供的参数是否符合要求。

### ref 用于获取真实的DOM节点

```jsx
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```

### this.state

组件免不了要与用户互动，`React` 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 `UI`

```jsx
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```
上面代码是一个 `LikeButton` 组件，它的 `getInitialState` 方法用于定义初始状态，也就是一个对象，这个对象可以通过 `this.state` 属性读取。
当用户点击组件，导致状态变化，`this.setState` 方法就修改状态值，每次修改以后，自动调用 `this.render` 方法，再次渲染组件。
由于 `this.props` 和 `this.state` 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，`this.props` 表示那些一旦定义，
就不再改变的特性，而 `this.state` 是会随着用户互动而产生变化的特性。

### 表单

```jsx
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```

上面代码中，文本输入框的值，不能用 `this.props.value` 读取，而要定义一个 `onChange` 事件的回调函数，通过 `event.target.value` 读取用户输入的值。
`textarea` 元素、`select`元素、`radio`元素都属于这种情况。

### Ajax

```jsx
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);
```

组件的数据来源，通常是通过 `Ajax` 请求从服务器获取，可以使用 `componentDidMount` 方法设置 Ajax 请求，等到请求成功，再用 `this.setState` 方法重新渲染 UI

### 其他

#### props & state

`props` 就是组件数据的一种。在 `React` 当中，最常用的组件数据有两种：`props` 和 `state`.

其中 `props` 是从外部传入的，内部无法修改，用来渲染展示的数据。

而 `state` 则是组件内部维护，可以跟随应用状态改变而改变的数据（例如用户输入的表单项）。

### 相关
 :)鄙人整理的 [`React HTML PPT`](https://lijiahao8898.github.io/react-book/index.html#/)

