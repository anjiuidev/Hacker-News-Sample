import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as api from '../../api';
import { news } from '../actionTypes';
import { loadNewsSuccess, loadNewsFailure } from '../actions/newsActions';

function* fetchNews(req) {
    try {
        const response = yield call(api.default.news().getAll, req.payload);
        yield put(loadNewsSuccess({ data: response.data }));
    } catch (e) {
        yield put(loadNewsFailure());
    }
}


function* NewsSaga() {
    yield takeEvery(news.LOAD_NEWS, fetchNews);
}

const NewsSagas = [
    fork(NewsSaga)
];

export default NewsSagas;