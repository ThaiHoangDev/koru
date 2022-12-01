import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const mqttState = (state: any) => state.mqtt || initialState;

const makeSelectMQTTstatus = () => createSelector(mqttState, state => state.status);

export { makeSelectMQTTstatus };
