import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const initalState={
    count:0
}
const userInitalState={
    name:'React',
    age:12
}
function userReducer(state=userInitalState,action) {
    switch (action.type){
        case 'UPDATE_USERNAME':
            return{
                ...state,
                name:action.name
            }
        default:
            return state;
    }
}

/**
 * reducer
 * @param state
 * @param action：一个普通对象，描述事物行为;是 store 数据的唯一来源，会通过 store.dispatch() 将 action 传到 store。
 * @returns {{count: number}}
 */
function counterReducer(previousState=initalState,action) {
    switch (action.type){
        case  'ADD':
            return {
                ...previousState,
                count:previousState.count+(action.count || 1)
            }
        default:
            return previousState;
    }
}


/**
 * Action创建函数：生成action的方法
 */
function addAction(count){
    return {
        type:'ADD',//按照约定，必须要有type字段
        count,
    }
}
/**
 * 合并多个reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
let allReducer = combineReducers({
    user:userReducer,
    counter:counterReducer
});
let store = createStore(
    allReducer, {
        counter: initalState,
        user: userInitalState
    },
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

/**
 *派发行为
 * action：描述接下来要执行的动作
 */
store.dispatch({type:'ADD'});
store.dispatch(addAction(3))
/**
 * 异步派发dispath执行异步的action
 */
function addDispatch(num){
    return dispathch=>{
        setTimeout(()=>{
            dispathch(addAction(num))
        })
    }
}
store.dispatch(addDispatch(3))
/**
 * subscribe:监听数据变化
 */
store.subscribe(()=>{
    console.log('subscribe',store.getState())
})
store.dispatch({
    type:'UPDATE_USERNAME',
    name:'UPDATE_USERNAME'
})

export default store;