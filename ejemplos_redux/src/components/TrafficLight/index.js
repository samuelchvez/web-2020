import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trafficLights';
import * as selectedActions from '../../actions/selectedTrafficLight';
import Light from '../Light';


export const COLORS = [
  'red',
  'yellow',
  'green',
];

const TrafficLight = ({
  turnedOnLight,
  isSelected = false,
  onChange,
  onClick,
}) => (
  <div
    className={
      `
        traffic-light-wrapper
        ${isSelected ? 'traffic-light--selected' : ''}
      `
    }
    onClick={onClick}
  >
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
    <button onClick={onChange}>
      {'Cambiar!'}
    </button>
  </div>
);


export default connect(
  (state, { index }) => ({
    turnedOnLight: COLORS[selectors.getTrafficLight(state, index)],
    isSelected: selectors.getSelectedTrafficLight(state) === index,
  }),
  (dispatch, { index }) => ({
    onChange() {
      dispatch(actions.changeTrafficLight(index));
    },
    onClick() {
      dispatch(selectedActions.selectTrafficLight(index));
    },
  }),
)(TrafficLight);
