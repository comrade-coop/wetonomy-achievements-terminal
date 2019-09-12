import { takeEvery, all } from 'redux-saga/effects'
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

// function* watchInitialRequest() {
//   yield takeEvery('INITIAL_REQUEST', initialRequest)
// }

// export function* initialRequest(action) {
//   yield Api.loadInitialState(action)
// }


export default function* rootSaga() {
  yield all([
    watchPostAction(),
    watchPostQuery(),
    watchInitialize(),
    // watchInitialRequest(),
    // other generator functions
  ])
}