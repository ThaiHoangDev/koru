import AWSIoTDeviceSdk from 'aws-iot-device-sdk';
import AWSSDK from 'aws-sdk';
import { Auth } from 'aws-amplify';

import { AWS } from '../../utils/constants';
import { Alert } from 'react-native';

let instance: any = null;
let AWS_SDK = {} as any;
Object.assign(AWS_SDK, AWSSDK);

export default class IoTClient {
  client: any;
  options: any = {
    connectTimeout: 3 * 1000,
    rejectUnauthorized: true,
    path: '/',
    onFailure: () => {
      console.log('IoT Client Failed');
    },
    region: 'ap-southeast-1',
  };
  constructor(createNewClient = false) {
    if (createNewClient && instance) {
      instance.disconnect();
      instance = null;
    }

    if (instance) {
      return instance;
    }

    instance = this;
  }

  initClient = (options = {} as any) =>
    new Promise((resolve, reject) => {
      console.log('initClient ------');
      this.options = options;
      const clientId = `school-bus-app-client-${Math.floor(Math.random() * 100000 + 1)}`;

      AWS_SDK.config.region = options.region;
      // AWS_SDK.config.credentials = new AWS_SDK.CognitoIdentityCredentials({
      //   IdentityPoolId: options.region + ':' + options.identityPoolId,
      // });

      // const identityId = AWS_SDK.config.credentials.identityId;

      // const cognitoIdentity = new AWS_SDK.CognitoIdentity();
      console.log('initClient 000');
      Auth.currentUserCredentials().then(user => {
        console.log('initClient 111', user);
        AWS_SDK.config.credentials = user;
        new AWS_SDK.Iot().attachPrincipalPolicy(
          { policyName: 'IOTFullAccess', principal: user.identityId },
          (err: any) => {
            console.log('initClient 222');

            if (err) {
              console.error('attachPrincipalPolicy', err); // an error occurred
            } else {
              this.client = new AWSIoTDeviceSdk.device({
                //
                // Set the AWS region we will operate in.
                //
                region: options.region || AWS.region,
                //
                // Set the AWS IoT Host Endpoint
                //
                host: options.host || AWS.iotHost,
                //
                // Use the clientId created earlier.
                //
                clientId: options.clientId || clientId,
                //
                // Connect via secure WebSocket
                //
                protocol: options.protocol || 'wss',
                //
                // Set the maximum reconnect time to 8 seconds; this is a browser application
                // so we don't want to leave the user waiting too long for reconnection after
                // re-connecting to the network/re-opening their laptop/etc...
                //
                maximumReconnectTimeMs: 8000,
                //
                // Enable console debugging information (optional)
                //
                // debug:
                //   typeof options.debug === 'undefined' ? true : options.debug,
                //
                // IMPORTANT: the AWS access key ID, secret key, and sesion token must be
                // initialized with empty strings.
                // //
                accessKeyId: user.accessKeyId || ' ',
                secretKey: user.secretAccessKey || ' ',
                sessionToken: user.sessionToken || ' ',
              });

              this.updateWebSocketCredentials(user.accessKeyId, user.secretAccessKey, user.sessionToken);
            }
            if (typeof options.debug !== 'undefined' && options.debug) {
              this.attachDebugHandlers();
            }
            console.log('CONNECTED', user);
            resolve(true);
          },
        );
      });
    });

  disconnect = () => {
    this.client?.end();
  };

  attachDebugHandlers = () => {
    this.client?.on('reconnect', () => {
      console.log('reconnect');
    });

    this.client?.on('offline', () => {
      console.log('offline');
    });
    this.client?.on('connect', () => {
      console.log('connect');
    });

    this.client?.on('message', (topic: string, message: string) => {
      console.log('new message');
    });
  };

  updateWebSocketCredentials = (accessKeyId: string, secretAccessKey: string, sessionToken: string) => {
    this.client.updateWebSocketCredentials(accessKeyId, secretAccessKey, sessionToken);
  };

  attachMessageHandler = (onNewMessageHandler: any) => {
    this.client?.on('message', onNewMessageHandler);
  };

  attachConnectHandler = (onConnectHandler: any) => {
    this.client?.on('connect', (connack: any) => {
      this.client?.subscribe('$aws/things/+/shadow/update/accepted');
      if (typeof this.options.debug !== 'undefined' && this.options.debug) {
        console.log('connected', connack);
      }
      onConnectHandler(connack);
    });
  };

  attachOfflineHandler = (onConnectHandler: any) => {
    this.client?.on('offline', (connack: any) => {
      onConnectHandler(connack);
    });
  };

  attachErrorHandler = (onConnectHandler: any) => {
    this.client?.on('error', (connack: any) => {
      onConnectHandler(connack);
    });
    this.client?.on('error', (connack: any) => {
      onConnectHandler(connack);
    });
  };

  attachCloseHandler = (onCloseHandler: any) => {
    this.client?.on('close', () => {
      if (typeof this.options.debug !== 'undefined' && this.options.debug) {
        console.log('close');
      }
      onCloseHandler();
    });
  };

  publish = (topic: any, message: any) => {
    if (typeof this.options.debug !== 'undefined' && this.options.debug) {
      console.log('publish', topic, JSON.stringify(message));
    }
    this.client?.publish(topic, JSON.stringify(message));
  };

  subscribe = (topic: any) => {
    this.client?.subscribe(topic);
  };

  unsubscribe = (topic: any) => {
    if (typeof this.options.debug !== 'undefined' && this.options.debug) {
      console.log('unsubscribed from topic', topic);
    }
    this.client?.unsubscribe(topic);
  };
}
