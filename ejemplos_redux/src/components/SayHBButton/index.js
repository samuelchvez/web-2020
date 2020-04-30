import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/happyBirthday';


const SayHBButton = ({ onClick, isHidden = false }) => (
  <Fragment>
    {
      !isHidden && (
        <button className='say-happy-birthday-button' onClick={onClick}>
          {'@'}
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
      dispatch(actions.sayHappyBirthday());
    },
  })
)(SayHBButton);
