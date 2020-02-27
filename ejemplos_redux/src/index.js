import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';
import * as trafficLightsActions from './actions/trafficLights';
import TrafficLight from './components/TrafficLight';


const store = createStore(reducer);

store.dispatch(trafficLightsActions.addTrafficLight());

const App = () => (
  <Provider store={store}>
    <TrafficLight index={0} />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
