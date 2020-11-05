import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { fetchTasks } from './../../../actions/taskActions';
import { fetchProjects } from './../../../actions/projectActions';
import { addPersonalInfo } from './../../../actions/userActions';
import { toPersianDate } from './../../../utils/dateConvertor';

import {
  selectStyles,
  datepickerStyles,
} from './../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

function Tasks({
  fetchProjects,
  fetchTasks,
  addPersonalInfo,
  tasks,
  projects,
  errorsR,
}) {
  const { username } = useParams();
  const [timesRows, setTimesRows] = useState([]);
  const [selectOpts, setOpts] = useState({
    projects: [],
    tasks: [],
  });
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    mobilePhone: '',
    phone: '',
    address: '',
    degree: '',
    fieldOfStudy: '',
    instituteOfStudy: '',
    cityOfStudy: '',
    startDateOfStudy: '',
    endDateOfStudy: '',
    totalAverageOfStudy: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    resumeCompany: '',
    resumeRole: '',
    resumeDuration: '',
    resumeStartDate: '',
    resumeEndDate: '',
    resumeLastPaycheck: '',
  });
  const [newScheduledTask, setNewScheduledTask] = useState({
    project: '',
    task: '',
  });
  const [newTaskData, setNewTaskData] = useState({
    scheduled: {},
    unscheduled: {},
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isEmpty(tasks)) fetchTasks(localStorage.jwtToken, username);
    if (isEmpty(projects)) fetchProjects(localStorage.jwtToken);
    if (isEmpty(selectOpts.projects)) {
      let p = [];
      projects.forEach((project) => {
        p.push({
          value: project._id,
          label: project.title,
          id: 'project',
          category: 'newScheduledTask',
        });
      });
      setOpts({ ...selectOpts, projects: p });
    }
    setErrors({ ...errors, ...errorsR });
  }, [errorsR, projects]);
  const addTimesRow = () => {
    if (isEmpty(timesRows)) setTimesRows([1]);
    else setTimesRows([...timesRows, timesRows[timesRows.length - 1] + 1]);
  };
  const removeTimesRows = (item) => {
    const rows = timesRows.filter((row) => row !== item);
    setTimesRows(rows);
    console.log(rows);
  };
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
    console.log(errors);
    addPersonalInfo(localStorage.jwtToken, history, username, {
      mobilePhone: data.mobilePhone,
      phone: data.phone,
      birthDate: data.birthDate,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      address: data.address,
      educationalBackground: {
        degree: data.degree,
        field: data.fieldOfStudy,
        institute: data.instituteOfStudy,
        city: data.cityOfStudy,
        startDate: data.startDateOfStudy,
        endDate: data.endDateOfStudy,
        totalAverage: data.totalAverageOfStudy,
      },
      emergencySituation: {
        name: data.emergencyName,
        phone: data.emergencyPhone,
        relation: data.emergencyRelation,
      },
      resume: {
        organizationName: data.resumeCompany,
        role: data.resumeRole,
        duration: data.resumeDuration,
        startDate: data.resumeStartDate,
        endDate: data.resumeEndDate,
        lastPaycheck: data.resumeLastPaycheck,
      },
    });
    // addTaskProperties(localStorage.jwtToken, {
    //   todaysProgress: data.todaysProgress,
    //   startTime: data.startTime,
    //   endTime: data.endTime,
    //   taskId: data._id,
    // });
  };

  // const projectOpts = [{ value: 'x', label: projects[1].title }];
  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="card-box">
            <h4 class="m-t-0 header-title">اطلاعات کاربر</h4>
            {
              // <p class="text-muted m-b-30 font-13">
              //   You may also swap <code class="highlighter-rouge">.row</code> for{' '}
              //   <code class="highlighter-rouge">.form-row</code>, a variation of
              //   our standard grid row that overrides the default column gutters
              //   for tighter and more compact layouts.
              // </p>
            }
            <form noValidate onSubmit={onSubmit}>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="firstName" class="col-form-label">
                    نام
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    onChange={textOnChange}
                    readOnly
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="lastName" class="col-form-label">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    onChange={textOnChange}
                    readOnly
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="nationalCode" class="col-form-label">
                    شماره ملی
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="nationalCode"
                    onChange={textOnChange}
                    readOnly
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ تولد</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'birthDate')}
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">جنسیت</label>
                  <Select
                    options={[
                      { id: 'gender', value: 'male', label: 'مرد' },
                      { id: 'gender', value: 'female', label: 'زن' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                  />
                  <span className="red-text">{errors.gender}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="inputEmail4" class="col-form-label">
                    وضعیت تاهل
                  </label>
                  <Select
                    options={[
                      { id: 'maritalStatus', value: 'single', label: 'مجرد' },
                      { id: 'maritalStatus', value: 'married', label: 'متاهل' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="mobilePhone" class="col-form-label">
                    شماره همراه
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="mobilePhone"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.mobilePhone}</span>
                </div>
                <div class="form-group col-md-6">
                  <label for="phone" class="col-form-label">
                    شماره ثابت
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="phone"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.phone}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="address" class="col-form-label">
                    آدرس
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    onChange={textOnChange}
                  />
                </div>
              </div>
              <br />
              <h4 class="m-t-0 header-title">سوابق تحصیلی</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">مقطع</label>
                  <Select
                    options={[
                      { id: 'degree', value: 'bachelor', label: 'کارشناسی' },
                      { id: 'degree', value: 'msc', label: 'کارشناسی ارشد' },
                      { id: 'degree', value: 'phd', label: 'دکتری' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                  />
                  <span className="red-text">{errors.degreeOfStudy}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="fieldOfStudy" class="col-form-label">
                    رشته
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="fieldOfStudy"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.fieldOfStudy}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="cityOfStudy" class="col-form-label">
                    شهر
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="cityOfStudy"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.cityOfStudy}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ شروع</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'startDateOfStudy')}
                  />
                  <span className="red-text">{errors.startDateOfStudy}</span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ پایان</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'endDateOfStudy')}
                  />
                  <span className="red-text">{errors.endDateOfStudy}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="totalAverageOfStudy" class="col-form-label">
                    معدل کل
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="totalAverageOfStudy"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.startDateOfStudy}</span>
                </div>
              </div>

              <br />
              <h4 class="m-t-0 header-title">شرایط اضطراری</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="emergencyName" class="col-form-label">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="emergencyName"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.emergencyName}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="emergencyPhone" class="col-form-label">
                    شماره تماس
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="emergencyPhone"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.emergencyPhone}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="emergencyRelation" class="col-form-label">
                    نسبت
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="emergencyRelation"
                    onChange={textOnChange}
                  />
                </div>
              </div>
              <br />
              <h4 class="m-t-0 header-title">تجربیات شغلی</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="resumeOrganization" class="col-form-label">
                    نام سازمان یا شرکت
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resumeOrganization"
                    onChange={textOnChange}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="resumeRole" class="col-form-label">
                    سمت / شغل
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resumeRole"
                    onChange={textOnChange}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="resumeDuration" class="col-form-label">
                    مدت سابقه
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resumeDuration"
                    onChange={textOnChange}
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ شروع</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'resumeStartDate')}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ پایان</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'resumeEndDate')}
                  />
                </div>
                <div class="form-group col-md-4">
                  <label for="resumeLastPaycheck" class="col-form-label">
                    آخرین حقوق
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="resumeLastPaycheck"
                    onChange={textOnChange}
                  />
                </div>
              </div>

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

Tasks.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  addPersonalInfo: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  errorsR: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  projects: state.project.projects,
  errorsR: state.errors,
});

export default connect(mapStateToProps, {
  fetchProjects,
  fetchTasks,
  addPersonalInfo,
})(Tasks);
