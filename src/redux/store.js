import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'
import { rootReducer } from './reducer/rootReducer'
import { applyMiddleware, createStore } from "redux";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;