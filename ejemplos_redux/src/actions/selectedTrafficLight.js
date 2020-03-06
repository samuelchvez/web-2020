import * as types from '../types/selectedTrafficLight';


export const selectTrafficLight = index => ({
  type: types.TRAFFIC_LIGHT_SELECTED,
  payload: index,
});
