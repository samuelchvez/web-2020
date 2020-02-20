import { createStore } from 'redux';

import reducer from './reducers';
import * as trafficLightActions from './actions/trafficLights';
import * as pmtActions from './actions/pmt';


const store = createStore(reducer);


store.subscribe(() => console.log(store.getState()));


store.dispatch(trafficLightActions.addTrafficLight());
store.dispatch(trafficLightActions.addTrafficLight());
store.dispatch(trafficLightActions.addTrafficLight());
store.dispatch(trafficLightActions.addTrafficLight());

store.dispatch(trafficLightActions.changeTrafficLight(2));

store.dispatch(trafficLightActions.changeAllTrafficLights());

store.dispatch(pmtActions.addPMTAgent(3, 'Samuel', 30))
