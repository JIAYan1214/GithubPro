import React,{useState, useEffect,useReducer,useContext,memo,useMemo,useCallback} from 'react';
import MyContext from  '../../lib/MyContext';
function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state+1;
        case 'minus':
            return state-1;
        default :
            return state;
    }
}
function MyCountFun(){
    //声明一个count
    //useState 会返回一对值：当前状态和一个让你更新它的函数，
    //useState(0):参数是初始值（第一次渲染用到），这个初始值和this.state不同的是，它不一定是一个对象。
    //const [count, setCount] = useState(0);//state hook方法，一个组件中多次使用 State Hook:
    const [count,dispatchCount] = useReducer(countReducer,20);//返回[初始值，reducer函数]
    const  [name,setName] = useState('hello');
    const context = useContext(MyContext);
    const config =useMemo(()=>({
        text:`count is ${count}`,
        color:count>3 ? 'red' :'blue'
    }),[count]);
    const handleButtonClick = useCallback(()=>dispatchCount({type:'add'}),[])
    // useEffect(()=>{
    //     const interval=setInterval(()=>{
    //         //setCount(c=>c+1);
    //         dispatchCount({type:'minus'})
    //     },1000);
    //     return ()=>clearInterval(interval);
    // },[]);
    //[]可选参数：

    return <div>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
        <Child
            config={config}
            onButtonClick={handleButtonClick}
        />
        <p>{context}</p>
    </div>
}
export default MyCountFun;
const Child = memo(function ({onButtonClick,config}) {

    console.log('child render');
    return(
        <button
            onClick={onButtonClick}
            style={{color:config.color}}
        >
            {config.text}
        </button>
    )
})