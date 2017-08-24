---
layout: post
title: 初识react
categories: [react]
---

> 一、JSX语法

`React` 独有的 `JSX` 语法， `javascript` 不兼容。使用 `Browser.js` ，将 `JSX` 语法转换成 `javascript` 语法。
```
<script type="text/babel">
  // ** Our code goes here! **
</script>

```
什么是 `JSX` 语法？ 就是 `HTML` 不使用引号直接和 `javascript` 混写。

`JSX` 语法基本规则：遇到 `HTML` 标签（以 `<` 开头），就用 `HTML` 规则解析；遇到代码块（以 `{` 开头），就用 `JavaScript` 规则解析。

`JSX` 允许直接在模板插入 `JavaScript` 变量。如果这个变量是一个数组，则会展开这个数组的所有成员。

> 二、React基本用法：

```
ReactDOM.render(
    '<h1>hello,world</h1>',
    document.getElementById('example')
)
```

> 三、React组件：

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});

ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

`React.createClass` 方法就用于生成一个组件类，`HelloMessage`就是一个组件类。

ps:

* 组件类的第一个字母必须大写，否则会报错。
* 添加组件属性，有一个地方需要注意，就是 `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor` ，这是因为 `class` 和 `for` 是 JavaScript 的保留字。
* 组件类只能包含一个顶层标签，否则会报错。如下例子会报错：

```
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1><p>
      some text
    </p>;
  }
});
```

组件的生命周期：

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

组件的样式写法：

```
错误写法：style="opacity:{this.state.opacity};"

正确写法：style=/{/{opacity: this.state.opacity/}/}
```

> 四、this.props.children

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。它表示组件的所有子节点。

```
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

> 五、PropTypes

验证别人使用组件时，提供的参数是否符合要求。

> 六、ref 用于获取真实的DOM节点

```
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

> 七、this.state

组件免不了要与用户互动，`React` 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 `UI`

```
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

> 八、表单

```
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

> 九、Ajax

```
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


