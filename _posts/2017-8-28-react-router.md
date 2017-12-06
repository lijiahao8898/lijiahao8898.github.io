---
layout: post
title: 初识react（三）— router
categories:
- react
---

### what is react-router ?

`react-router` 前端路由功能。

最大的特点是 `react-router` 不需要配置专门的路由配置文件，只需要像普通的组件一样，引入几个组件，就能够添加 `react` 的路由功能。

### 使用

`react-router` 的使用非常简单，它目前已经发行到了 v4 版本，而之前的3个版本在网络上也能找到非常多的应用。在这里我们仅拿最新的版本
作为示例。在 `react-router@4` 版本当中，专门为Web端提供了高度封装好的 `react-router-dom` 库，这下我们几乎不需要任何的配置就可
以直接使用前端路由功能了。
<!--break-->

```
/* 这里引入的3个方法全部都是封装好的 React 组件，使用方法和其他 React 组件几乎没有任何差别 */
const { HashRouter, Route, Redirect } = ReactRouterDOM;
```

#### HashRouter
`HashRouter` 为我们的应用提供了 `hash` 形式（也就是带#的路由）路由的功能支持。

```
/* 在通常情况下，我们不需要为 HashRouter 进行任何设置，直接引入使用即可。 */
<HashRouter>
  <App/>
</HashRouter>
```

主要到在 `react-router` 提供的所有类型的 `Router` 组件当中，第一级的子组件有且只能有一个。因此我们在使用的时候，通常在我们应用
组件的最外层包裹上一个 `<div>` 标签：

```
<HashRouter>
  <div>
    ...
  </div>
</HashRouter>
```

这里为了方便在线演示，所以我们使用了 `HashRouter` 组件，在实际的开发当中，更经常使用的是 `BrowserRouter` 组件，它可以为我们提
供不带 # 的前端路由支持，更加友好。

### Route

前端路由的主要功能就是通过判断不同的浏览器地址显示不同的内容，那么具体某个路由地址要怎么展示某个组件呢？

这就是 `Route` 组件为我们提供的功能：

```
<HashRouter>
    <div>
      <Route path='/:title?' component={App} />
    </div>
</HashRouter>
```

其中的 `path` 属性用来设置匹配的目标路由地址，路由地址可以是固定的字符串，例如 `home/about/user` 之类的，也可以像我们示例中一样
，以冒号开头将路由的地址作为参数，之后我们可以在组件当中获取到对应的路由参数（以?结尾则表示这一参数是可选的）：

```
const Title = props => <h1>{props.title}</h1>;

const App = ({ match }) => (
  <Provider store={store}>
    <Counter title={match.params.title} />
  </Provider>
);
```

这里的 `match.params.title` 也就是我们路由参数当中对应的值了。

### Link

有了前端路由的内容，我们还需要相应的前端路由的导航。前端路由导航的主要功能是实现浏览器地址栏 URL 的切换，并触发Web应用展示对应的内容，
而不是像原生的 HTML 超链接试图向服务器发起对应 URL 的请求。

`react-router` 同样为我们提供了现成的 `Link` 导航组件：

```
<HashRouter>
    <div>
      <ul>
        <li><Link to='/react'>react</Link></li>
        <li><Link to='/redux'>redux</Link></li>
        <li><Link to='/react-router'>react-router</Link></li>
      </ul>
      <Route path='/:title?' component={App} />
    </div>
</HashRouter>
```


