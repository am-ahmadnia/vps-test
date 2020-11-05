import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Login from './components/public-pages/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard';

import './assets/scss/style.scss';
import './assets/scss/custom.scss';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // if (decoded.role === 'admin') {
  //   window.location.href = './admin';
  // }

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
