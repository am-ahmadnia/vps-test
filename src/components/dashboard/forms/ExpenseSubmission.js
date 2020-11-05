import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { addExpense } from '../../../actions/formsActions';
import { fetchTasks } from '../../../actions/taskActions';
import { fetchProjects } from '../../../actions/projectActions';
import { setHeaderPath } from './../../../actions/uiActions';
import { selectStyles, datepickerStyles } from '../../../assets/scss/jsonStyle';
import { DatePicker } from 'react-persian-datepicker';

function Tasks({
  fetchProjects,
  fetchTasks,
  setHeaderPath,
  tasks,
  addExpense,
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
  const [data, setData] = useState({
    date: '',
    title: '',
    price: '',
    type: '',
    relatedProjects: '',
    paidBy: '',
    description: '',
    attachmentDocument: '',
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setHeaderPath([
      {
        name: 'فرم ها',
        path: '/forms',
      },
      {
        name: 'ثبت هزینه ها',
        path: '/forms/expense-addsion',
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
    e.target.id === 'attachmentDocument'
      ? setData({ ...data, [e.target.id]: e.target.files[0] })
      : setData({ ...data, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const dt = new FormData();
    dt.append('attachmentDocument', data.attachmentDocument);
    dt.append('title', data.title);
    dt.append('price', data.price);
    dt.append('date', data.date);
    dt.append('paidBy', data.paidBy);
    dt.append('category', data.category);
    dt.append('description', data.description);
    addExpense(localStorage.jwtToken, history, user, dt);
  };

  return (
    <Fragment>
      <div class="row">
        <div class="col-md-12">
          <div class="card-box">
            <h2 class="m-t-0 header-title">ثبت هزینه ها</h2>
            <br />
            <form noValidate onSubmit={onSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="attachmentDocument" class="col-form-label">
                    سند ضمیمه
                  </label>
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="attachmentDocument"
                      multiple
                      lang="ar"
                      dir="rtl"
                      onChange={textOnChange}
                    />
                    <label class="custom-file-label text-left" for="attachment">
                      انتخاب کنید
                    </label>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-form-label">تاریخ</label>
                  <DatePicker
                    className="form-control"
                    calendarStyles={datepickerStyles}
                    onChange={(e) => dateOnChange(e, 'date')}
                  />
                  <span className="red-text">{errors.date}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="title" class="col-form-label">
                    عنوان هزینه
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.title}</span>
                </div>
                <div class="form-group col-md-6">
                  <label for="price" class="col-form-label">
                    مبلغ (ریال)
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.price}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="paidBy" class="col-form-label">
                    توسط
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="paidBy"
                    onChange={textOnChange}
                  />
                  <span className="red-text">{errors.accomplishedBy}</span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">نوع</label>
                  <Select
                    options={[
                      { id: 'category', value: 'text', label: 'test' },
                      { id: 'category', value: 'text', label: 'test' },
                    ]}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.category}</span>
                </div>
                <div class="form-group col-md-4">
                  <label class="col-form-label">مربوط به پروژه</label>
                  <Select
                    options={selectOpts.projects}
                    styles={selectStyles}
                    onChange={selectOnChange}
                    placeholder="انتخاب کنید"
                  />
                  <span className="red-text">{errors.gender}</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="description" class="col-form-label">
                    توضیحات
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
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
  addExpense: PropTypes.func.isRequired,
  setHeaderPath: PropTypes.func.isRequired,
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
  addExpense,
  setHeaderPath,
})(Tasks);
