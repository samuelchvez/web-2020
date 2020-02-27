import { combineReducers } from 'redux';

import * as types from '../types/pmt';


const order = (state = [], action) => {
  switch (action.type) {
    case types.PMT_AGENT_ADDED: {
      return [...state, action.payload.id];
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.PMT_AGENT_ADDED: {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    case types.PMT_AGENT_CHANGED: {
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

const pmt = combineReducers({
  byId,
  order,
});


export default pmt;


export const getAgent = (state, id) => state.byId[id];
export const getAgents = state => state.order.map(
  id => getAgent(state, id),
).filter(agent => agent != null);
