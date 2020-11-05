import React, { useEffect, Fragment } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  withRouter,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route/PrivateRoute';
import { connect } from 'react-redux';

import Content from './Content';
import NotificationsSideBar from './layout/NotificationsSidebar';
import SideMenu from './layout/SideMenu';
import Header from './layout/Header';
import NotFound from '../public-pages/NotFound';
import Admin from './Admin/Admin';
import Users from './user/User';

import Forms from './forms';
import Home from './home';
import Team from './team';
import Section2 from './section-2';
import Section3 from './section-3';
import Section4 from './section-4';
import Section5 from './section-5';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';

import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from '../utils/Alert';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
};

function Dashboard({ match, auth, history }) {
  return (
    <Provider template={AlertTemplate} {...options}>
      <Alerts />
      <div id="wrapper">
        <Header path={match.path} />
        <SideMenu />
        <div class="content-page">
          <div class="content">
            <div class="container-fluid">
              <Switch>
                <PrivateRoute path="/:username/forms" component={Forms} />
                <PrivateRoute path="/:username/team" component={Team} />
                <PrivateRoute path="/:username" component={Home} />
                <PrivateRoute path="/section-2" component={Section2} />
                <PrivateRoute path="/section-3" component={Section3} />
                <PrivateRoute path="/section-4" component={Section4} />
                <PrivateRoute path="/section-5" component={Section5} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/edit-profile" component={EditProfile} />
                <PrivateRoute path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
        <NotificationsSideBar />
      </div>
      <footer>
        <p>
          &#169; 2020 - تهیه شده توسط گروه بیلدتک
          <img src="/assets/images/logo-buildtech-high.png" alt="" />
        </p>
      </footer>
    </Provider>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Dashboard));
