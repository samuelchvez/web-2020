import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
  ]);
}


export default mainSaga;
