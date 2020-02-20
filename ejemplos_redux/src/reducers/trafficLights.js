import * as types from '../types/trafficLights';


const trafficLights = (state = [], action) => {
  switch (action.type) {
    case types.TRAFFIC_LIGHT_ADDED: {
      return [...state, 0];
    }
    case types.TRAFFIC_LIGHT_CHANGED: {
      const newState = [...state];
      newState[action.payload] = (newState[action.payload] + 1) % 3;
      return newState;
    }
    case types.ALL_TRAFFIC_LIGHTS_CHANGED: {
      return state.map(i => (i + 1) % 3);
    }
    default: {
      return state;
    }
  }
};


export default trafficLights;