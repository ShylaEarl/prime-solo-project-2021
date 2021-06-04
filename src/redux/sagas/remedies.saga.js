import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: will be fired on "FETCH_REMEDIES" actions from appt details page
function* fetchRemedies(action) {
  try {
    const remedies = yield axios.get(`/api/apptDetails/${action.payload}`); 
    yield put({ type: 'SET_REMEDIES', payload: remedies.data }); 
  } catch (error) {
    console.log('Remedies get request failed', error);
  }
}

// function addRemedies(){
  // post for adding remedies to DB
// }

function* remediesSaga() {
  yield takeEvery('FETCH_REMEDIES', fetchRemedies);
  //yield takeEvery('ADD_REMEDIES', addRemedies);
}

export default remediesSaga;