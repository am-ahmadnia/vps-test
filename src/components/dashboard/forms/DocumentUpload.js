import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { fetchTasks } from '../../../actions/taskActions';
import { fetchProjects } from '../../../actions/projectActions';
import { addPersonalInfo } from '../../../actions/userActions';
import { setHeaderPath } from '../../../actions/uiActions';

import { selectStyles, datepickerStyles } from '../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

function DocumentUpload({
  setHeaderPath,
  fetchProjects,
  fetchTasks,
  tasks,
  projects,
  errorsR,
}) {
  const { username } = useParams();
  const [educationRows, setEducationRows] = useState([]);
  const [resumeRows, setResumeRows] = useState([]);
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
    type: '',
    fieldOfStudy: '',
    instituteOfStudy: '',
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
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setHeaderPath([
      {
        name: 'فرم ها',
        path: '/forms',
      },
      {
        name: 'بارگذاری اسناد',
        path: '/forms/document-upload',
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
    console.log(rows);
  };
  const addResumeRow = () => {
    if (isEmpty(resumeRows)) setResumeRows([1]);
    else setResumeRows([...resumeRows, resumeRows[resumeRows.length - 1] + 1]);
  };
  const removeResumeRows = (item) => {
    const rows = resumeRows.filter((row) => row !== item);
    setResumeRows(rows);
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
  };

  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="card-box">
            <h2 class="m-t-0 header-title">بارگذاری اسناد</h2>
            <br />
            <form noValidate onSubmit={onSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="col-form-label">سند</label>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      multiple
                      lang="ar"
                      dir="rtl"
                    />
                    <label class="custom-file-label text-left" for="customFile">
                      انتخاب کنید
                    </label>
                  </div>
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-form-label">&nbsp;</label>
                  <p>فرمت های قابل پشتیبانی: pdf, docx, jpeg, png</p>
                  <span className="red-text">{errors.gender}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-2">
                  <label class="col-form-label">نام پروژه</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-2">
                  <label class="col-form-label">محرمانه</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-2">
                  <label class="col-form-label">چرخه حیات</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-2">
                  <label class="col-form-label">دسته اصلی</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-2">
                  <label class="col-form-label">دسته فرعی</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-2">
                  <label class="col-form-label">عنوان</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-3">
                  <label class="col-form-label">تعداد صفحه</label>
                  <input type="number" class="form-control" />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
                <div class="form-group col-md-9">
                  <label class="col-form-label">آدرس آرشیو فیزیکی</label>
                  <input type="text" class="form-control" />
                  <span className="red-text">{errors.birthDate}</span>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-submit">
                ثبت اطلاعات
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

DocumentUpload.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  addPersonalInfo: PropTypes.func.isRequired,
  setHeaderPath: PropTypes.func.isRequired,
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
  setHeaderPath,
})(DocumentUpload);
