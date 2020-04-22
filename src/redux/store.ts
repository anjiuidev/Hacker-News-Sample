import { createStore, applyMiddleware } from 'redux';
import app from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(app, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;