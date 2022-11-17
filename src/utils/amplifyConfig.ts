import { AWSConfig } from '@Utils/constants';
import * as Keychain from 'react-native-keychain';
import { CognitoUserPool, CognitoUserSession, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEMORY_KEY_PREFIX = '@MyStorage:';
let dataMemory: any = {};
export class MemoryStorageNew {
  static syncPromise: Promise<any> | null = null
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  static setItem(key: any, value: any) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value)
    dataMemory[key] = value
    return dataMemory[key]
  }

  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  static getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined
  }

  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  static removeItem(key: string) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key)
    return delete dataMemory[key]
  }

  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  static clear() {
    dataMemory = {}
    return dataMemory
  }

  /**
   * Will sync the MemoryStorage data from AsyncStorage to storageWindow MemoryStorage
   * @returns {void}
   */
  static sync() {
    if (!MemoryStorageNew.syncPromise) {
      MemoryStorageNew.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys)
          const memoryKeys = keys!.filter(key =>
            key.startsWith(MEMORY_KEY_PREFIX)
          )
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err)
            stores!.map((result, index, store) => {
              const key = store[index][0]
              const value = store[index][1]
              const memoryKey = key.replace(MEMORY_KEY_PREFIX, '')
              dataMemory[memoryKey] = value
            })
            res(true)
          })
        })
      })
    }
    return MemoryStorageNew.syncPromise
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
  storage: MemoryStorageNew,
};

const poolData = {
  UserPoolId: AWSConfig.poolID,
  ClientId: AWSConfig.appId,
};

const cognitoPool = new CognitoUserPool(poolData);

export { cognitoPool, poolData };
