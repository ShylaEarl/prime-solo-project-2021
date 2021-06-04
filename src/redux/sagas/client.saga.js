import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; //takeLatest

// worker Saga: fired on "FETCH_CLIENT" actions dispatched from loading client table
function* fetchClientList() {
  try {
    const clients = yield axios.get('/api/info'); 
    console.log('get all clients:', clients.data);
    yield put({ type: 'SET_CLIENT', payload: clients.data });
  } catch (error) {
    console.log('Client get request failed', error);
  }
}

function* fetchClient(action) {
  try {
    const client = yield axios.get(`/api/info/${action.payload}`); 
    console.log('get one client:', client.data[0]);
    yield put({ type: 'SET_CLIENT_INFO', payload: client.data[0] });
    
  } catch (error) {
    console.log('Client get request failed', error);
  }
}

function* clientSaga() {
  yield takeEvery('FETCH_CLIENT_LIST', fetchClientList);
  yield takeEvery('FETCH_CLIENT', fetchClient)
  //yield takeEvery('add_client ', addClient);
}

export default clientSaga;

//CAN I DO THIS HERE? OR DO I NEED A NEW FILE? 
//create saga for client POST route here
//function* addClient(){
  // try{
  //   const newClient = yield axios.post();
  //   yield put({ type: 'ADD_CLIENT', payload: newClient.data });
  // } catch (error) {

  // }
//}