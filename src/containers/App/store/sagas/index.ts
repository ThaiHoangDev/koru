import {takeLatest, put} from 'redux-saga/effects';

import {AppActions} from '../actions';

function* initializeSaga() {
  try {
    yield put(AppActions.initApp.success({isLoggedIn: false}));
  } catch (error) {
    console.log(error);
  }
}

export default function* watchSaga() {
  yield takeLatest(AppActions.Types.INIT_APP.begin, initializeSaga);
}
