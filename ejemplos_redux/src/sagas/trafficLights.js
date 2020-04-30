// import {
//   call,
//   takeEvery,
//   put,
//   // race,
//   // all,
//   delay,
//   select,
// } from 'redux-saga/effects';

// import * as selectors from '../reducers';
// import * as actions from '../actions/trafficLights';
// import * as types from '../types/trafficLights';


// const API_BASE_URL = 'http://localhost:8000/api/v1';


// function* sayHappyBirthday(action) {
//   const trafficLights = yield select(selectors.getTrafficLights);

//   const response = yield call(
//     fetch,
//     `${API_BASE_URL}/token-auth/`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         username: 'douglas',
//         password: 'doug',
//       }),
//       headers:{
//         'Content-Type': 'application/json',
//       },
//     },
//   );

//   const { token } = yield response.json();
//   const hbResponse = yield call(
//     fetch,
//     `${API_BASE_URL}/pets/happy-bday/`,
//     {
//       method: 'POST',
//       body: JSON.stringify({}),
//       headers:{
//         'Content-Type': 'application/json',
//         'Authorization': `JWT ${token}`,
//       },
//     }
//   );
// }

// export function* watchTrafficLightCreation() {
//   yield takeEvery(
//     types.TRAFFIC_LIGHT_ADDED,
//     sayHappyBirthday,
//   );
// }
