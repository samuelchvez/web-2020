import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/happyBirthday';
import * as types from '../types/happyBirthday';


const API_BASE_URL = 'http://localhost:8000/api/v1';


function* sayHappyBirthday(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      ///////////////////////////////////////////////////////////////////////
      const userID = yield select(selectors.getAuthUserID);
      const expiration = yield select(selectors.getAuthExpiration);
      const now = parseInt(Date.now() / 1000);
      console.log("Expiration: ", expiration);
      console.log("Now:", now);
      console.log("Difference:", expiration - now);
      ///////////////////////////////////////////////////////////////////////
      yield call(
        fetch,
        `${API_BASE_URL}/pets/happy-bday/`,
        {
          method: 'POST',
          body: JSON.stringify({}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      // if (response.status === 200) {
      //   const { token } = yield response.json();
      //   yield put(actions.completeLogin(token));
      // } else {
      //   const { non_field_errors } = yield response.json();
      //   yield put(actions.failLogin(non_field_errors[0]));
      // }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
  }
}

export function* watchSayHappyBirthday() {
  yield takeEvery(
    types.HAPPY_BIRTHDAY_SAID,
    sayHappyBirthday,
  );
}
