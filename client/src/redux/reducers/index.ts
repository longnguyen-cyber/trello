import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import boards from './boardReducer'
import card from './cardReducer'

export default combineReducers({
  auth,
  alert,
  boards,
  card
})
