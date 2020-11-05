import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from './../../../actions/userActions';
import translateRole from './../../../utils/translateRole';

function Profile({ fetchUser, user, username }) {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetchUser(localStorage.jwtToken, username);
  }, []);
  const unsetError = (id) => {
    const err = errors;
    delete err[id];
    setErrors({ ...err });
  };
  const textOnChange = (e) => {
    unsetError(e.target.id);
    setData({ ...data, [e.target.id]: e.target.value.trim() });
  };
  return (
    <Fragment>
      {
        //name modal
      }
      <div
        id="nameModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">
                نام و نام خانوادگی
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <form class="form-horizontal" role="form">
                <div class="form-group row">
                  <label for="firstName" class="col-3 col-form-label">
                    نام
                  </label>
                  <div class="col-9">
                    <input
                      value={!data.firstName ? user.firstName : data.firstName}
                      onChange={textOnChange}
                      type="text"
                      class="form-control"
                      id="firstName"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="lastName" class="col-3 col-form-label">
                    نام خانوادگی
                  </label>
                  <div class="col-9">
                    <input type="text" class="form-control" id="lastName" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        //username modal
      }
      <div
        id="usernameModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">
                نام کاربری
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <form noValidate class="form-horizontal" role="form">
                <div class="form-group row">
                  <div class="col-12">
                    <input type="text" class="form-control" id="username" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        //email modal
      }
      <div
        id="emailModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">
                پست الکترونیک
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <form noValidate class="form-horizontal" role="form">
                <div class="form-group row">
                  <div class="col-12">
                    <input type="text" class="form-control" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      </div>
      {
        // phone modal
      }
      <div
        id="phoneNumberModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel">
                شماره تلفن همراه
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <form noValidate class="form-horizontal" role="form">
                <div class="form-group row">
                  <div class="col-12">
                    <input type="number" class="form-control" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary waves-effect waves-light"
              >
                ثبت اطلاعات
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
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
            <h4 class="m-t-0 header-title">Bordered table</h4>
            <p class="text-muted font-14 m-b-20">
              Add <code>.table-bordered</code> for borders on all sides of the
              table and cells.
            </p>

            <table class="table table-bordered profileTable">
              <tbody>
                <tr>
                  <td>
                    <button onClick={() => console.log('data', data)}>
                      Log Data
                    </button>
                    <a data-toggle="modal" data-target="#nameModal">
                      <p className="profileTitle">نام</p>
                      <p className="profileValue">{user.firstName}</p>
                    </a>
                  </td>
                  <td>
                    <p className="profileTitle">نام خانوادگی</p>
                    <p className="profileValue">{user.lastName}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a data-toggle="modal" data-target="#usernameModal">
                      <p className="profileTitle">نام کاربری</p>
                      <p className="profileValue">{user.username}</p>
                    </a>
                  </td>
                  <td>
                    <p className="profileTitle">سمت شغلی</p>
                    <p className="profileValue">{translateRole(user.role)}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a data-toggle="modal" data-target="#emailModal">
                      <p className="profileTitle">پست الکترونیک</p>
                      <p className="profileValue">{user.email}</p>
                    </a>
                  </td>
                  <td>
                    <a data-toggle="modal" data-target="#phoneNumberModal">
                      <p className="profileTitle">شماره تلفن همراه</p>
                      <p className="profileValue">{user.phoneNumber}</p>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" className="profileTable__edit-cell">
                    <Link to="/">ویرایش اطلاعات</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="bg-picture card-box">
            <div class="profile-info-name">
              <img
                src="assets/images/profile.jpg"
                class="img-thumbnail"
                alt="profile-image"
              />

              <div class="profile-info-detail">
                <h4 class="m-0">Alexandra Clarkson</h4>
                <p class="text-muted m-b-20">
                  <i>Web Designer</i>
                </p>
                <p>
                  Hi I'm Alexandra Clarkson,has been the industry's standard
                  dummy text ever since the 1500s, when an unknown printer took
                  a galley of type.Contrary to popular belief, Lorem Ipsum is
                  not simply random text. It has roots in a piece of classical
                  Latin literature from 45 BC,making it over 2000 years
                  old.Contrary to popular belief, Lorem Ipsum is not
                  simplyrandom text. It has roots in a piece of classical Latin
                  literature from 45 BC.
                </p>

                <div class="button-list m-t-20">
                  <button
                    type="button"
                    class="btn btn-facebook btn-sm waves-effect waves-light"
                  >
                    <i class="fa fa-facebook"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-sm btn-twitter waves-effect waves-light"
                  >
                    <i class="fa fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-sm btn-linkedin waves-effect waves-light"
                  >
                    <i class="fa fa-linkedin"></i>
                  </button>

                  <button
                    type="button"
                    class="btn btn-sm btn-dribbble waves-effect waves-light"
                  >
                    <i class="fa fa-dribbble"></i>
                  </button>
                </div>
              </div>

              <div class="clearfix"></div>
            </div>
          </div>

          <div class="bg-picture card-box">
            <div class="profile-info-name">
              <img
                src="assets/images/profile.jpg"
                class="img-thumbnail"
                alt="profile-image"
              />
              <div class="profile-info-detail">
                <table class="table table-bordered profileTable">
                  <tbody>
                    <tr>
                      <td>
                        <p className="profileTitle">نام</p>
                        <p className="profileValue">{user.firstName}</p>
                      </td>
                      <td>
                        <p className="profileTitle">نام خانوادگی</p>
                        <p className="profileValue">{user.lastName}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="profileTitle">نام کاربری</p>
                        <p className="profileValue">{user.username}</p>
                      </td>
                      <td>
                        <p className="profileTitle">سمت شغلی</p>
                        <p className="profileValue">
                          {translateRole(user.role)}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="profileTitle">پست الکترونیک</p>
                        <p className="profileValue">{user.email}</p>
                      </td>
                      <td>
                        <p className="profileTitle">شماره تلفن همراه</p>
                        <p className="profileValue">{user.phoneNumber}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" className="profileTable__edit-cell">
                        <Link to="/">ویرایش اطلاعات</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>

          <form method="post" class="card-box">
            <span class="input-icon icon-right">
              <textarea
                rows="2"
                class="form-control"
                placeholder="Post a new message"
              ></textarea>
            </span>
            <div class="p-t-10 pull-right">
              <a class="btn btn-sm btn-primary waves-effect waves-light">
                Send
              </a>
            </div>
            <ul class="nav nav-pills profile-pills m-t-10">
              <li>
                <a href="#">
                  <i class="fa fa-user"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-location-arrow"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class=" fa fa-camera"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-smile-o"></i>
                </a>
              </li>
            </ul>
          </form>
          <div class="card-box">
            <div class="comment">
              <img
                src="assets/images/users/avatar-1.jpg"
                alt=""
                class="comment-avatar"
              />
              <div class="comment-body">
                <div class="comment-text">
                  <div class="comment-header">
                    <a href="#" title="">
                      Adam Jansen
                    </a>
                    <span>about 2 minuts ago</span>
                  </div>
                  Story based around the idea of time lapse, animation to post
                  soon!
                  <div class="m-t-15">
                    <a href="">
                      <img
                        src="assets/images/small/img1.jpg"
                        class="thumb-md"
                      />
                    </a>
                    <a href="">
                      <img
                        src="assets/images/small/img2.jpg"
                        class="thumb-md"
                      />
                    </a>
                    <a href="">
                      <img
                        src="assets/images/small/img3.jpg"
                        class="thumb-md"
                      />
                    </a>
                  </div>
                </div>

                <div class="comment-footer">
                  <a href="#">
                    <i class="fa fa-thumbs-o-up"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-thumbs-o-down"></i>
                  </a>
                  <a href="#">Reply</a>
                </div>
              </div>

              <div class="comment">
                <img
                  src="assets/images/users/avatar-2.jpg"
                  alt=""
                  class="comment-avatar"
                />
                <div class="comment-body">
                  <div class="comment-text">
                    <div class="comment-header">
                      <a href="#" title="">
                        John Smith
                      </a>
                      <span>about 1 hour ago</span>
                    </div>
                    Wow impressive!
                  </div>
                  <div class="comment-footer">
                    <a href="#">
                      <i class="fa fa-thumbs-o-up"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-thumbs-o-down"></i>
                    </a>
                    <a href="#">Reply</a>
                  </div>
                </div>
              </div>

              <div class="comment">
                <img
                  src="assets/images/users/avatar-3.jpg"
                  alt=""
                  class="comment-avatar"
                />
                <div class="comment-body">
                  <div class="comment-text">
                    <div class="comment-header">
                      <a href="#" title="">
                        Matt Cheuvront
                      </a>
                      <span>about 2 hours ago</span>
                    </div>
                    Wow, that is really nice.
                  </div>
                  <div class="comment-footer">
                    <a href="#">
                      <i class="fa fa-thumbs-o-up"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-thumbs-o-down"></i>
                    </a>
                    <a href="#">Reply</a>
                  </div>
                </div>

                <div class="comment">
                  <img
                    src="assets/images/users/avatar-4.jpg"
                    alt=""
                    class="comment-avatar"
                  />
                  <div class="comment-body">
                    <div class="comment-text">
                      <div class="comment-header">
                        <a href="#" title="">
                          Stephanie Walter
                        </a>
                        <span>3 hours ago</span>
                      </div>
                      Nice work, makes me think of The Money Pit.
                    </div>
                    <div class="comment-footer">
                      <a href="#">
                        <i class="fa fa-thumbs-o-up"></i>
                      </a>
                      <a href="#">
                        <i class="fa fa-thumbs-o-down"></i>
                      </a>
                      <a href="#">Reply</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="comment">
              <img
                src="assets/images/users/avatar-1.jpg"
                alt=""
                class="comment-avatar"
              />
              <div class="comment-body">
                <div class="comment-text">
                  <div class="comment-header">
                    <a href="#" title="">
                      Kim Ryder
                    </a>
                    <span>about 4 hours ago</span>
                  </div>
                  i'm in the middle of a timelapse animation myself! (Very
                  different though.) Awesome stuff.
                </div>
                <div class="comment-footer">
                  <a href="#">
                    <i class="fa fa-thumbs-o-up"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-thumbs-o-down"></i>
                  </a>
                  <a href="#">Reply</a>
                </div>
              </div>
            </div>
            <div class="comment">
              <img
                src="assets/images/users/avatar-7.jpg"
                alt=""
                class="comment-avatar"
              />
              <div class="comment-body">
                <div class="comment-text">
                  <div class="comment-header">
                    <a href="#" title="">
                      Nicolai Larson
                    </a>
                    <span>10 hours ago</span>
                  </div>
                  the parallax is a little odd but O.o that house build is
                  awesome!!
                </div>
                <div class="comment-footer">
                  <a href="#">
                    <i class="fa fa-thumbs-o-up"></i>
                  </a>
                  <a href="#">
                    <i class="fa fa-thumbs-o-down"></i>
                  </a>
                  <a href="#">Reply</a>
                </div>
              </div>
            </div>

            <div class="m-t-30 text-center">
              <a
                href=""
                class="btn btn-default waves-effect waves-light btn-sm"
              >
                Load More...
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
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

            <h4 class="header-title m-t-0 m-b-30">My Team Members</h4>

            <ul class="list-group m-b-0 user-list">
              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <img src="assets/images/users/avatar-2.jpg" alt="" />
                  </div>
                  <div class="user-desc">
                    <span class="name">Michael Zenaty</span>
                    <span class="desc">CEO</span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <img src="assets/images/users/avatar-3.jpg" alt="" />
                  </div>
                  <div class="user-desc">
                    <span class="name">James Neon</span>
                    <span class="desc">Web Designer</span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <img src="assets/images/users/avatar-5.jpg" alt="" />
                  </div>
                  <div class="user-desc">
                    <span class="name">John Smith</span>
                    <span class="desc m-b-0">Web Developer</span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <img src="assets/images/users/avatar-6.jpg" alt="" />
                  </div>
                  <div class="user-desc">
                    <span class="name">Michael Zenaty</span>
                    <span class="desc">Programmer</span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <img src="assets/images/users/avatar-1.jpg" alt="" />
                  </div>
                  <div class="user-desc">
                    <span class="name">Mat Helme</span>
                    <span class="desc">Manager</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

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

            <h4 class="header-title m-t-0 m-b-30">
              <i class="mdi mdi-notification-clear-all m-r-5"></i> Upcoming
              Reminders
            </h4>

            <ul class="list-group m-b-0 user-list">
              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <i class="mdi mdi-circle text-primary"></i>
                  </div>
                  <div class="user-desc">
                    <span class="name">Meet Manager</span>
                    <span class="desc">
                      February 29, 2016 - 10:30am to 12:45pm
                    </span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <i class="mdi mdi-circle text-success"></i>
                  </div>
                  <div class="user-desc">
                    <span class="name">Project Discussion</span>
                    <span class="desc">
                      February 29, 2016 - 10:30am to 12:45pm
                    </span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <i class="mdi mdi-circle text-pink"></i>
                  </div>
                  <div class="user-desc">
                    <span class="name">Meet Manager</span>
                    <span class="desc">
                      February 29, 2016 - 10:30am to 12:45pm
                    </span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <i class="mdi mdi-circle text-muted"></i>
                  </div>
                  <div class="user-desc">
                    <span class="name">Project Discussion</span>
                    <span class="desc">
                      February 29, 2016 - 10:30am to 12:45pm
                    </span>
                  </div>
                </a>
              </li>

              <li class="list-group-item">
                <a href="#" class="user-list-item">
                  <div class="avatar">
                    <i class="mdi mdi-circle text-danger"></i>
                  </div>
                  <div class="user-desc">
                    <span class="name">Meet Manager</span>
                    <span class="desc">
                      February 29, 2016 - 10:30am to 12:45pm
                    </span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Profile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.username,
  user: state.user.user,
});

export default connect(mapStateToProps, { fetchUser })(Profile);
