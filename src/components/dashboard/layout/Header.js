import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ path, username }) {
  console.log('qqqqq', username);
  return (
    <div className="topbar">
      <div className="topbar-left">
        <a href="index.html" className="logo">
          <img
            src="/assets/images/why-logo.png"
            alt="logo"
            className="header-logo"
          />
        </a>
      </div>

      <div className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <ul className="nav navbar-nav list-inline navbar-left">
            <li className="list-inline-item">
              <button className="button-menu-mobile open-left">
                <i className="mdi mdi-menu"></i>
              </button>
            </li>
            <li className="list-inline-item">
              <h4 className="page-title header-path">
                <Link to={`/${username}`}>داشبورد</Link>
                {path.length !== 0 && <span>&nbsp;&nbsp;\&nbsp;&nbsp;</span>}

                {path.map((item) => (
                  <Fragment>
                    <Link to={`/${username}${item.path}`}>{item.name}</Link>
                    {path.indexOf(item) !== path.length - 1 ? (
                      <span>&nbsp;&nbsp;\&nbsp;&nbsp;</span>
                    ) : null}
                  </Fragment>
                ))}
              </h4>
            </li>
          </ul>
          <nav className="navbar-custom">
            <ul className="list-unstyled topbar-right-menu float-right mb-0">
              <li>
                <div className="notification-box">
                  <ul className="list-inline mb-0">
                    <li>
                      <a
                        href="javascript:void(0);"
                        className="right-bar-toggle"
                      >
                        <i className="mdi mdi-bell-outline noti-icon"></i>
                      </a>
                      <div className="noti-dot">
                        <span className="dot"></span>
                        <span className="pulse"></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  path: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  path: state.ui.headerPath,
  username: state.auth.user.username,
});

export default connect(mapStateToProps)(Header);
