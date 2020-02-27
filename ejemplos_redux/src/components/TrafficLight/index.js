import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trafficLights';
import Light from '../Light';


export const COLORS = [
  'red',
  'yellow',
  'green',
];

const TrafficLight = ({ turnedOnLight, onClick }) => (
  <Fragment>
    <div className="traffic-light">
      {
        COLORS.map(
          color => (
            <Light
              key={color}
              color={color}
              isTurnedOn={color === turnedOnLight}
            />
          )
        )
      }
    </div>
    <button onClick={onClick}>
      {'Cambiar!'}
    </button>
  </Fragment>
);


export default connect(
  (state, { index }) => ({
    turnedOnLight: COLORS[selectors.getTrafficLight(state, index)],
  }),
  (dispatch, { index }) => ({
    onClick() {
      dispatch(actions.changeTrafficLight(index));
    },
  }),
)(TrafficLight);
