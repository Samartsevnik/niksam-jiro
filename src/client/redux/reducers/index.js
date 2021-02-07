import { combineReducers } from 'redux'
import tasks from './tasks'

const createRootReducer = () =>
  combineReducers({
    tasks,
  })

export default createRootReducer