import { combineReducers } from 'redux';

import trafficLights from './trafficLights';
import pmt from './pmt';
import pmtToTrafficLights from './pmtToTrafficLights';


const reducer = combineReducers({
  trafficLights,
  pmt,
  pmtToTrafficLights,
});


export default reducer;
