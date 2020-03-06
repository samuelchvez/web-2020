import { combineReducers } from 'redux';

import trafficLights, * as trafficLightsSelectors from './trafficLights';
import pmt, * as pmtSelectors from './pmt';
import pmtToTrafficLights, * as pmtToTrafficLightsSelectors from './pmtToTrafficLights';
import selectedTrafficLight, * as selectedTrafficLightSelectors from './selectedTrafficLight';


const reducer = combineReducers({
  trafficLights,
  pmt,
  pmtToTrafficLights,
  selectedTrafficLight,
});


export default reducer;


export const getTrafficLight = (
  state,
  index,
) => trafficLightsSelectors.getTrafficLight(state.trafficLights, index);
export const getTrafficLights = state => trafficLightsSelectors.getTrafficLights(
  state.trafficLights,
);

export const getAgent = (state, id) => pmtSelectors.getAgent(state.pmt, id);
export const getAgents = state => pmtSelectors.getAgent(state.pmt);

export const getAssignedTrafficLight = (
  state,
  agentId,
) => pmtToTrafficLightsSelectors.getAssignedTrafficLight(
  state.pmtToTrafficLights,
  agentId,
);

export const getSelectedTrafficLight = (
  state =>
    selectedTrafficLightSelectors.getSelectedTrafficLight(
      state.selectedTrafficLight,
    )
);
