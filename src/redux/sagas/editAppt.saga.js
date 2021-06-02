import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

//TODO - possibly move this whole file into appt.saga...

//***This file is for current POST  (& past date PUT) appts when you add appt notes (or prog notes for past date),
// and the summay and remedes... 

function* updateAppt(action) {
    console.log('in edit appt saga', action.payload);
    try{
        yield axios.put( `/api/info/Profile/${action.payload.id}`, action.payload ); //need to change this url
        yield put({type: 'FETCH_APPT'}); //double check this 
        //yield put({ type: 'SET_APPT_INFO', payload: action.payload}); //checkout react router assingment to figure out how to catch info for specific appt (video @ 50min) params!!
    } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating appt info', error);
    }
}

function* editApptSaga() {
    yield takeEvery('UPDATE_APPT_INFO', updateAppt); 
}

export default editApptSaga;