import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  // take,
} from 'redux-saga/effects';

import * as actions from '../actions/trafficLights';
import * as types from '../types/trafficLights';


function* sayHappyBirthday(action) {
  const response = yield call(
    fetch,
    'http://localhost:8000/api/v1/token-auth/',
    {
      method: 'POST',
      body: JSON.stringify({
        username: 'douglas',
        password: 'doug',
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    }
  );

  const result = yield response.json();
  console.log(result);
}

export function* watchTrafficLightCreation() {
  yield takeEvery(
    types.TRAFFIC_LIGHT_ADDED,
    sayHappyBirthday,
  );
}
