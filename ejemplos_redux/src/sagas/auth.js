import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';

import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/auth';
import * as types from '../types/auth';


function* login(action) {
  try {
    const response = yield call(
      fetch,
      `${API_BASE_URL}/token-auth/`,
      {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers:{
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status === 200) {
      const { token } = yield response.json();
      yield put(actions.completeLogin(token));
    } else {
      const { non_field_errors } = yield response.json();
      yield put(actions.failLogin(non_field_errors[0]));
    }
  } catch (error) {
    yield put(actions.failLogin('Falló horrible la conexión mano'));
  }
}

export function* watchLoginStarted() {
  yield takeEvery(
    types.AUTHENTICATION_STARTED,
    login,
  );
}

function* refreshToken(action) {
  const expiration = yield select(selectors.getAuthExpiration);
  const now =  parseInt(new Date().getTime() / 1000);

  if (expiration - now < 3600) {
    try {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/token-refresh/`,
        {
          method: 'POST',
          body: JSON.stringify({ token }),
          headers:{
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const jResponse = yield response.json();
        yield put(actions.completeTokenRefresh(jResponse.token));
      } else {
        // TODO: poner un redirect al home (login)
        const { non_field_errors } = yield response.json();
        yield put(actions.failTokenRefresh(non_field_errors[0]));
      }
    } catch (error) {
      // TODO: poner un redirect al home (login)
      yield put(actions.failTokenRefresh('Falló horrible la conexión mano'));
    }
  }
}

export function* watchRefreshTokenStarted() {
  yield takeEvery(
    types.TOKEN_REFRESH_STARTED,
    refreshToken,
  );
}
