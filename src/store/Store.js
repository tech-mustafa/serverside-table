import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Reducers';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();

// const composer = compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
