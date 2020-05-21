import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { API_BASE_URL } from '../settings';
import * as selectors from '../reducers';
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';
import * as schemas from '../schemas/petOwners';


function* fetchPetOwners(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/owners/`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const jsonResult = yield response.json();
        const {
          entities: { petOwners },
          result,
        } = normalize(jsonResult, schemas.petOwners);

        yield put(
          actions.completeFetchingPetOwners(
            petOwners,
            result,
          ),
        );
      } else {
        // const { non_field_errors } = yield response.json();
        // yield put(actions.failLogin(non_field_errors[0]));
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchPetOwnersFetch() {
  yield takeEvery(
    types.PET_OWNERS_FETCH_STARTED,
    fetchPetOwners,
  );
}

function* addPetOwner(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/owners/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const jsonResult = yield response.json();
        yield put(
          actions.completeAddingPetOwner(
            action.payload.id,
            jsonResult,
          ),
        );
        // const {
        //   entities: { petOwners },
        //   result,
        // } = normalize(jsonResult, schemas.petOwners);

        // yield put(
        //   actions.completeFetchingPetOwners(
        //     petOwners,
        //     result,
        //   ),
        // );
      } else {
        // const { non_field_errors } = yield response.json();
        // yield put(actions.failLogin(non_field_errors[0]));
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchAddPetOwner() {
  yield takeEvery(
    types.PET_OWNER_ADD_STARTED,
    addPetOwner,
  );
}

function* removePetOwner(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/owners/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(actions.completeRemovingPetOwner());
        // const {
        //   entities: { petOwners },
        //   result,
        // } = normalize(jsonResult, schemas.petOwners);

        // yield put(
        //   actions.completeFetchingPetOwners(
        //     petOwners,
        //     result,
        //   ),
        // );
      } else {
        // const { non_field_errors } = yield response.json();
        // yield put(actions.failLogin(non_field_errors[0]));
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchRemovePetOwner() {
  yield takeEvery(
    types.PET_OWNER_REMOVE_STARTED,
    removePetOwner,
  );
}
