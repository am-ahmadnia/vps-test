import React, { Fragment } from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from './../../private-route/PrivateRoute';

import Main from './Main';
import Tasks from './DailyReport';
import SignUp from './SignUp';
import ExpenseSubmission from './ExpenseSubmission';
import LoA from './LoA';
import DocumentUpload from './DocumentUpload';
import NotFound from './../../public-pages/NotFound';

function Forms() {
  let { path } = useRouteMatch();
  return (
    <Fragment>
      <Switch>
        <PrivateRoute exact path={`${path}/`} component={Main} />
        <PrivateRoute path={`${path}/daily-report`} component={Tasks} />
        <PrivateRoute path={`${path}/sign-up`} component={SignUp} />
        <PrivateRoute path={`${path}/leave-of-absence`} component={LoA} />
        <PrivateRoute
          path={`${path}/document-upload`}
          component={DocumentUpload}
        />
        <PrivateRoute
          path={`${path}/expense-submission`}
          component={ExpenseSubmission}
        />
        <PrivateRoute path={`*`} component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default Forms;
