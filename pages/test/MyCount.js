import React,{useState, useEffect,useReducer} from 'react';
class MyCount extends React.Component{
    state = {
        count : 0
    }
    componentDidMount(){
        this.interval = setInterval(()=>{
            this.setState({ count: this.state.count + 1})
        },1000)
    }
    
    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval);
        }
        
    }
    render(){
        return(
            <>
                <span>{this.state.count}</span>
            </>
        )
    }
}

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
    const [count,dispatchCount] = useReducer(countReducer,0);//返回[初始值，reducer函数]
    useEffect(()=>{
        const interval=setInterval(()=>{
            //setCount(c=>c+1);
            dispatchCount({type:'add'})
        },1000);
        return ()=>clearInterval(interval);
    },[]);
    return <span>{count}</span>
}
export default MyCountFun;