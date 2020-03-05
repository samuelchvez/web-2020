import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as actions from '../../actions/trafficLights';


const AddTrafficLight = ({ onClick }) => (
  <button className='add-traffic-light-button' onClick={onClick}>
    {'+'}
  </button>
);


export default connect(
  undefined,
  dispatch => ({
    onClick() {
      dispatch(actions.addTrafficLight());
    },
  })
)(AddTrafficLight);
