import Link from 'next/link';
import Router from 'next/router'
import {Button} from 'antd';

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

export default ()=>(
    <span>Index</span>
)
