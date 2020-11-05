import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { fetchTasks } from '../../../actions/taskActions';
import { fetchProjects } from '../../../actions/projectActions';
import { addPersonalInfo } from '../../../actions/userActions';
import { setHeaderPath } from './../../../actions/uiActions';
import { submitLeaveRequest } from './../../../actions/formsActions';
import { getDaysInBetween, checkEndDate } from './../../../utils/tools';

import { selectStyles, datepickerStyles } from '../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

function LoA({ setHeaderPath, errorsR, submitLeaveRequest, history, user }) {
  const [data, setData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [errors, setErrors] = useState({});
  const [days, setDays] = useState(0);
  useEffect(() => {
    setHeaderPath([
      {
        name: 'فرم ها',
        path: '/forms',
      },
      {
        name: 'درخواست مخرصی',
        path: '/forms/leave-of-absence',
      },
    ]);
    if (checkEndDate(data.startDate, data.endDate)) {
      setDays(getDaysInBetween(data.startDate, data.endDate));
    } else setDays(null);
    setErrors({ ...errors, ...errorsR });
  }, [errorsR, data]);
  const dateOnChange = (e, id) => {
    unsetError(id);
    setData({ ...data, [id]: e._d });
  };
  const unsetError = (id) => {
    const err = errors;
    delete err[id];
    setErrors({ ...err });
  };
  const selectOnChange = (e) => {
    unsetError(e.id);
    setData({ ...data, [e.id]: e.value });
  };
  const textOnChange = (e) => {
    unsetError(e.target.id);
    setData({ ...data, [e.target.id]: e.target.value.trim() });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let _data = { type: data.type };
    if (data.type === 'hourly') {
      _data.startTime = data.startTime;
      _data.endTime = data.endTime;
    } else if (data.type === 'daily') {
      _data.startDate = data.startDate;
      _data.endDate = data.endDate;
    }

    console.log(data);
    if (data.type === 'daily') {
      if (days > 0)
        submitLeaveRequest(localStorage.jwtToken, history, user, _data);
    } else submitLeaveRequest(localStorage.jwtToken, history, user, _data);
  };
  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="card-box">
            <h2 class="m-t-0 header-title">درخواست مرخصی</h2>
            <br />
            <form noValidate onSubmit={onSubmit}>
              <div class="form-group row">
                <label for="inputEmail3" class="col-md-1 col-form-label">
                  نوع مرخصی
                </label>
                <div class="col-md-3">
                  <Select
                    options={[
                      { id: 'type', value: 'hourly', label: 'ساعتی' },
                      { id: 'type', value: 'daily', label: 'روزانه' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                </div>
              </div>
              {data.type === 'hourly' ? (
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="startTime" class="col-form-label">
                      ساعت شروع
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="startTime"
                      onChange={textOnChange}
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="endTime" class="col-form-label">
                      ساعت پایان
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="endTime"
                      onChange={textOnChange}
                    />
                  </div>
                </div>
              ) : data.type === 'daily' ? (
                <Fragment>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label class="col-form-label">تاریخ شروع</label>
                      <DatePicker
                        className="form-control"
                        calendarStyles={datepickerStyles}
                        onChange={(e) => dateOnChange(e, 'startDate')}
                      />
                      <span className="red-text">{errors.startDate}</span>
                    </div>
                    <div class="form-group col-md-6">
                      <label class="col-form-label">تاریخ پایان</label>
                      <DatePicker
                        className="form-control"
                        calendarStyles={datepickerStyles}
                        onChange={(e) => dateOnChange(e, 'endDate')}
                      />
                      <span className="red-text">{errors.gender}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label class="col-form-label">
                        تعداد روز :{' '}
                        {isNaN(days) ? (
                          ' - '
                        ) : days > 0 ? (
                          days
                        ) : days === null ? (
                          <span style={{ color: 'red' }}>
                            تاریخ شروع پس از تاریخ پایان میباشد
                          </span>
                        ) : null}
                      </label>
                    </div>
                  </div>
                </Fragment>
              ) : null}
              <button type="submit" class="btn btn-primary">
                ثبت اطلاعات
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

LoA.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  addPersonalInfo: PropTypes.func.isRequired,
  setHeaderPath: PropTypes.func.isRequired,
  submitLeaveRequest: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  errorsR: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  projects: state.project.projects,
  errorsR: state.errors,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchProjects,
  fetchTasks,
  addPersonalInfo,
  setHeaderPath,
  submitLeaveRequest,
})(LoA);
