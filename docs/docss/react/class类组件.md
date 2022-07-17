---
title: class类组件
date: 2022-07-14
---
## setState//待更新

```jsx
this.setState({
  menuList,
 },() => {this.datafunc(menuList)});
```

## 类组件的传值方式

父传子传值

```jsx
//父组件
export default class App extends Component {
  state = {
    data:'啊吧啊吧',
  }
  render() {
    return (
      <div>
        <Hello data={this.state.data}></Hello>
      </div>
    )
  }
```

```jsx
//子组件
export default class Hello extends Component {
  render() {
    console.log(this.props.data)//通过this.props.组件名
    return (
      <div>
        hello
      </div>
    )
  }
}
```

 子传父传值

```jsx
//父组件
export default class App extends Component {
  state = {
    data:'啊吧啊吧'
  }
  datafunc = (value) => {
    console.log('app',value)
  }
  render() {
    return (
      <div>
      <List datavalue = {this.datafunc}></List>
      </div>
    )
  }
}
```

```jsx
//子组件
//父组件通过定义函数名,子组件通过this.props.组件名
export default class List extends Component {
  state = {
    value: 123
  }
  render() {
    this.props.datavalue(this.state.value)
    return (
      <div>
        子组件
      </div>
    )
  }
}
```

数据批量传递

```jsx
todos: [
      { id: 1, value:'吃饭'},
      { id: 2, value:'打代码'},
      { id: 3, value:'碎觉'}
    ]
<Item key={todos.id} {...todos}></Item>
//通过...来传递所有
```

## input数据存储

```jsx
//方法1:ref  (不推荐)
export default class List extends Component {
  butClick = () => {
    console.log(this.ketWordElement.value);//拿到input的值
  }
  render() {
    return (
      <div>
        <input ref={c => { this.ketWordElement = c }} type="text" />
        <button onClick={this.butClick}>按钮</button>
      </div>
    )
  }
}
```

```jsx
//方法2:event
export default class List extends Component {
  state = {
    value: '',
  }
  butClick = () => {
    const { value } = this.state
    console.log(value);//拿到inputde 
  }
  inputChange = (e) => {
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <div>
        <input onChange={(e) => { this.inputChange(e) }} type="text" />
        <button onClick={this.butClick}>按钮</button>
      </div>
    )
  }
}
```

## React.memo

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，当 state 或 context 发生变化时，它仍会重新渲染。

```jsx
const List = React.memo(props => {
  const { data } = props;//组件所传递的值
    return  (<div>{data}</div>);
}, (prevProps, nextProps) => {
    console.log(prevProps)//过去值
    console.log(nextProps)//现在值
    return prevProps.data===nextProps.data//当返回是false时,更新组件内容,为true时,不更新
});
export default List
```

与 class 组件中 shouldComponentUpdate()方法不同的是，如果 props 相等，areEqual 会回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate方法的返回值相反。