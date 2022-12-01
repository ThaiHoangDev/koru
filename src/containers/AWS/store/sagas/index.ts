import { takeLatest, put } from 'redux-saga/effects';
import { AWSActions } from '../actions';
import { get } from 'lodash';

import AwsClient from '../helper/iot';
import { AWSConfig } from '@Utils/constants';

function* awsConnect({ payload }: any) {
  try {
    const config = { region: AWSConfig.region, ...payload.config };
    yield AwsClient.connect(config);
    yield put(AWSActions.awsConnectRequest.success());
    if (process.env.REACT_APP_ENV === 'DEV') {
      console.log('connect aws succress');
    }
  } catch (e: any) {
    console.log('connect aws failed');
  }
}

function* awsReconnect({ payload }: any) {
  try {
    const config = payload.config;
    yield put(AWSActions.awsConnectRequest.request(config));
  } catch (e: any) {
    const messages = get(e, 'error') || 'Error connect AWS';
    yield put(AWSActions.awsConnectRequest.fail({ messages, ...e }));
  }
}

export default function* awsWatcher() {
  yield takeLatest(AWSActions.Types.AWS_CONNECT.begin, awsConnect);
  yield takeLatest(AWSActions.Types.AWS_RECONNECT_REQUEST.begin, awsReconnect);
}
