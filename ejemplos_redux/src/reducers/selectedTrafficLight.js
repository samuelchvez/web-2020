import * as types from '../types/selectedTrafficLight';


const selectedTrafficLight = (state = null, action) => {
  switch (action.type) {
    case types.TRAFFIC_LIGHT_SELECTED: {
      return action.payload; // index
    }
    default: {
      return state;
    }
  }
};


export default selectedTrafficLight;


export const getSelectedTrafficLight = state => state;
