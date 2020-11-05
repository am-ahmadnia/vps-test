import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setHeaderPath } from './../../../actions/uiActions';

function Main({ setHeaderPath, username }) {
  useEffect(() => {
    setHeaderPath([
      {
        name: 'فرم ها',
        path: '/forms',
      },
    ]);
  }, []);
  return (
    <div class="row">
      <div class="col-xl-12">
        <div class="card-box">
          <h4 class="header-title mt-0 m-b-30">فرم ها</h4>

          <div class="inbox-widget nicescroll" style={{ height: '315px' }}>
            <Link to={`/${username}/forms/sign-up`}>
              <div class="inbox-item">
                <p class="inbox-item-author">استخدام</p>
              </div>
            </Link>
            <Link to={`/${username}/forms/expense-submission`}>
              <div class="inbox-item">
                <p class="inbox-item-author">ثبت هزینه ها</p>
              </div>
            </Link>
            <Link to={`/${username}/forms/leave-of-absence`}>
              <div class="inbox-item">
                <p class="inbox-item-author">درخواست مرخصی</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  setHeaderPath: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
});

export default connect(mapStateToProps, { setHeaderPath })(Main);
