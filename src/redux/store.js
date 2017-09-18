import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger';

import createHistory from 'history/createBrowserHistory'
import reducer from './reducers';
import saga from './sagas';

export const history = createHistory()

function configureStore(initialState){
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
          sagaMiddleware,
          loggerMiddleware,
          routerMiddleware(history)
    )
  );
  sagaMiddleware.run(saga)
  return store;
}

const store = configureStore()
export default store
