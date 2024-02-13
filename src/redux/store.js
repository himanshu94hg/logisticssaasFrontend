
import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer/rootReducer"; 
import rootSaga from "./saga/rootSaga";
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}