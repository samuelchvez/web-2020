import * as types from '../types/petOwners';


export const startFetchingPetOwners = () => ({
  type: types.PET_OWNERS_FETCH_STARTED,
});
export const completeFetchingPetOwners = (entities, order) => ({
  type: types.PET_OWNERS_FETCH_COMPLETED,
  payload: {
    entities,
    order,
  },
});
export const failFetchingPetOwners = error => ({
  type: types.PET_OWNERS_FETCH_FAILED,
  payload: {
    error,
  },
});

export const startAddingPetOwner = petOwner => ({
  type: types.PET_OWNER_ADD_STARTED,
  payload: petOwner,
});
export const completeAddingPetOwner = (oldId, petOwner) => ({
  type: types.PET_OWNER_ADD_COMPLETED,
  payload: {
    oldId,
    petOwner,
  },
});
export const failAddingPetOwner = (oldId, error) => ({
  type: types.PET_OWNER_ADD_FAILED,
  payload: {
    oldId,
    error,
  },
});

export const startRemovingPetOwner = id => ({
  type: types.PET_OWNER_REMOVE_STARTED,
  payload: {
    id,
  },
});
export const completeRemovingPetOwner = () => ({
  type: types.PET_OWNER_REMOVE_COMPLETED,
});
export const failRemovingPetOwner = (id, error) => ({
  type: types.PET_OWNER_REMOVE_FAILED,
  payload: {
    id,
    error,
  },
});
