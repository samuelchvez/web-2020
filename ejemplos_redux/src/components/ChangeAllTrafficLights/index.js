import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as actions from '../../actions/trafficLights';


const ChangeAllTrafficLights = ({ onClick }) => (
  <button className='change-all-traffic-lights' onClick={onClick}>
    {'*'}
  </button>
);


export default connect(
  undefined,
  dispatch => ({
    onClick() {
      dispatch(actions.changeAllTrafficLights());
    },
  })
)(ChangeAllTrafficLights);
