import React, { useEffect, Fragment } from 'react';
import { Link, Switch, useParams, useRouteMatch } from 'react-router-dom';
import PrivateRoute from './../../private-route/PrivateRoute';

function Directory() {
  let { path, url } = useRouteMatch();
  useEffect(() => {}, []);
  return (
    <Fragment>
      <div class="col-xl-12">
        <div class="card-box">
          <div class="dropdown pull-right">
            <a
              href="#"
              class="dropdown-toggle arrow-none card-drop"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="mdi mdi-dots-vertical"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <a href="javascript:void(0);" class="dropdown-item">
                Action
              </a>
              <a href="javascript:void(0);" class="dropdown-item">
                Another action
              </a>
              <a href="javascript:void(0);" class="dropdown-item">
                Something else
              </a>
              <a href="javascript:void(0);" class="dropdown-item">
                Separated link
              </a>
            </div>
          </div>

          <h4 class="header-title mt-0 m-b-30">اعضای تیم</h4>

          <div class="table-responsive team-table">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th></th>
                  <th>نام</th>
                  <th>رده شغلی</th>
                  <th>پروژه فعلی</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="table-propic">
                    <img
                      src="/assets/images/users/user.jpg"
                      alt="user-img"
                      title="محمد حسین ذوقی"
                      class="rounded-circle img-thumbnail img-responsive"
                    />
                  </td>
                  <td>محمد حسین ذوقی</td>
                  <td>طراح ارشد</td>
                  <td>پروژه الف</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-trans waves-effect w-md waves-danger disable-user-btn"
                    >
                      غیرفعال کردن
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="table-propic">
                    <img
                      src="/assets/images/users/user.jpg"
                      alt="user-img"
                      title="محمد حسین ذوقی"
                      class="rounded-circle img-thumbnail img-responsive"
                    />
                  </td>
                  <td>علی احمدی</td>
                  <td>طراح</td>
                  <td>پروژه الف</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-trans waves-effect w-md waves-danger disable-user-btn"
                    >
                      غیرفعال کردن
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
// <Switch>
//   <PrivateRoute exact path={`${path}/`} component={Main} />
//   <PrivateRoute path={`${path}/tasks`} component={Tasks} />
//   <PrivateRoute path={`${path}/sign-up`} component={SignUp} />
//   <PrivateRoute path={`${path}/leave-of-absence`} component={LoA} />
//   <PrivateRoute
//     path={`${path}/expense-submission`}
//     component={ExpenseSubmission}
//   />
//   <PrivateRoute path={`*`} component={NotFound} />
// </Switch>

export default Directory;
