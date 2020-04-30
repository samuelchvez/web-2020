import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';


function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSayHappyBirthday),
  ]);
}


export default mainSaga;
