import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';

function configureStore(initialState){
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger()
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
          sagaMiddleware,
          loggerMiddleware
    )
  );
  sagaMiddleware.run(saga)
  return store;
}

const store = configureStore()
export default store
