import configureStore from './configureStore';
import rootReducer from './reducers';

export default () => {
  return configureStore(rootReducer);
};
