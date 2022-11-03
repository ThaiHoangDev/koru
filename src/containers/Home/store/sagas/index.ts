import { AuthenticationDetails, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import { put, takeLatest, call } from 'redux-saga/effects';
import { AppActions } from '@Containers/App/store/actions';

import * as apiService from '../services';

import { HomeActions } from '../actions';

function* getMyPlantSaga({ payload }: any) {
  try {
    const { data } = yield call(apiService.getMyPlantAPI, payload);
    console.log(data,"fafafa___")
    yield put(HomeActions.getMyPlant.success(data));
  } catch (error) {
    yield put(HomeActions.getMyPlant.fail(error));
  }
}

export default function* fetchData() {
  yield takeLatest(HomeActions.Types.GET_MY_PLANT.begin, getMyPlantSaga);
}
