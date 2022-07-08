import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import boards from './boardsReducer'
import columns from './columnReducer'
import cards from './cardReducer'

export default combineReducers({
  auth,
  alert,
  boards,
  columns,
  cards
})
