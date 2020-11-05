import React, { useEffect, Fragment } from 'react';
import { Link, Switch, useParams, useRouteMatch } from 'react-router-dom';
import PrivateRoute from './../../private-route/PrivateRoute';
import Directory from './Directory';
import NotFound from './../../public-pages/NotFound';

function Forms() {
  let { path, url } = useRouteMatch();
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Switch>
        <PrivateRoute path={`${path}/directory`} component={Directory} />
        <PrivateRoute path={`*`} component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default Forms;
