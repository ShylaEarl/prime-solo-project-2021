import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

// worker Saga: will be fired on "FETCH_CLIENT" actions dispatched from client table page
function* fetchClient() {
  try {
    const clients = yield axios.get('/api/info'); //double check route!
    console.log('get all clients:', clients.data);
    yield put({ type: 'SET_CLIENT', payload: clients.data });
  } catch (error) {
    console.log('Client get request failed', error);
  }
}

function* clientSaga() {
  yield takeEvery('FETCH_CLIENT', fetchClient);
}

export default clientSaga;