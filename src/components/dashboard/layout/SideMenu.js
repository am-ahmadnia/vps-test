import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from './../../../actions/authActions';
import PropTypes from 'prop-types';

function SideMenu({ username, logoutUser }) {
  return (
    <div className="left side-menu" style={{ paddingTop: '50px' }}>
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>
            <li className="has_sub">
              <a className="waves-effect">
                <i className="mdi mdi-invert-colors"></i>
                <span> فرم ها </span> <span className="menu-arrow"></span>
              </a>
              <ul className="list-unstyled">
                <li>
                  <Link to={`/${username}/forms/daily-report`}>
                    گزارش روزانه
                  </Link>
                </li>
                <li>
                  <Link to={`/${username}/forms/sign-up`}>فرم استخدام</Link>
                </li>
                <li>
                  <Link to={`/${username}/forms/expense-submission`}>
                    ثبت هزینه ها
                  </Link>
                </li>
                <li>
                  <Link to={`/${username}/forms/leave-of-absence`}>
                    درخواست مرخصی
                  </Link>
                </li>
                <li>
                  <Link to={`/${username}/forms/document-upload`}>
                    بارگذاری اسناد
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={`/${username}/team/directory`} class="waves-effect">
                <i class="mdi mdi-format-font"></i> <span> تیم</span>
              </Link>
            </li>
            <li>
              <a href="calendar.html" class="waves-effect">
                <i class="mdi mdi-calendar"></i>
                <span> گزارشات </span>
              </a>
            </li>
            <li>
              <a href="calendar.html" class="waves-effect">
                <i class="mdi mdi-calendar"></i>
                <span> پروژه ها </span>
              </a>
            </li>
            <li>
              <a href="calendar.html" class="waves-effect">
                <i class="mdi mdi-calendar"></i>
                <span> تیم </span>
              </a>
            </li>
            <li>
              <a href="calendar.html" class="waves-effect">
                <i class="mdi mdi-calendar"></i>
                <span> زمانبندی </span>
              </a>
            </li>
            <li>
              <a href="calendar.html" class="waves-effect">
                <i class="mdi mdi-calendar"></i>
                <span> حسابداری </span>
              </a>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="user-box">
          <div class="user-img">
            <img
              src="/assets/images/users/user.jpg"
              alt="user-img"
              title="محمد حسین ذوقی"
              class="rounded-circle img-thumbnail img-responsive"
            />
          </div>
          <h5>
            <a href="#">محمد حسین ذوقی</a>
          </h5>
          <h6>
            <a style={{ color: 'gray' }} href="#">
              طراح ارشد
            </a>
          </h6>
          <ul class="list-inline">
            <li class="list-inline-item">
              <button
                onClick={logoutUser}
                style={{
                  border: 'none',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
                class="text-custom"
              >
                <i class="mdi mdi-power"></i>
              </button>
            </li>
          </ul>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  );
}

SideMenu.propTypes = {
  username: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
});

export default connect(mapStateToProps, { logoutUser })(SideMenu);
