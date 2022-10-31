import { AWSConfig } from '@Utils/constants';
import * as Keychain from 'react-native-keychain';
import { CognitoUserPool, CognitoUserSession, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory: any = {};

class MyStorage {
  static syncPromise = null;

  static setItem(key: string, value: string): boolean {
    Keychain.setGenericPassword(MEMORY_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  static getItem(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : undefined;
  }

  static removeItem(key: string): boolean {
    Keychain.resetGenericPassword();
    return delete dataMemory[key];
  }

  static clear(): object {
    dataMemory = {};
    return dataMemory;
  }
}

export const amplifyConfig = {
  // Auth: {
  // identityPoolId: AWSConfig.region + ':' + AWSConfig.identityPoolId,
  // region: AWSConfig.region,
  // signUpVerificationMethod: 'code',
  // userPoolId: AWSConfig.poolID,
  // userPoolWebClientId: AWSConfig.appId,

  aws_project_region: AWSConfig.region,
  aws_cognito_identity_pool_id: AWSConfig.region + ':' + AWSConfig.identityPoolId,
  aws_cognito_region: AWSConfig.region,
  aws_user_pools_id: AWSConfig.poolID,
  aws_user_pools_web_client_id: AWSConfig.appId,
  oauth: {},
  // },
  Analytics: {
    appId: AWSConfig.appId,
  },
  storage: MyStorage,
};

const poolData = {
  UserPoolId: AWSConfig.poolID,
  ClientId: AWSConfig.appId,
};

const cognitoPool = new CognitoUserPool(poolData);

export { cognitoPool };
