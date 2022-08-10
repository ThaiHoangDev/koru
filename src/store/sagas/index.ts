import { all } from 'redux-saga/effects';

import appSaga from '@Containers/App/store/sagas';

export default function* rootSaga() {
  yield all([...appSaga()]);
}
