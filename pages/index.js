import Link from 'next/link';
import Router from 'next/router'
import {connect} from 'react-redux';
import {Button} from 'antd';
import store from './store/store.js';

//router变化钩子函数
const  events = [
    "routeChangeStart",
    "routerChangeComplete",
    "routerChangeError",
    "beforeHistoryChange",
    "hashChangeStart",
    "hashChangeComplete"
];

function makeEvent(type){
    return (...args)=>{
        console.log(type,...args)
    }
}

events.forEach(event=>{
    Router.events.on(event,makeEvent(event))
})
const Index=({count,username,add,rename})=>{
    return <>
        <p><input value={username} onChange={e=>rename(e.target.value)}/></p>
        <div><button onClick={e=>add(count+1)}>add count</button></div>
        <p><span>count:{count}</span>;
            <span>userName:{username}</span>
        </p>

    </>
}
export default connect(function mapStateToProps(state) {
    return {
        count:state.counter.count,
        username:state.user.name
    }
},
    function mapDispatchToProps(dispatch) {
        return {
            add:num=>dispatch({type:'ADD',num}),
            rename:name=>dispatch({type:'UPDATE_USERNAME',name})
        }
    })(Index)
