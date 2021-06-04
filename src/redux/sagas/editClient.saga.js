import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

//TODO - possibly move this whole file into client.saga...

function* updateClient(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put( `/api/info/Profile/${action.payload.id}`, action.payload );
        yield put({type: 'FETCH_CLIENT', payload: action.payload.id }); //call new saga that is fetching single client (still need to make) with action.payload.id
    } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating client info', error);
    }
}

function* editClientSaga() {
    yield takeEvery('UPDATE_CLIENT_INFO', updateClient); 
}

export default editClientSaga;


