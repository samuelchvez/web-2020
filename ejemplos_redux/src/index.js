/*

MI ESTADO:
  state = {
    trafficLights: [0, 0, 0],
    pmt: {
      byId: {
        1: {
          id: 1,
          name: 'Samuel',
          age: 30,
        }
      },
      order: [1]
    },
    pmtToTrafficLights: {
      5: 2,
      3: 4,
    },
  };

MIS TIPOS DE ACCIONES:
  'TRAFFIC_LIGHT_ADDED'
  'TRAFFIC_LIGHT_CHANGED'
  'ALL_TRAFFIC_LIGHTS_CHANGED'
  'PMT_AGENT_ADDED'
  'PMT_AGENT_CHANGED'
  'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED'

MIS ACCIONES:
  {
    type: 'TRAFFIC_LIGHT_ADDED'
  }
  {
    type: 'TRAFFIC_LIGHT_CHANGED',
    payload: 4
  }
  {
    type: 'ALL_TRAFFIC_LIGHTS_CHANGED'
  }
  {
    type: 'PMT_AGENT_ADDED',
    payload: {
      id: 5,
      name: 'Samuel',
      age: 30,
    },
  }
  {
    type: 'PMT_AGENT_CHANGED',
    payload: {
      id: 5,
      name: 'Florencio',
    },
  }
  {
    type: 'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED',
    payload: {
      pmt: 5,
      trafficLight: 2
    }
  }
  {
    type: 'TRAFFIC_LIGHT_PMT_AGENT_UNASSIGNED',
    payload: {
      pmt: 5,
    }
  }

*/

import omit from 'lodash/omit';
import {
  createStore,
  combineReducers
} from 'redux';


const trafficLights = (state = [], action) => {
  switch (action.type) {
    case 'TRAFFIC_LIGHT_ADDED': {
      return [...state, 0];
    }
    case 'TRAFFIC_LIGHT_CHANGED': {
      const newState = [...state];
      newState[action.payload] = (newState[action.payload] + 1) % 3;
      return newState;
    }
    case 'ALL_TRAFFIC_LIGHTS_CHANGED': {
      return state.map(i => (i + 1) % 3);
    }
    case 'REVERSED': {
      return state.slice().reverse();
    }
    default: {
      return state;
    }
  }
};


const order = (state = [], action) => {
  switch (action.type) {
    case 'PMT_AGENT_ADDED': {
      return [...state, action.payload.id];
    }
    case 'REVERSED': {
      return state.slice().reverse();
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'PMT_AGENT_ADDED': {
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    }
    case 'PMT_AGENT_CHANGED': {
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

const pmtToTrafficLights = (state = {}, action) => {
  switch (action.type) {
    case 'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED': {
      return {
        ...state,
        [action.payload.pmt]: action.payload.trafficLight,
      };
    }
    case 'TRAFFIC_LIGHT_PMT_AGENT_UNASSIGNED': {
      return omit(state, action.payload.pmt);
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  trafficLights,
  pmt,
  pmtToTrafficLights,
});

const store = createStore(reducer);


store.subscribe(() => console.log(store.getState()));


store.dispatch({ type: 'TRAFFIC_LIGHT_ADDED' });
store.dispatch({ type: 'TRAFFIC_LIGHT_ADDED' });
store.dispatch({ type: 'TRAFFIC_LIGHT_ADDED' });
store.dispatch({ type: 'TRAFFIC_LIGHT_ADDED' });

store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 0 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 0 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 0 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 0 });

store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 1 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 1 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 1 });

store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 2 });
store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 2 });

store.dispatch({ type: 'TRAFFIC_LIGHT_CHANGED', payload: 3 });

store.dispatch({ type: 'ALL_TRAFFIC_LIGHTS_CHANGED' });
store.dispatch({ type: 'ALL_TRAFFIC_LIGHTS_CHANGED' });
store.dispatch({ type: 'ALL_TRAFFIC_LIGHTS_CHANGED' });
store.dispatch({ type: 'ALL_TRAFFIC_LIGHTS_CHANGED' });

store.dispatch({
  type: 'PMT_AGENT_ADDED',
  payload: {
    id: 1,
    name: 'Samuel',
    age: 30,
  },
});

store.dispatch({
  type: 'PMT_AGENT_ADDED',
  payload: {
    id: 2,
    name: 'Pepe trueno',
    age: 3,
  },
});

store.dispatch({
  type: 'PMT_AGENT_ADDED',
  payload: {
    id: 3,
    name: 'Juanito Bazuca',
    age: 40,
  },
});

store.dispatch({
  type: 'PMT_AGENT_CHANGED',
  payload: {
    id: 2,
    name: 'Difunto Pepe Trueno',
  },
});

store.dispatch({ type: 'REVERSED' });

store.dispatch({
  type: 'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED',
  payload: {
    pmt: 5,
    trafficLight: 2,
  },
});

store.dispatch({
  type: 'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED',
  payload: {
    pmt: 6,
    trafficLight: 1,
  },
});

store.dispatch({
  type: 'TRAFFIC_LIGHT_PMT_AGENT_ASSIGNED',
  payload: {
    pmt: 5,
    trafficLight: 3,
  },
});

store.dispatch({
  type: 'TRAFFIC_LIGHT_PMT_AGENT_UNASSIGNED',
  payload: {
    pmt: 5,
  },
});

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
