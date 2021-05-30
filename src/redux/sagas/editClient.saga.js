import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

function* editClient(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put( `/api/info/Profile/${action.payload.id}`, action.payload );
        yield put({type: 'FETCH_CLIENT'}); //need to update action. and add payload, maybe?
    } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating client info', error);
    }
}

function* updateClientSaga() {
    yield takeEvery('FETCH_CLIENT', editClient); //need to update action here
}

export default updateClientSaga;