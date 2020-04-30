import { combineReducers } from 'redux';

import trafficLights, * as trafficLightsSelectors from './trafficLights';
import pmt, * as pmtSelectors from './pmt';
import pmtToTrafficLights, * as pmtToTrafficLightsSelectors from './pmtToTrafficLights';
import selectedTrafficLight, * as selectedTrafficLightSelectors from './selectedTrafficLight';
import auth, * as authSelectors from './auth';
import petOwners, * as petOwnersSelectors from './petOwners';


const reducer = combineReducers({
  trafficLights,
  pmt,
  pmtToTrafficLights,
  selectedTrafficLight,
  auth,
  petOwners,
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

export const getPetOwner = (state, id) => petOwnersSelectors.getPetOwner(state, id);
export const getPetOwners = state => petOwnersSelectors.getPetOwners(state);
export const isFetchingPetOwners = state => petOwnersSelectors.isFetchingPetOwners(state);
export const getFetchingPetOwnersError = state => petOwnersSelectors.getFetchingPetOwnersError(state);
