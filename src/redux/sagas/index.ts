import { all } from 'redux-saga/effects';
import NewsSagas from './newsSaga';

// combine all sagas
export default function* rootSaga() {
    yield all([
        ...NewsSagas
    ]);
}