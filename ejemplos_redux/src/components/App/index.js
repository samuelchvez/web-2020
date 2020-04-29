import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { configureStore } from '../../store';
import TrafficLights from '../TrafficLights';
import AddTrafficLight from '../AddTrafficLight';
import ChangeAllTrafficLights from '../ChangeAllTrafficLights';
import LoginForm from '../LoginForm';



const { store, persistor } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <TrafficLights />
      <AddTrafficLight />
      <ChangeAllTrafficLights />
      <LoginForm />
    </PersistGate>
  </Provider>
);


export default App;
