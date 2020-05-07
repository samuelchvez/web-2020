import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/petOwners';


const PetOwnerForm = ({
  onSubmit,
  isLoading,
}) => {
  const [name, changeName] = useState('');
  return (
    <div>
      <h2>{'Crear un nuevo pet owner:'}</h2>
      <p>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => changeName(e.target.value)}
          onKeyDown={
            e => {
              if (e.key === 'Enter') {
                onSubmit(name);
                changeName('');
              }
            }
          }
        />
      </p>
      <p>
        {
          isLoading ? (
            <strong>{'Cargando...'}</strong>
          ) : (
            <button type="submit" onClick={
              () => {
                onSubmit(name);
                changeName('');
              }
            }>
              {'Crear'}
            </button>
          )
        }
      </p>
    </div>
  );
} 


export default connect(
  state => ({
    isLoading: false,
  }),
  dispatch => ({
    onSubmit(name) {
      dispatch(
        actions.startAddingPetOwner({
          id: uuidv4(),
          name,
        }),
      );
    },
  }),
)(PetOwnerForm);
