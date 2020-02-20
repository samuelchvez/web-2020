import * as types from '../types/pmtToTrafficLights';


export const assignTrafficLightToAgent = (agent, trafficLight) => ({
  type: types.TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED,
  payload: {
    pmt: agent,
    trafficLight,
  }
}) ;

export const unassignTrafficLightFromAgent = agent => ({
  type: types.TRAFFIC_LIGHT_PMT_AGENT_UNASSIGNED,
  payload: { pmt: agent }
});
