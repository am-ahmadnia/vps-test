import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { fetchTasks } from './../../../actions/taskActions';
import { fetchProjects } from './../../../actions/projectActions';
import { submitSignUp } from './../../../actions/formsActions';
import { setHeaderPath } from './../../../actions/uiActions';

import {
  selectStyles,
  datepickerStyles,
} from './../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

const selectOptions = {
  gender: [
    { id: 'gender', value: 'male', label: 'مرد' },
    { id: 'gender', value: 'female', label: 'زن' },
  ],
  maritalStatus: [
    { id: 'maritalStatus', value: 'single', label: 'مجرد' },
    { id: 'maritalStatus', value: 'married', label: 'متاهل' },
  ],
};

function SignUp({
  fetchUser,
  fetchProjects,
  fetchTasks,
  submitSignUp,
  setHeaderPath,
  tasks,
  projects,
  errorsR,
  history,
  user,
}) {
  const { username } = useParams();
  const [educationRows, setEducationRows] = useState([]);
  const [resumeRows, setResumeRows] = useState([]);
  const [selectOpts, setOpts] = useState({
    projects: [],
    tasks: [],
  });
  const [resumeData, setResumeData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    mobilePhone: '',
    phone: '',
    email: '',
    address: '',
    degree: '',
    fieldOfStudy: '',
    instituteOfStudy: '',
    startDateOfStudy: '',
    endDateOfStudy: '',
    totalAverageOfStudy: '',
    'emergency-name': '',
    'emergency-phone': '',
    'emergency-relation': '',
    resumeCompany: '',
    resumeRole: '',
    resumeDuration: '',
    resumeStartDate: '',
    resumeEndDate: '',
    resumeLastPaycheck: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setHeaderPath([
      {
        name: 'فرم ها',
        path: '/forms',
      },
      {
        name: 'استخدام',
        path: '/forms/sign-up',
      },
    ]);

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
  const addEducationRow = () => {
    if (isEmpty(educationRows)) setEducationRows([1]);
    else
      setEducationRows([
        ...educationRows,
        educationRows[educationRows.length - 1] + 1,
      ]);
  };
  const removeEducationRows = (item) => {
    const rows = educationRows.filter((row) => row !== item);
    setEducationRows(rows);
    const arr = educationData;
    arr.splice(item, 1);
    setEducationData(arr);
  };
  const addResumeRow = () => {
    if (isEmpty(resumeRows)) setResumeRows([1]);
    else setResumeRows([...resumeRows, resumeRows[resumeRows.length - 1] + 1]);
  };
  const removeResumeRows = (item) => {
    const rows = resumeRows.filter((row) => row !== item);
    setResumeRows(rows);
    const arr = resumeData;
    arr.splice(item, 1);
    setResumeData(arr);
  };
  const unsetError = (id) => {
    const err = errors;
    delete err[id];
    setErrors({ ...err });
  };
  const dateOnChange = (e, id) => {
    const splitted = id.split('-');
    unsetError(`${splitted[0]}-${splitted[1]}`);
    if (splitted[0] === 'education') {
      const arr = educationData;
      if (educationData[splitted[2]]) {
        arr[splitted[2]][splitted[1]] = e._d;
        setEducationData(arr);
      } else {
        arr.push({ [splitted[1]]: e._d });
        setEducationData(arr);
      }
    } else if (splitted[0] === 'resume') {
      const arr = resumeData;
      if (resumeData[splitted[2]]) {
        arr[splitted[2]][splitted[1]] = e._d;
        setResumeData(arr);
      } else {
        arr.push({ [splitted[1]]: e._d });
        setResumeData(arr);
      }
    } else {
      unsetError(id);
      setData({ ...data, [id]: e._d });
    }
  };
  const selectOnChange = (e) => {
    if (e.category) {
      unsetError(`${e.category}-${e.id}`);
      if (e.category === 'education') {
        if (educationData[e.index]) {
          const arr = educationData;
          arr[e.index][e.id] = e.value;
          setEducationData(arr);
        } else {
          const arr = educationData;
          arr.push({ [e.id]: e.value });
          setEducationData(arr);
        }
      }
    } else {
      unsetError(e.id);
      setData({ ...data, [e.id]: e.value });
    }
  };
  const textOnChange = (e) => {
    const splitted = e.target.id.split('-');
    unsetError(`${splitted[0]}-${splitted[1]}`);
    if (splitted[0] === 'education') {
      if (educationData[splitted[2]]) {
        const arr = educationData;
        arr[splitted[2]][splitted[1]] = e.target.value;
        setEducationData(arr);
      } else {
        const arr = educationData;
        arr.push({ [splitted[1]]: e.target.value });
        setEducationData(arr);
      }
    } else if (splitted[0] === 'resume') {
      if (resumeData[splitted[2]]) {
        const arr = resumeData;
        arr[splitted[2]][splitted[1]] = e.target.value;
        setResumeData(arr);
      } else {
        const arr = resumeData;
        arr.push({ [splitted[1]]: e.target.value });
        setResumeData(arr);
      }
    } else {
      unsetError(e.target.id);
      setData({ ...data, [e.target.id]: e.target.value.trim() });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    submitSignUp(localStorage.jwtToken, history, user, {
      mobilePhone: data.mobilePhone,
      phone: data.phone,
      birthDate: data.birthDate,
      email: data.email,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      address: data.address,
      educationalBackground: educationData,
      resume: resumeData,
      emergencySituation: {
        name: data['emergency-name'],
        phone: data['emergency-phone'],
        relation: data['emergency-relation'],
      },
    });
  };

  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="card-box">
            <h4 class="m-t-0 header-title">فرم استخدام</h4>
            <p class="text-muted m-b-30 font-13">
              لطفا برای ادامه استفاده از سامانه اطلاعات خود را وارد نمایید
            </p>
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
                    options={selectOptions.gender}
                    styles={selectStyles}
                    placeholder="انتخاب کنید"
                    onChange={selectOnChange}
                  />
                  <span className="red-text">{errors.gender}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="inputEmail4" class="col-form-label">
                    وضعیت تاهل
                  </label>
                  <Select
                    options={selectOptions.maritalStatus}
                    placeholder="انتخاب کنید"
                    styles={selectStyles}
                    onChange={selectOnChange}
                  />
                  <span className="red-text">{errors.maritalStatus}</span>
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
                <div class="form-group col-md-6">
                  <label for="email" class="col-form-label">
                    ایمیل
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.email}</span>
                </div>
                <div class="form-group col-md-6">
                  <label for="address" class="col-form-label">
                    آدرس
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.address}</span>
                </div>
              </div>
              <br />
              <h4 class="m-t-0 header-title">سوابق تحصیلی</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">مقطع</label>
                  <Select
                    placeholder="انتخاب کنید"
                    options={[
                      {
                        category: 'education',
                        id: 'degree',
                        index: '0',
                        value: 'bs',
                        label: 'کارشناسی',
                      },
                      {
                        category: 'education',
                        id: 'degree',
                        index: '0',
                        value: 'ms',
                        label: 'کارشناسی ارشد',
                      },
                      {
                        category: 'education',
                        id: 'degree',
                        index: '0',
                        value: 'phd',
                        label: 'دکتری',
                      },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                  />
                  <span className="red-text">{errors['education-degree']}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="education-field-0" class="col-form-label">
                    رشته
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="education-field-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors['education-field']}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="education-institute-0" class="col-form-label">
                    آموزشگاه
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="education-institute-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">
                    {errors['education-institute']}
                  </span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ شروع</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'education-startDate-0')}
                  />
                  <span className="red-text">
                    {errors['education-startDate']}
                  </span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ پایان</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'education-endDate-0')}
                  />
                  <span className="red-text">
                    {errors['education-endDate']}
                  </span>
                </div>
                <div class="form-group col-md-3">
                  <label for="education-totalAverage-0" class="col-form-label">
                    معدل کل
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="education-totalAverage-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">
                    {errors['education-totalAverage']}
                  </span>
                </div>
                <div class="form-group col-md-1">
                  <label class="col-form-label">&nbsp;</label>
                  <button
                    type="button"
                    class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                    onClick={addEducationRow}
                    style={{ zIndex: 0 }}
                  >
                    +
                  </button>
                </div>
              </div>
              {educationRows.map((row) => (
                <Fragment>
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label class="col-form-label">مقطع</label>
                      <Select
                        options={[
                          {
                            category: 'education',
                            id: 'degree',
                            index: row,
                            value: 'bs',
                            label: 'کارشناسی',
                          },
                          {
                            category: 'education',
                            id: 'degree',
                            index: row,
                            value: 'ms',
                            label: 'کارشناسی ارشد',
                          },
                          {
                            category: 'education',
                            id: 'degree',
                            index: row,
                            value: 'phd',
                            label: 'دکتری',
                          },
                        ]}
                        styles={selectStyles}
                        onChange={selectOnChange}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label
                        for={`education-field-${row}`}
                        class="col-form-label"
                      >
                        رشته
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id={`education-field-${row}`}
                        onChange={textOnChange}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label
                        for={`education-institute-${row}`}
                        class="col-form-label"
                      >
                        آموزشگاه
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id={`education-institute-${row}`}
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
                        onChange={(e) =>
                          dateOnChange(e, `education-startDate-${row}`)
                        }
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label class="col-form-label">تاریخ پایان</label>
                      <DatePicker
                        className="form-control"
                        calendarStyles={datepickerStyles}
                        onChange={(e) =>
                          dateOnChange(e, `education-endDate-${row}`)
                        }
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label
                        for={`education-totalAverage-${row}`}
                        class="col-form-label"
                      >
                        معدل کل
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id={`education-totalAverage-${row}`}
                        onChange={textOnChange}
                      />
                    </div>
                    <div class="form-group col-md-1">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-danger btn-bordred waves-effect waves-light"
                        onClick={() => removeEducationRows(row)}
                      >
                        -
                      </button>
                    </div>
                    <div class="form-group col-md-1">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                        onClick={addEducationRow}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))}
              <br />
              <h4 class="m-t-0 header-title">تجربیات شغلی</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="resume-organization-0" class="col-form-label">
                    نام سازمان یا شرکت
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resume-organization-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">
                    {errors['resume-organization']}
                  </span>
                </div>
                <div class="form-group col-md-6">
                  <label for="resume-role-0" class="col-form-label">
                    سمت / شغل
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resume-role-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors['resume-role']}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ شروع</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'resume-startDate-0')}
                  />
                  <span className="red-text">{errors['resume-startDate']}</span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">تاریخ پایان</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'resume-endDate-0')}
                  />
                  <span className="red-text">{errors['resume-endDate']}</span>
                </div>
                <div class="form-group col-md-3">
                  <label for="resume-duration-0" class="col-form-label">
                    مدت سابقه
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="resume-duration-0"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors['resume-duration']}</span>
                </div>
                <div class="form-group col-md-1">
                  <label class="col-form-label">&nbsp;</label>
                  <button
                    type="button"
                    class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                    onClick={addResumeRow}
                  >
                    +
                  </button>
                </div>
              </div>
              {resumeRows.map((row) => (
                <Fragment>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label
                        for={`resume-organization-${row}`}
                        class="col-form-label"
                      >
                        نام سازمان یا شرکت
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id={`resume-organization-${row}`}
                        onChange={textOnChange}
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for={`resume-role-${row}`} class="col-form-label">
                        سمت / شغل
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id={`resume-role-${row}`}
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
                        onChange={(e) =>
                          dateOnChange(e, `resume-startDate-${row}`)
                        }
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label class="col-form-label">تاریخ پایان</label>
                      <DatePicker
                        className="form-control"
                        calendarStyles={datepickerStyles}
                        onChange={(e) =>
                          dateOnChange(e, `resume-endDate-${row}`)
                        }
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label
                        for={`resume-duration-${row}`}
                        class="col-form-label"
                      >
                        مدت سابقه
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id={`resume-duration-${row}`}
                        onChange={textOnChange}
                      />
                    </div>
                    <div class="form-group col-md-1">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-danger btn-bordred waves-effect waves-light"
                        onClick={() => removeResumeRows(row)}
                      >
                        -
                      </button>
                    </div>
                    <div class="form-group col-md-1">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                        onClick={addResumeRow}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))}
              <br />
              <h4 class="m-t-0 header-title">شرایط اضطراری</h4>
              <hr />
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="emergency-name" class="col-form-label">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="emergency-name"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors['emergency-name']}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="emergency-phone" class="col-form-label">
                    شماره تماس
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="emergency-phone"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors['emergency-phone']}</span>
                </div>
                <div class="form-group col-md-4">
                  <label for="emergency-relation" class="col-form-label">
                    نسبت
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="emergency-relation"
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

SignUp.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  submitSignUp: PropTypes.func.isRequired,
  setHeaderPath: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  user: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  errorsR: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.task.tasks,
  projects: state.project.projects,
  errorsR: state.errors,
  user: state.auth.user,
  userData: state.user.user,
});

export default connect(mapStateToProps, {
  fetchProjects,
  fetchTasks,
  setHeaderPath,
  submitSignUp,
})(SignUp);
