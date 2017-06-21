import { combineReducers } from 'redux'
import count from './countReducer'

const reducers = combineReducers(
  {
    count: count
  }
)

export default reducers
