import { combineReducers } from 'redux'
import timelineActivities from './timelineActivities'
import info from './initialinfo'
import snackbar from './snackbar'

export default combineReducers({
  timelineActivities,
  info,
  snackbar
})