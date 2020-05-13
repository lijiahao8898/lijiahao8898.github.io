---
layout: post
title: 初识react（二）- redux
categories:
- React
---

> * [redux - 中文文档](http://cn.redux.js.org//index.html)
> * [知乎专栏 - https://zhuanlan.zhihu.com/p/28241673](https://zhuanlan.zhihu.com/p/28241673)

### what is redux ?
`react` 处理数据的方式主要有 `props` 和 `state` 两种。

其中的 `props` 必须是从父组件传递到子组件，如果嵌套层级很多，`props` 必须逐级从保存数据的组件层层
传递到使用 `props` 的组件当中。而 `state` 在使用的时候，必须通过调用 `this.setState()` 方法，
在改变 `state` 值的同时，触发 `React` 组件运行的生命周期，来触发界面的更新。 `this.setState()` 方
法可以传递数据、方法、回调函数。在同一次操作中，连续调用多次 `this.setState()` 方法也会造成许多难以预料的结果，
仅仅通过看代码你很难判断出最后值会变成什么。

`redux` 的理念：把一个应用的所有状态数据存储在一个统一的地方集中管理。
<!--break-->

如下图：
<img src="../../../assets/1.png">

### Action

`Action` 就是用统一的形式，描述所有改变应用状态数据的操作的方法。其实就是一个带有 `type` 属性的一
个 `JavaScript` 对象。

```
{
  type: 'INCREMENT',
  value: 1
}
```

### Reducer
`Reducer` 则是 `Redux` 的设计理念当中最核心的方法，它接受当前的状态数据以及触发的 `Action` 操作作为参数，
根据内部 `switch` 结构的逻辑判断，返回一个新的状态数据：

```js
(previousState, action) => newState
```

例如在我们的计数器当中，可以抽象编写出这样一个 `Reducer` 方法：

```js
function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }
    switch (action.type) {
      case 'INCREMENT':
        return state + action.value
      default:
        return state
    }
}
```

我们可以看到 `counter` 函数接受 `state` 和 `action` 两个参数，返回值则是经过一个 `switch` 结构判断的新的 `state`数
据。这样结构的函数也就是我们在使用 `Redux` 时编写的 `Reducer` 方法。

这是 `Redux` 理念当中最核心的一个部分，它决定了一个应用当中的状态数据在不同的 `Action` 被触发时具体会如何改变。

### Store
`Store` 则是 `Redux` 当中我们用来存储状态数据的地方，它提供了3个主要的方法：

* 用来获取当前状态数据的 `getState()`
* 用来触发应用 `action` 动作的 `dispatch(action)`
* 用来订阅响应事件（`state`改变之后进行的操作）的 `subscribe(listener)`

而在使用 `Redux` 时，我们可以通过它提供的 `createStore` 方法，直接从 `reducer` 函数生成对应的 `store` ：

```js
const { createStore } = Redux;

const store = createStore(counter);
```

当然可以直接在 `react` 中使用 `redux` ：

```js
// 把之前 React 的渲染函数命名为 render
const render = () => {
  /* 传入 store.getState() 获取 Redux 当中存储的状态数据
   * 传入 store.dispatch() 方法来执行对应 action 修改状态数据
   */
  ReactDOM.render(<Counter
              number={store.getState()}
              onIncrement={() => store.dispatch({
                          type: 'INCREMENT',
                          value: 1
                        })}
             />,
             document.getElementById('root'));
}

// 调用一次 render 方法进行初次渲染
render()

// 使用 store.subscribe 方法订阅 render 这样每次 store.dispatch 方法触发时就会自动调用 render
store.subscribe(render);
```

### react-redux

当然，每次 `Redux` 当中的状态数据改变时都强制执行 `ReactDOM` 的 `render` 方法并不是最优选择。事实上，
社区已经开发出了一个名为 `react-redux` 的库专门来辅助我们对 `React` 和 `Redux` 进行协同使用。

```js
/* Provider 充当为整个 React 应用传入 Redux 当中 store 的容器组件
 * connect 用来为需要使用 store 的组件提供相应的状态数据或 dispatch 方法
 */

const { Provider, connect } = ReactRedux;

/* 我们通过 mapStateToProps 来将 Redux 当中的状态数据映射到 React 相应的 props 当中 */

const mapStateToProps = state => ({
  number: state
});

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {

    // 在这里调用传入组件的 dispatch 方法

    this.props.dispatch({
      type: 'INCREMENT',
      value: 1
    });
  }

  render() {
    return (
      <div>
        <Title />
        <Number number={this.props.number} />
        <Button onClick={() => this.handleClick()} />
      </div>
    )
  }
}
/* 我们需要通过 connect 方法来包装一下 React 的 Counter 组件，使其获取到 Redux 的 store 当中的方法和数据 */
Counter = connect(mapStateToProps)(Counter);
```

在react里面用redux，一般我们会用到react-redux，其中包括Provider和connect接口

Provider接收redux的createStore()的结果，并且放到context里，让子组件可以通过context属性直接获取到这个
createStore的结果，这个createStore的结果是啥呢，如下几个函数:
```
return {
        //真正的返回，执行createStore其实返回的就是这些东东
        dispatch,       //触发action去执行reducer，更新state
        subscribe,     //订阅state改变，state改变时会执行subscribe的参数（自己定义的一个函数）
        getState,      //获取state树
        replaceReducer,       //替换reducer
 }
 ```
而connect，接收到mapStateToProps，会在内部subscribe全局state的改变，来判断props是否更改，如果需要更新，才触发更新。

react-redux就是不需要你自己去subscribe全局state的变化，以及去getState，还有判断组件是否需要更新。也是它存在的意义


subscribe 这个函数是用来去订阅 store 的变化，比如你每次对 store 进行 dispatch(action) 都会触发 subscribe 注册的函数调用，这个在实际情况不是必须要的，看自己的应用场景，比如你想监控 store 的全局变化时 可以用 subscript 订阅一下，然后作一些反应

你如果实在想弄清楚，他的应用价值 可以先看下 react-redux 里 connect 实现，里面就应用到了 store 的 subscribe https://github.com/reactjs/react-redux/blob/master/src/utils/Subscription.js#L69

每次通过dispatch 修改数据的时候，其实只是数据发生了变化，如果不手动调用 render方法，页面上的内容是不会发生变化的。

但是每次dispatch之后都手动调用很麻烦啊，所以就使用了发布订阅模式，监听数据变化来自动渲染。