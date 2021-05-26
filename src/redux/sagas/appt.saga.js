import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

// worker Saga: will be fired on "FETCH_APPT" actions from client table page
function* fetchAppt() {
  try {
    const appt = yield axios.get('/api/info'); //double check route!
    yield put({ type: 'SET_APPT', payload: appt.data });
  } catch (error) {
    console.log('Appt get request failed', error);
  }
}

function* apptSaga() {
  yield takeEvery('FETCH_APPT', fetchAppt);
}

export default apptSaga;