import { AppActions } from '@Containers/App/store/actions';

const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  const { type: actionType, payload: payloadAction } = action;
  if (actionType.includes('FAILED')) {
    console.log('ACTION_ERROR', { payloadAction, actionType });
  }
  next(action);
};

export default apiMiddleware;
