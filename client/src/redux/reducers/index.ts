import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import boards from './boardReducer'

export default combineReducers({
  auth,
  alert,
  boards
})
