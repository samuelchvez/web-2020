import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mainSaga from './sagas';


export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  sagaMiddleware.run(mainSaga);

  return createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
  );
}
