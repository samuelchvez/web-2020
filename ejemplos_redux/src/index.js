/*

MI ESTADO:
  state = {
    trafficLights: [0, 0, 0],
    pmt: [
      {
        id: 1,
        name: 'Samuel',
        age: 30,
      },
    ]
  };

MIS TIPOS DE ACCIONES:
  'TRAFFIC_LIGHT_ADDED'
  'TRAFFIC_LIGHT_CHANGED'
  'ALL_TRAFFIC_LIGHTS_CHANGED'
  'PMT_AGENT_ADDED'
  'PMT_AGENT_CHANGED'

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

*/

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

const pmt = (state = [], action) => {
  switch (action.type) {
    case 'PMT_AGENT_ADDED': {
      return [...state, action.payload];
    }
    case 'PMT_AGENT_CHANGED': {
      return state.map(
        pmtAgent => {
          if (pmtAgent.id === action.payload.id) {
            return {
              ...pmtAgent,
              ...action.payload,
            };
          }

          return pmtAgent;
        }
      );
    }
    case 'REVERSED': {
      return state.slice().reverse();
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  trafficLights,
  pmt,
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


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
