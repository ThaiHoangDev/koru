import axios from 'axios';
import { isEmpty, assign } from 'lodash';

import { BASE_API_URL, TOKEN_NAME } from '@Constants/app';
import asyncStorage from '@Utils/asyncStorage';

const singletonEnforcer = Symbol();

class AxiosClient {
  axiosClient: any;
  static axiosClientInstance: any;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }

    this.axiosClient = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.setToken();

    this.axiosClient.interceptors.request.use(
      (configure: any) => {
        return configure;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );

    this.axiosClient.interceptors.response.use(
      (response: any) => {
        if (response.data.data && Array.isArray(response.data.data.data)) {
          response.data.data.dataObject = response.data.data.data.reduce((dataObject: any, item: any) => {
            dataObject[item.id] = item;
            return dataObject;
          }, {});
        }
        return response;
      },
      (error: any) => {
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          error.response.data.errorsObject = error.response.data.errors.reduce((errorObject: any, item: any) => {
            errorObject[item.field] = item;
            return errorObject;
          }, {});
        }

        return Promise.reject(error.response);
      },
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  async setHeader(userToken = null) {
    this.axiosClient.defaults.headers['x-myapp-authorization'] = `Bearer ${userToken}`;
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  }
  
  async clearToken() {
    this.axiosClient.defaults.headers.common.Authorization = '';
    this.axiosClient.defaults.headers['x-myapp-authorization'] = ``;
  }

  get(resource: string, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(requestURL, assign(config, this.axiosClient.defaults.headers));
  }

  post(resource: string, data: object, config = {}) {
    return this.axiosClient.post(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));
  }

  update(resource: string, data: object, config = {}) {
    return this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));
  }

  put(resource: string, data: object, config = {}) {
    return this.axiosClient.put(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));
  }

  patch(resource: string, data: object, config = {}) {
    return this.axiosClient.patch(`${resource}`, data, assign(config, this.axiosClient.defaults.headers));
  }

  delete(resource: string, data: object, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers),
    });
  }

  private async setToken() {
    const token = await asyncStorage.getItem(TOKEN_NAME);

    if (token) {
      await this.setHeader(token);
    }
  }
}

export default AxiosClient.instance;
