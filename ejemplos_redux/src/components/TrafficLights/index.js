import range from 'lodash/range';
import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/trafficLights';
import TrafficLight from '../TrafficLight';


const TrafficLights = ({ number }) => (
  <div className="traffic-lights">
    {
      number === 0 ? (
        <h1>
          {'No hay semáforos :('}
        </h1>
      ) : (
        range(number).map(
          index => (
            <TrafficLight
              key={index}
              index={index}
            />
          ),
        )
      )
    }
  </div>
);


export default connect(
  state => ({
    number: selectors.getTrafficLights(state).length,
  }),
)(TrafficLights);
