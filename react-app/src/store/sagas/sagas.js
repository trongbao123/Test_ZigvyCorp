import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_POSTS, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS, SEARCH_POSTS } from '../actionTypes/actionTypes';
import { fetchPostsSuccess, searchPostsSuccess } from '../actions/actions';
import { post } from '../../service/postService.js';

function* fetchPostsSaga() {
    try {
        const response = yield call(post.getPosts);
        const data = yield response.json();
        yield put(fetchPostsSuccess(data));
    } catch (error) {
        yield put({ type: FETCH_POSTS_FAILURE, payload: error.message });
    }
}

function* searchPostsSaga(action) {
    try {
        const keyword = action.payload;
        const response = yield call(post.searchPost, keyword);
        if (response.ok) {
            const data = yield response.json();
            yield put(searchPostsSuccess(data));
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        yield put({ type: FETCH_POSTS_FAILURE, payload: error.message });
    }
}
export function* watchFetchSaga() {
    yield takeLatest(FETCH_POSTS, fetchPostsSaga);
    yield takeEvery(SEARCH_POSTS, searchPostsSaga);
}