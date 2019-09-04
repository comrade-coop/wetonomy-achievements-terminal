import { takeEvery, all } from 'redux-saga/effects'
import * as Api from './api'


function* watchPostAction() {
  yield takeEvery('FETCH_REQUEST', postAction)
}

function* watchInitialRequest() {
  yield takeEvery('INITIAL_REQUEST', initialRequest)
}

function* watchTypeRequest() {
  yield takeEvery('CONTRACT_TYPE_REQUEST', typeRequest)
}

export function* postAction(action) {
  yield Api.sendPostAction(action)
}

export function* initialRequest(action) {
  yield Api.loadInitialState(action)
}

export function* typeRequest(type) {
  yield Api.sendTypeRequest(type)
}

export default function* rootSaga() {
  yield all([
    watchPostAction(),
    watchInitialRequest(),
    watchTypeRequest
    // other generator functions
  ])
}