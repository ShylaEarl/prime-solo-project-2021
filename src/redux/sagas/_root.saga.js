import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import clientSaga from './client.saga';
import apptSaga from './appt.saga';
import editClientSaga from './editClient.saga';
import editApptSaga from './editAppt.saga';
import remediesSaga from './remedies.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    clientSaga(), //should this be here? yeild takeEvery in client.saga
    apptSaga(), //should this be here? yeild takeEvery in appt.saga
    editClientSaga(), //should this be here? yeild takeEvery in clientInfo.saga
    editApptSaga(), //should this be here? yeild takeEvery in apptInfo.saga
    remediesSaga(), //should this be here? yeild takeEvery in remedies.saga
  ]);
}
