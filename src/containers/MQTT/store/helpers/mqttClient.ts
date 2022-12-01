import IoTClient from '@Utils/mqtt/iotClient';
import { extend } from 'lodash';

const MQTTClient = () => {
  const connect = (option: any) =>
    new Promise(async resolve => {
      const iotClient = new IoTClient(true);
      const initialized = await iotClient.initClient(extend({ debug: false }, option));
      if (initialized) {
        resolve(iotClient);
      }
    });

  const updateClientCredentials = (awsCredentials: { AccessKeyId: any; SecretKey: any; SessionToken: any }) => {
    const { AccessKeyId, SecretKey, SessionToken } = awsCredentials;
    const iotClient = new IoTClient();
    iotClient.updateWebSocketCredentials(AccessKeyId, SecretKey, SessionToken);
  };

  const attachConnectHandler = (onConnectHandler: any) => {
    const iotClient = new IoTClient();
    iotClient.attachConnectHandler(onConnectHandler);
  };

  const attachErrorHandler = (onConnectHandler: any) => {
    const iotClient = new IoTClient();
    iotClient.attachErrorHandler(onConnectHandler);
  };

  const attachOfflineHandler = (onConnectHandler: any) => {
    const iotClient = new IoTClient();
    iotClient.attachOfflineHandler(onConnectHandler);
  };

  const attachMessageHandler = (handler: any) => {
    const iotClient = new IoTClient();
    iotClient.attachMessageHandler(handler);
  };

  const publish = (topic: string, message: any) =>
    new Promise<void>(resolve => {
      const iotClient = new IoTClient();
      iotClient.publish(topic, message);
      resolve();
    });

  const unsubscribe = (topic: string) => {
    const iotClient = new IoTClient();
    iotClient.client && iotClient.unsubscribe(topic);
  };

  const subscribe = (topic: string) => {
    const iotClient = new IoTClient();
    iotClient.client && iotClient.subscribe(topic);
  };

  const disconnect = () => {
    const iotClient = new IoTClient();
    iotClient.client && iotClient.disconnect();
  };

  return {
    updateClientCredentials,
    unsubscribe,
    attachConnectHandler,
    attachMessageHandler,
    attachErrorHandler,
    attachOfflineHandler,
    connect,
    disconnect,
    subscribe,
    publish,
  };
};

export default MQTTClient();
