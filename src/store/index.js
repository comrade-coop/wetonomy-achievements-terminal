import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from '../reducers'
import rootSaga from '../sagas'
import createSagaMiddleware from 'redux-saga'
import { loadState } from '../localStorage'
import {initialState} from '../reducers/initialinfo'

const sagaMiddleware = createSagaMiddleware()

const persistedState = loadState();
console.log(persistedState)

const middleware = applyMiddleware(thunk, logger, sagaMiddleware)

const store = createStore(
  reducers,
  {info: persistedState? {contracts: persistedState, initialized: false}  : {...initialState }},
  compose(
    middleware,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

sagaMiddleware.run(rootSaga)
window.store = store;

export default store