import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/petOwners';
import PetOwnerRow from '../PetOwnerRow';


const PetOwnerList = ({ petOwners, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        petOwners.length === 0 && !isLoading && (
          <p>{'No hay Pet Owners registrados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        petOwners.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                petOwners.map(({ id }) => <PetOwnerRow key={id} id={id} />)
              }
            </tbody>
          </table>
        )
      }
    </Fragment>
  );
};

export default connect(
  state => ({
    petOwners: selectors.getPetOwners(state),
    isLoading: selectors.isFetchingPetOwners(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingPetOwners());
    },
  }),
)(PetOwnerList);
