import { combineReducers } from 'redux'
import timelineActivities from './timelineActivities'
import info from './contracstInfo'

export default combineReducers({
  timelineActivities,
  info
})