import { AWSConfig } from '@Utils/constants';
import { CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';

export const amplifyConfig = {
  Auth: {
    identityPoolId: AWSConfig.region + ':' + AWSConfig.identityPoolId,
    region: AWSConfig.region,
  },
  Analytics: {
    appId: AWSConfig.appId,
  },
};

const poolData = {
  UserPoolId: AWSConfig.poolID,
  ClientId: AWSConfig.appId,
};

export const cognitoPool = new CognitoUserPool(poolData);
