# GithubPro
React16.8,Next.js,Koa
### Hooks

Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState是允许你在 React 函数组件中添加 state 的 Hook。

Hook 使用了 JavaScript 的闭包机制
##### 作用
* * *
>1.函数式组件有类组件的能力

### useState
>1.useState返回一个当前状态和更新状态函数
    `const [count, setCount] = useState(0);`//0：是count的初始化状态值
    更新状态函数类似于class类组件里面的setState，但是它不会自动合并新老状态值；
    useState的唯一的参数是初始化状态值；

### useEffect (状态管理hook)
> ##### 提示
> 1.可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
> 2.`
useEffect(() => {reducer函数}, [count]); // 仅在 count 更改时更新`，，如果第二个参数为空数组，这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值


**useEffect 做了什么？**
可以告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它

**为什么在组件内部调用 useEffect？**
将 useEffect 放在组件内部让我们可以在 effect 中直接访问 count state 变量（或其他 props）。

**useEffect 会在每次渲染后都执行吗？**
默认情况下，它在第一次渲染之后和每次更新之后都会执行。

>与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。


#### 需要清除的 effect
**可以防止引起内存泄露！**

>如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它：

**为什么要在 effect 中返回一个函数？**
这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。

>***注意：在组件渲染时会执行一下useEffect,再次更新的时候如果effect有返回函数，会先执行清除操作，然后在执行，更新操作。2.如果有useeffect又返回卸载函数：如果useEffect第二个参数为空数组：它只会在渲染的时候调用更新，再卸载组件的时候调用清楚机制***
>2.useEffect会根据传入的第二个参数里面的依赖判断是不是要重新执行

**React 何时清除 effect？**
React 会在组件卸载的时候执行清除操作。
#### useLayoutEffect
1.layoutEffect比useEffect率先执行
2.再计算新的节点树之前，没有更新真正的DOM树html之前，会先执行useLayoutEffect里面的回调；dom节点更新到真正的html后，会执行useEffect。
#### ContextHook
`
const value = useContext(MyContext);
`

接收一个context对象（react.createContext()的返回值），并返回当前context的值。当前context值是有上层距离最近的组件<MyContext.Provider> 的 value prop 决定。
useContext 的参数必须是 context 对象本身：useContext(MyContext)

#### 数据缓存
> 1.增加yarn add lru-cache;
> 
> 2.引入lru，创建lru实例
  `const cache = new LRU({
      maxAge:1000*60*10,//缓存10分钟
  })
  `<br/>
  set,get设置获取
  
>
