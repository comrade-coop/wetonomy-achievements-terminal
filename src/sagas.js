import { takeEvery, all, put } from 'redux-saga/effects'
import * as Api from './api'
import {saveState} from './localStorage'


function* watchPostAction() {
  yield takeEvery('SEND_ACTION', postAction)
}

function* watchPostQuery() {
  yield takeEvery('SEND_QUERY', sendQuery)
}

function* watchInitialize() {
  yield takeEvery('CONTRACTS_INITIALIZED', saveInitializeState)
}

function* watchStateChange() {
  yield takeEvery('CONTRACT_STATE', contractStateChange)
}

export function* postAction(action) {
  yield Api.sendAction(action)
  
}

export function* sendQuery(type) {
  yield Api.sendQuery(type)
}

function* saveInitializeState () {
  const state = window.store.getState().info.contracts
  yield saveState(state)
}

function* contractStateChange (action) {
  
  if(action.contract.state.Type.includes("Wetonomy.Achievements.Achievement, Achievements,"))
    yield put({type: "UPDATE_TIMELINE_POST", post: {address: action.contract.address,...action.contract.state.State}})
  

  if(action.contract.state.Type.includes("AchievementFactory"))
    action.contract.state.State.Achievements.forEach(element => Api.sendQuery({query: "strongforce/contract/state/"+element}));
  

  // const contract = window.store.getState().info.contracts.find( (item) => 
  //   item.address == address
  // )
  // if(contract) {
  //   if(data.result.Type.includes("Wetonomy.Achievements.Achievement, Achievements,"))
  //     yield put({type: "ADD_TIMELINE_POST", post: {address: address,...data.result.State}})
  // }
}


export default function* rootSaga() {
  yield all([
    watchPostAction(),
    watchPostQuery(),
    watchInitialize(),
    watchStateChange(),
    // watchInitialRequest(),
    // other generator functions
  ])
}