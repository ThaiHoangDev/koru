export const AWSConfig = {
  region: process.env.REACT_APP_AWS_REGION || 'eu-central-1',
  accessKey: process.env.REACT_APP_AWS_ACCESS_KEY || '',
  secretKey: process.env.REACT_APP_AWS_SECRET_KEY || '',
  identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || 'eu-central-1:3d2b82aa-bebf-40de-972d-e5660105a090',
  poolID: process.env.REACT_APP_POOL_ID || 'eu-central-1_c2v9bclsp',
  appId: process.env.REACT_APP_ID || '4u226n7elm0n8cs9l6qufp7kjl',
};

export const MQTTConfig = {
  host: process.env.REACT_APP_MQTT_HOST || 'a12yknmmaiqn9u-ats.iot.us-east-1.amazonaws.com',
  port: process.env.REACT_APP_MQTT_PORT || '443',
  path: process.env.REACT_APP_MQTT_PATH || 'mqtt',
  region: process.env.REACT_APP_AWS_REGION || 'eu-central-1',
  identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || 'eu-central-1:3d2b82aa-bebf-40de-972d-e5660105a090',
  debug: true,
};

export const AWS = {
  poolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || 'eu-central-1:3d2b82aa-bebf-40de-972d-e5660105a090',
  iotHost: process.env.REACT_APP_MQTT_HOST || 'a12yknmmaiqn9u-ats.iot.us-east-1.amazonaws.com',
  region: process.env.REACT_APP_AWS_REGION || 'eu-central-1',
  customerEnvironment: process.env.MIX_CUSTOMER_ENVIRONMENT || 'Dev',
};
