import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const LoginForm = ({
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated = false,
  authUsername = '',
}) => {
  if (isAuthenticated) {
    return (
      <h1>{`Bienvenido ${authUsername} nuevamente!`}</h1>
    );
  }

  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  return (
    <Fragment>
      {
        error && (
          <p>
            <strong>{ error }</strong>
          </p>
        )
      }
      <p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => changeUsername(e.target.value)}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => changePassword(e.target.value)}
        />
      </p>
      <p>
        {
          isLoading ? (
            <strong>{'Cargando...'}</strong>
          ) : (
            <button type="submit" onClick={
              () => onSubmit(username, password)
            }>
              {'Enviar'}
            </button>
          )
        }
      </p>
    </Fragment>
  );
} 


export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    error: selectors.getAuthenticatingError(state),
    isAuthenticated: selectors.isAuthenticated(state),
    authUsername: selectors.getAuthUsername(state),
  }),
  dispatch => ({
    onSubmit(username, password) {
      dispatch(actions.startLogin(username, password));
    },
  }),
)(LoginForm);
