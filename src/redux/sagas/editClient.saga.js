import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

function* updateClient(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put( `/api/info/Profile/${action.payload.id}`, action.payload );
        yield put({type: 'FETCH_CLIENT'}); 
        //yield put({ type: 'SET_CLIENT_INFO', payload: action.payload}); //checkout react router assingment to figure out how to catch info for specific client (video @ 50min)
    } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating client info', error);
    }
}

function* editClientSaga() {
    yield takeEvery('UPDATE_CLIENT_INFO', updateClient); 
}

export default editClientSaga;


