import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import moment from 'moment';

import { MQTTConfig } from '@Utils/constants';
import { AppActions } from '@Containers/App/store/actions';

import MQTTClient from '../helpers/mqttClient';
import { MQTTActions } from '../actions';
import { store } from '@Store/index';
import { HomeActions } from '@Containers/Home/store/actions';

function subscribe() {
  const unsubscribe = () => {
    disconnect();
  };

  return eventChannel((emit: any) => {
    MQTTClient.attachMessageHandler((topic: string, message: any) => {
      const data = JSON.parse(message.toString());
      // console.log(data, topic.split('/')[2], 'sub MOTT______DATA');
      console.log(moment(data.state.reported.ts).format('yyyy, dd, hh:mm'), 'get shadow success');
      store.dispatch(
        HomeActions.updateListPlant({
          uuid: topic.split('/')[2],
          data: moment().diff(moment(data.state.reported.ts), 'minutes') < 3 ? data.state.reported : null,
        }),
      );
      try {
        if (/\$aws\/things\/ESN-\w{3,}\/shadow\/update\/accepted/.test(topic)) {
          const thing = topic.split('/')[2];
          console.log('thing__________1', thing);
          // emit(upgradeThingAccepted(thing, JSON.parse(message.toString())));
        }
        if (/\$aws\/events\/jobExecution\/Continuous-Job-Firmware-\w{4,5}-\w{1,}\/succeeded/.test(topic)) {
          const data = JSON.parse(message.toString());
          console.log('data____', data);
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
  yield takeEvery(channel, function* (value) {
    yield put(value);
  });
}

const connect = async () => {
  return await MQTTClient.connect(MQTTConfig);
};

function* initMQTTSaga({ payload }: any): any {
  try {
    const websocketInstance = yield connect();
    yield fork(handleMQTT, websocketInstance);
    yield put(MQTTActions.init_MQTT.success());
  } catch (error) {
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

export default function* watchWebsocket() {
  yield takeLatest(MQTTActions.Types.INIT_MQTT.begin, initMQTTSaga);
  yield takeEvery(MQTTActions.Types.MQTT_PUBLISH.begin, mqttPublishSaga);
}
