import { fork, all } from 'redux-saga/effects';

import { watchTrafficLightCreation } from './trafficLights';


function* mainSaga() {
  yield all([
    fork(watchTrafficLightCreation),
  ]);
}


export default mainSaga;
