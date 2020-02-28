import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import TrafficLights from './components/TrafficLights';
import ChangeAllTrafficLights from './components/ChangeAllTrafficLights';


const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <TrafficLights />
    <ChangeAllTrafficLights />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
