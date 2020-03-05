import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '../../store';
import TrafficLights from '../TrafficLights';
import AddTrafficLight from '../AddTrafficLight';
import ChangeAllTrafficLights from '../ChangeAllTrafficLights';
import ExampleForm from '../ExampleForm';



const store = configureStore();

const App = () => (
  <Provider store={store}>
    <TrafficLights />
    <AddTrafficLight />
    <ChangeAllTrafficLights />
    <ExampleForm onSubmit={() => alert('Adios!')} />
  </Provider>
);


export default App;
