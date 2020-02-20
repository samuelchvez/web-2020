import * as types from '../types/trafficLights';


export const addTrafficLight = () => ({
  type: types.TRAFFIC_LIGHT_ADDED,
});

export const changeTrafficLight = index => ({
  type: types.TRAFFIC_LIGHT_CHANGED,
  payload: index,
});

export const changeAllTrafficLights = () => ({
  type: types.ALL_TRAFFIC_LIGHTS_CHANGED,
});
