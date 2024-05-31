import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getLocalBirds() {
    try{
        const birdResponse = yield axios.get('/api/birds');
        yield put({
            type: 'SET_BIRDS',
            payload: birdResponse.data
        });
    } catch (error) {
        console.log("getLocalBirds error:", error);
    }
}

function* localBirdSaga() {
    yield takeEvery('GET_BIRDS', getLocalBirds);
}

export default localBirdSaga;