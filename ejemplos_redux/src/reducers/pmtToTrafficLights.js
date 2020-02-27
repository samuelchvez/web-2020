import omit from 'lodash/omit';

import * as types from '../types/pmtToTrafficLights';


const pmtToTrafficLights = (state = {}, action) => {
  switch (action.type) {
    case types.TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED: {
      return {
        ...state,
        [action.payload.pmt]: action.payload.trafficLight,
      };
    }
    case types.TRAFFIC_LIGHT_PMT_AGENT_UNASSIGNED: {
      return omit(state, action.payload.pmt);
    }
    default: {
      return state;
    }
  }
};


export default pmtToTrafficLights;


export const getAssignedTrafficLight = (state, agentId) => state[agentId];
