import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route {...{path, exact}} render={
    (props) => (
      loggedIn ? 
        <Redirect to="/tweets" /> :
        <Component {...props}/> 
    )
  } />
);

const Protected = ({component: Component, path, loggedIn, exact}) => (
  <Route {...{path, exact}} render={props => (
    loggedIn ?
      <Component {...props} /> :
      <Redirect to="/login" />
  )}/>
);

const mapSTP = state => ({
  loggedIn: state.session.isAuthenticated
});

export const AuthRoute = withRouter(connect(mapSTP)(Auth));
export const ProtectedRoute = withRouter(connect(mapSTP)(Protected));
