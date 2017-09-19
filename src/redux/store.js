import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux'
import { createLogger } from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist'

import createHistory from 'history/createBrowserHistory'
import reducers from './reducers';
import saga from './sagas';

export const history = createHistory()

function configureStore(initialState){
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger()
  const store = createStore(
    reducers,
    // initialState,
    applyMiddleware(
          sagaMiddleware,
          loggerMiddleware,
          routerMiddleware(history)
    ),
    autoRehydrate()
  );
  sagaMiddleware.run(saga)
  return store;
}

const store = configureStore()
persistStore(store, {whitelist: ['user']})
export default store
