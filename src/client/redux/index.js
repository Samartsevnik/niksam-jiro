import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";


const initialState = {}


const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(thunk))

const store = createStore(rootReducer(), initialState, composedEnhancers)

export default store





