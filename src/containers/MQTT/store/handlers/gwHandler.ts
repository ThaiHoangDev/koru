import { map } from 'lodash';

import { MQTT_GATEWAY } from '../constants';

class GwHandler {
  private topicFormat: RegExp;

  constructor() {
    // this.topicFormat = /^.*gw\/.*/;
    this.topicFormat = /\$aws\/things\/ESN-\w{3,}\/shadow\/get\/accepted/;
  }

  messageHandler = (payload: any) => {
    const dataMessage = JSON.parse(payload.toString());
    console.log('🚀 ~ file: gwHandler.ts ~ line 16 ~ GwHandler ~ dataMessage', dataMessage);
    const beacons: any = {};
    const gateways: any = {};
    // const sensors:any = {}
    map(dataMessage, ({ mac, type, ...res }) => {
      console.log('🚀 ~ file: gwHandler.ts ~ line 23 ~ GwHandler ~ map ~ mac, type, ...res', mac, type, ...res);
      // switch (type) {
      //   default:
      //     if (res.rssi) {
      //       beacons[mac] = {
      //         mac,
      //         ...res,
      //       };
      //     }
      //     break;
      // }
    });

    const data = {
      gateways,
      beacons,
      // sensors
    };

    return {
      type: MQTT_GATEWAY,
      payload: data,
    };
  };
}

export default GwHandler;
