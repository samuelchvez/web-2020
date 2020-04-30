import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const AddTrafficLight = ({ onClick, isHidden = false }) => (
  <Fragment>
    {
      !isHidden && (
        <button className='logout-button' onClick={onClick}>
          &times;
        </button>
      )
    }
  </Fragment>
);


export default connect(
  state => ({
    isHidden: !selectors.isAuthenticated(state),
  }),
  dispatch => ({
    onClick() {
      dispatch(actions.logout());
    },
  })
)(AddTrafficLight);
