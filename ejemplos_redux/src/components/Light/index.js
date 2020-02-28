import React from 'react';

import './styles.css';


const Light = ({
  color,
  isTurnedOn = false,
}) => (
  <div
    className="light"
    style={{
      backgroundColor: color,
      opacity: isTurnedOn ? 1.0 : 0.25,
      transform: `scale(${isTurnedOn ? 1.05 : 1.0})`
    }}
  >
  </div>
);


export default Light;
