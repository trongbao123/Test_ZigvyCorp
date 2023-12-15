import { all } from 'redux-saga/effects';
import { watchFetchSaga } from '../sagas/sagas';


export default function* rootSaga() {
    yield all([
        watchFetchSaga(),
    ]);
}