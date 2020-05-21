import { combineReducers } from 'redux'
import timeline from './timeline'
import info from './initialinfo'
import snackbar from './snackbar'

export default combineReducers({
  timeline,
  info,
  snackbar
})