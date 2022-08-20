export const AWSConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  accessKey: process.env.REACT_APP_AWS_ACCESS_KEY || '',
  secretKey: process.env.REACT_APP_AWS_SECRET_KEY || '',
  identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || '3826184d-9374-454a-a940-b6a92c84d224',
  poolID: process.env.REACT_APP_POOL_ID || 'us-east-1_vMZcdeYat',
  appId: process.env.REACT_APP_ID || '6c7g3kaj1b1pspdtj1ld813fgh',
};

export const MQTTConfig = {
  host: process.env.REACT_APP_MQTT_HOST || 'a12yknmmaiqn9u-ats.iot.us-east-1.amazonaws.com',
  port: process.env.REACT_APP_MQTT_PORT || '443',
  path: process.env.REACT_APP_MQTT_PATH || 'mqtt',
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || '3826184d-9374-454a-a940-b6a92c84d224',
  debug: true,
};

export const AWS = {
  poolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || '3826184d-9374-454a-a940-b6a92c84d224',
  iotHost: process.env.REACT_APP_MQTT_HOST || 'a12yknmmaiqn9u-ats.iot.us-east-1.amazonaws.com',
  region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  customerEnvironment: process.env.MIX_CUSTOMER_ENVIRONMENT || 'Dev',
};
