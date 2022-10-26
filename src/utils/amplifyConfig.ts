import { AWSConfig } from '@Utils/constants';
import { CognitoUserPool, CognitoUserSession, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

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

const cognitoPool = new CognitoUserPool(poolData);

export { cognitoPool };
