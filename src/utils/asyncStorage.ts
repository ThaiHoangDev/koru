import AsyncStorage from '@react-native-community/async-storage';

const singletonEnforcer = Symbol();
class AsyncStorageClass {
  static asyncStorageInstance: any;
  asyncStorageClient: any;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize AsyncStorage client');
    }

    this.asyncStorageClient = AsyncStorage;
  }

  static get instance() {
    if (!this.asyncStorageInstance) {
      this.asyncStorageInstance = new AsyncStorageClass(singletonEnforcer);
    }

    return this.asyncStorageInstance;
  }

  async setItem(name: string, data: any) {
    return await this.asyncStorageClient.setItem(name, JSON.stringify(data));
  }

  async getItem(name: string) {
    return await this.asyncStorageClient.getItem(name, (error: any, result: any) => {
      if (error) {
        return undefined;
      } else {
        return result;
      }
    });
  }

  async removeItem(name: string) {
    return await this.asyncStorageClient.removeItem(name);
  }
}

export default AsyncStorageClass.instance;
