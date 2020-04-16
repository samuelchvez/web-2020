import {
  // call,
  takeEvery,
  // put,
  // race,
  // all,
  // delay,
  // take,
} from 'redux-saga/effects';

// import * as actions from '../actions/instances';
import * as types from '../types/trafficLights';


function* sayHappyBirthday(action) {
  console.log("LOL! SI LLEGA!!", action)
}

export function* watchTrafficLightCreation() {
  yield takeEvery(
    types.TRAFFIC_LIGHT_ADDED,
    sayHappyBirthday,
  );
}
