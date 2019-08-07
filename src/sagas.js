import { takeEvery, all } from 'redux-saga/effects'
import * as Api from './api'


function* watchPostAction() {
  yield takeEvery('FETCH_REQUEST', postAction)
}

export function* postAction(action) {
  yield Api.sendPostAction(action)
}

export default function* rootSaga() {
  yield all([
    watchPostAction(),
    // other generator functions
  ])
}