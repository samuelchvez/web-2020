import { createStore } from 'redux';

import reducer from './reducers';


export const configureStore = () => {
  return createStore(reducer);
}
