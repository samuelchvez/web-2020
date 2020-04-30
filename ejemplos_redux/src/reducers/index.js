import { combineReducers } from 'redux';

import trafficLights, * as trafficLightsSelectors from './trafficLights';
import pmt, * as pmtSelectors from './pmt';
import pmtToTrafficLights, * as pmtToTrafficLightsSelectors from './pmtToTrafficLights';
import selectedTrafficLight, * as selectedTrafficLightSelectors from './selectedTrafficLight';
import auth, * as authSelectors from './auth';


const reducer = combineReducers({
  trafficLights,
  pmt,
  pmtToTrafficLights,
  selectedTrafficLight,
  auth,
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

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
