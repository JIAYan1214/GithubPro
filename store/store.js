import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios';

const userInitialState = {};


const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.name,
            }
        case 'LOGOUT':
            return{}
        default:
            return state
    }
}

/**
 *
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */

const allReducers = combineReducers({
    user: userReducer,
})
//logout
export function logout(){
    return dispatch=>{
        axios.post('/logout').then(res=>{
            if(res.status===200){
                dispatch({
                    type:'LOGOUT'
                })
            }
        },error=>{
            console.log('logout fail:',error);
        }).catch(error=>{
            console.log('logout fail:',error);
        })
    }
}

export default function initializeStore(state) {
    const store = createStore(
        allReducers,
        Object.assign(
            {},
            {
                user: userInitialState,
            },
            state,
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk)),
    )
    return store
}