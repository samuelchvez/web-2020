import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';


const ExampleForm = ({ onSubmit }) => {
  const [value1, changeValue1] = useState('');
  const [value2, changeValue2] = useState('');
  return (
    <Fragment>
      <input
        type="text"
        placeholder="Hola"
        value={value1}
        onChange={e => changeValue1(e.target.value)}
      />
      <input
        type="password"
        placeholder="Cocacola"
        value={value2}
        onChange={e => changeValue2(e.target.value)}
      />
      <button type="submit" onClick={() => onSubmit(value1, value2)}>
        {'Enviar'}
      </button>
    </Fragment>
  );
} 


export default connect(
  undefined,
  dispatch => ({
    onSubmit(value1, value2) {
      console.log({ type: 'ESTO SE ACABA DE MANDAR MANO', payload: { username: value1, password: value2 } })
      // dispatch();
    },
  }),
)(ExampleForm);
