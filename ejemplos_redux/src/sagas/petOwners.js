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
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';


const API_BASE_URL = 'http://localhost:8000/api/v1';


function* fetchPetOwners(action) {
  try {}
  catch(e) {}
}

export function* watchPetOwnersFetch() {
  yield takeEvery(
    types.PET_OWNERS_FETCH_STARTED,
    fetchPetOwners,
  );
}

function* addPetOwner(action) {}

export function* watchAddPetOwner() {
  yield takeEvery(
    types.PET_OWNER_ADD_STARTED,
    addPetOwner,
  );
}

function* removePetOwner(action) {}

export function* watchRemovePetOwner() {
  yield takeEvery(
    types.PET_OWNER_REMOVE_STARTED,
    removePetOwner,
  );
}
