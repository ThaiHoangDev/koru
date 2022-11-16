import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { MQTTConfig } from '@Utils/constants';
import { AppActions } from '@Containers/App/store/actions';

import MQTTClient from '../helpers/mqttClient';
import { MQTTActions } from '../actions';

function subscribe() {
  const unsubscribe = () => {
    disconnect();
  };

  return eventChannel((emit: any) => {
    MQTTClient.attachMessageHandler((topic: string, message: any) => {
      console.log('topic xxxxxxx', topic, message.toString());
      const data = JSON.parse(message.toString());
      console.log(data, 'sub MOTT______DATA');

      try {
        if (/\$aws\/things\/ESN-\w{3,}\/shadow\/update\/accepted/.test(topic)) {
          console.log('1');
          const thing = topic.split('/')[2];
          // emit(upgradeThingAccepted(thing, JSON.parse(message.toString())));
        }
        if (/\$aws\/events\/jobExecution\/Continuous-Job-Firmware-\w{4,5}-\w{1,}\/succeeded/.test(topic)) {
          const data = JSON.parse(message.toString());
        }
        if (/\$aws\/events\/jobExecution\/Continuous-Job-Firmware-\w{4,5}-\w{1,}\/failed/.test(topic)) {
          const data = JSON.parse(message.toString());
        }
        if (/ESN-\w{3,}\/reboot/.test(topic)) {
          console.log('3');
        }
      } catch (e) {
        console.log('Error format message ', e);
      }
    });

    MQTTClient.attachConnectHandler(() => {
      emit(AppActions.connectedMQTT(true));
    });

    MQTTClient.attachErrorHandler(() => {
      emit(AppActions.connectedMQTT(false));
    });

    MQTTClient.attachOfflineHandler(() => {
      emit(AppActions.connectedMQTT(false));
    });

    return unsubscribe;
  });
}

function* disconnect() {
  while (true) {
    yield take(MQTTActions.Types.INIT_MQTT.begin);
    MQTTClient.disconnect();
  }
}

function* read(socket: any): any {
  const channel: any = yield call(subscribe);
  console.log('read MQTT____');
  yield takeEvery(channel, function* (value) {
    yield put(value);
  });
}

const connect = async () => {
  return await MQTTClient.connect(MQTTConfig);
};

function* initMQTTSaga(): any {
  try {
    const websocketInstance = yield connect();
    yield fork(handleMQTT, websocketInstance);
    console.log('INIT_MQTT_REQUESTED', websocketInstance);
    yield put(MQTTActions.init_MQTT.success());
  } catch (error) {
    console.log('INIT_MQTT_REQUESTED_ERROR', error);
    yield put(MQTTActions.init_MQTT.fail());
  }
}

export function* handleMQTT(socket: any) {
  yield fork(read, socket);
  yield fork(disconnect);
}

function* mqttPublishSaga(action: any) {
  const { topic, message } = action.payload;
  MQTTClient.publish(topic, message);
}

function* mqttSubscriptions(action: any) {
  const { topic } = action.payload;
  MQTTClient.subscribe(topic);
}

export default function* watchWebsocket() {
  yield takeLatest(MQTTActions.Types.INIT_MQTT.begin, initMQTTSaga);
  yield takeEvery(MQTTActions.Types.MQTT_PUBLISH.begin, mqttPublishSaga);
  yield takeLatest(MQTTActions.Types.MQTT_ADD_SUBSCRIPTIONS.begin, mqttSubscriptions);
}
