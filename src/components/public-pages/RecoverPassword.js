import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

function Login({ loginUser, errorsR, auth, history }) {
  const [data, setData] = useState({
    id: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
    setErrors({ ...errors, ...errorsR });
  }, [auth, errorsR]);
  const unsetError = (name) => {
    setErrors({ ...errors, [name]: '' });
  };
  const textOnChange = (e) => {
    unsetError(e.target.name);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    loginUser(data);
  };

  return (
    <Fragment>
      <div class="account-pages"></div>
      <div class="clearfix"></div>
      <div className="wrapper-page">
        <div class="text-center">
          <a href="index.html" class="logo">
            <span>
              <img
                src="assets/images/logo-buildtech-high.png"
                alt="logo"
                style={{ height: '100px' }}
              />
            </span>
          </a>
        </div>
        <div class="m-t-40 card-box">
          <div class="text-center">
            <h4 class="text-uppercase font-bold m-b-0">بازیابی رمز عبور</h4>
          </div>
          <div class="p-20">
            <form noValidate class="form-horizontal m-t-20" onSubmit={onSubmit}>
              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="نام کاربری، ایمیل، شماره همراه"
                    name="id"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.id}</span>
                </div>
              </div>

              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control"
                    type="password"
                    placeholder="رمز عبور"
                    name="password"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.password}</span>
                </div>
              </div>

              <div class="form-group text-center m-t-30">
                <div class="col-xs-12">
                  <button
                    class="btn btn-custom btn-bordred btn-block waves-effect waves-light"
                    type="submit"
                  >
                    ورود
                  </button>
                </div>
              </div>

              <div class="form-group m-t-30 m-b-0">
                <div class="col-sm-12">
                  <a href="page-recoverpw.html" class="text-muted">
                    <i class="fa fa-lock m-r-5"></i> رمز عبور را فراموش کردم
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// <div className="az-body">
// <div class="az-signin-wrapper">
//   <div class="az-card-signin">
//     <h1 class="az-logo">BUILDTECH</h1>
//     <div class="az-signin-header">
//       <h2 style={{ fontWeight: 900 }}>به بیلدتک خوش آمدید!</h2>
//       <h4>لطفا برای ادامه وارد سامانه شوید</h4>

//       <form noValidate onSubmit={onSubmit}>
//         <div class="form-group">
//           <label>نام کاربری، ایمیل، شماره همراه</label>
//           <input
//             class="form-control"
//             onChange={textOnChange}
//             name="id"
//             type="text"
//           />
//           <span className="red-text">{errors.id}</span>
//         </div>
//         <div class="form-group">
//           <label>رمز عبور</label>
//           <input
//             class="form-control"
//             onChange={textOnChange}
//             name="password"
//             type="password"
//           />
//           <span className="red-text">{errors.password}</span>
//         </div>
//         <button type="submit" class="btn btn-az-primary btn-block">
//           ورود
//         </button>
//       </form>
//     </div>
//     <div class="az-signin-footer">
//       <p>
//         <Link to="/recover-password" style={{ color: '#7987a1' }}>
//           رمز عبور خود را فراموش کرده اید؟
//         </Link>
//       </p>
//     </div>
//   </div>
// </div>
// </div>

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errorsR: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errorsR: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
