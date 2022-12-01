import AWS from 'aws-sdk';

let instance: any = null;

export default class AWS_SDK {
  options: any = {};
  client: any;

  constructor(createNewClient = false) {
    if (createNewClient && instance) {
      this.client && instance.disconnect();
      this.client = null;
      instance = null;
    }

    if (instance) {
      return instance;
    }

    instance = this;
  }
  initClient = (options: any) => {
    // const { accessKeyId, secretAccessKey, sessionToken } = options;
    AWS.config.credentials = options;
    this.client = new AWS.Iot();
    console.log('-aws client', this.client);
  };
}
