import { uniqueId } from 'lodash';

import {
  UPDATE_SETTING_MQTT_REQUEST,
  MQTT_CONNECT_REQUEST,
  MQTT_CONNECT_SUCCESS,
  MQTT_CONNECT_ERROR,
  MQTT_ADD_SUBSCRIPTIONS,
  MQTT_MESSAGES_TEST,
  MQTT_REMOVE_SUBSCRIPTIONS,
  MQTT_DISCONNECT,
} from '../constants';

export const initialState = {
  status: false,
  connecting: false,
  settings: {
    mqtt_host: '',
    mqtt_port: '',
    mqtt_client_id: '',
    mqtt_username: '',
    mqtt_password: '',
    mqtt_path: '',
    mqtt_is_ssl: 0,
  },
  testMQTT: {
    topics: {},
    messages: {},
  },
  loadCookie: false,
};

const mqttReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MQTT_DISCONNECT: {
      return {
        ...state,
        status: false,
        connecting: false,
        testMQTT: {
          topics: {},
          messages: {},
        },
        loadCookie: false,
      };
    }
    case MQTT_REMOVE_SUBSCRIPTIONS: {
      const { id } = action.payload;
      const {
        testMQTT: { topics },
      } = state;
      const _newTopics: any = { ...topics };
      delete _newTopics[id];

      return {
        ...state,
        testMQTT: {
          ...state.testMQTT,
          topics: { ..._newTopics },
        },
      };
    }
    case MQTT_MESSAGES_TEST: {
      return {
        ...state,
        testMQTT: {
          ...state.testMQTT,
          messages: {
            ...state.testMQTT.messages,
            [uniqueId('message')]: {
              ...action.payload,
              time: new Date(),
            },
          },
        },
      };
    }
    case MQTT_ADD_SUBSCRIPTIONS: {
      return {
        ...state,
        testMQTT: {
          ...state.testMQTT,
          topics: {
            ...state.testMQTT.topics,
            [uniqueId('topic_')]: action.payload,
          },
        },
      };
    }
    case MQTT_CONNECT_REQUEST: {
      return {
        ...state,
        testMQTT: {
          topics: {},
        },
        connecting: true,
      };
    }
    case MQTT_CONNECT_SUCCESS: {
      return {
        ...state,
        connecting: false,
        status: true,
      };
    }
    case MQTT_CONNECT_ERROR: {
      return {
        ...state,
        connecting: false,
        status: false,
      };
    }
    case UPDATE_SETTING_MQTT_REQUEST: {
      const {
        data: { settings },
      } = action.payload;

      return {
        ...state,
        settings: {
          ...state.settings,
          ...settings,
        },
      };
    }
    default:
      return { ...state };
  }
};

export default mqttReducer;
