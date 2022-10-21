import configureStore from './configureStore';
import rootReducer from './reducers';

const { store, persistor } = configureStore(rootReducer);

export { store, persistor };
