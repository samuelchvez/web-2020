import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/petOwners';


const PetOwnerRow = ({ name, onDelete, isConfirmed = false }) => (
  <tr className={!isConfirmed ? 'pet-owner-row--pending' : ''}>
    <td>{ name }</td>
    <td>
      {
        isConfirmed && (
          <button
            onClick={onDelete}
          >
            {'Borrar'}
          </button>
        )
      }
    </td>
  </tr>
);

export default connect(
  (state, { id }) => ({
    ...selectors.getPetOwner(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingPetOwner(id));
    }
  }),
)(PetOwnerRow);
