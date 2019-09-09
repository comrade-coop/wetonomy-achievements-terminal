import { takeEvery, all } from 'redux-saga/effects'
import * as Api from './api'


function* watchPostAction() {
  yield takeEvery('SEND_ACTION', postAction)
}

function* watchPostQuery() {
  yield takeEvery('SEND_QUERY', sendQuery)
}

export function* postAction(action) {
  yield Api.sendAction(action)
}

export function* sendQuery(type) {
  yield Api.sendQuery(type)
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
    // watchInitialRequest(),
    // other generator functions
  ])
}