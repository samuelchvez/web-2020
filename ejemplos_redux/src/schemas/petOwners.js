import { schema } from 'normalizr';


export const petOwner = new schema.Entity(
  'petOwners',
);
export const petOwners = new schema.Array(petOwner);
