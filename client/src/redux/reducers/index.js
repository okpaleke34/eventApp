import { combineReducers } from 'redux'
import eventReducer from './eventReducer.js'

export default combineReducers({
    event:eventReducer,
})