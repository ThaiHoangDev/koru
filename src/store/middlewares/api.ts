// import { AppActions } from '@Containers/App/store/actions';

// const apiMiddleware = (store: any) => (next: any) => (action: any) => {
//   const { type: actionType, payload: payloadAction } = action;
//   if (actionType.includes('FAILED')) {
//     console.log('ACTION_ERROR', { payloadAction, actionType });
//   }
//   next(action);
// };

// export default apiMiddleware;

import { AppActions } from '@Containers/App/store/actions';

let previousActions: any = [];

const authenticateMiddleware = (store: any) => (next: any) => (action: any) => {
  const { type: actionType, payload } = action;

  if (actionType.indexOf('_REQUEST') > 0) {
    previousActions.push(action);
  }

  if (actionType.indexOf('_SUCCESS') > 0 || actionType.indexOf('_FAIL') > 0) {
  }

  if (actionType.includes('_FAIL')) {
    console.log(payload.status, 'paooooUUII)))_______');
    const statusCode = payload.status;

    if (statusCode === 401 || statusCode === 403) {
      previousActions.push(action);
      store.dispatch(AppActions.refreshToken.request());
    }
  }

  if (actionType === AppActions.Types.REFRESH_TOKEN.succeeded && previousActions.length > 0) {
    previousActions.forEach((previousAction: any) => {
      const type = previousAction.type.replace('_FAIL', '_REQUEST');
      const action = previousActions.find((item: any) => item.type === type);
      console.log(action,"action____re")
      if (action) store.dispatch(action);
    });
    previousActions = [];
  }
  next(action);
};

export default authenticateMiddleware;
