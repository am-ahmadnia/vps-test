import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import isEmpty from 'is-empty';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { fetchScheduledTasks } from '../../../actions/taskActions';
import { fetchProjects } from '../../../actions/projectActions';
import {
  addScheduledTask,
  addUnscheduledTask,
  submitExpense,
  fetchDailyTasks,
  fetchNotTodayTasks,
  submitDailyUpdate,
} from '../../../actions/formsActions';
import { toPersianDate } from '../../../utils/dateConvertor';
import { selectStyles } from '../../../assets/scss/jsonStyle';

function DailyReport({
  fetchProjects,
  fetchScheduledTasks,
  fetchNotTodayTasks,
  addScheduledTask,
  submitDailyUpdate,
  fetchDailyTasks,
  dailyTasks,
  notTodayTasks,
  addUnscheduledTask,
  submitExpense,
  tasks,
  user,
  projects,
  errorsR,
  history,
}) {
  const { username } = useParams();
  const [modalOpen, setModalOpen] = useState({
    dailyUpdate: false,
    newScheduledTask: false,
    newUnscheduledTask: false,
  });
  const [notTodays, setNotTodays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timesRows, setTimesRows] = useState([]);
  const [selectOpts, setOpts] = useState({
    projects: [],
    tasks: [],
    scheduledProjects: [],
    unscheduledProjects: [],
    notTodayTasks: [],
  });
  const [scheduledTask, setScheduledTask] = useState({
    project: {},
    title: '',
    dueDate: '',
    totalProgress: '',
    todaysProgress: '',
    timePeriods: [],
    description: '',
  });
  const [data, setData] = useState({
    project: {},
    title: '0',
    dueDate: '',
    totalProgress: '',
    todaysProgress: '0',
    hoursSpent: [
      {
        startTime: '00:00',
        endTime: '00:00',
      },
    ],
  });
  const [newScheduledTask, setNewScheduledTask] = useState({
    project: '',
    task: '',
  });
  const [newUnscheduledTask, setNewUnscheduledTask] = useState({
    project: {},
    title: '',
    startTime: '',
    endTime: '',
    relatedToProject: false,
  });
  const [newTaskData, setNewTaskData] = useState({
    scheduled: {},
    unscheduled: {},
  });
  const [ntt, setNtt] = useState([]);
  const [errors, setErrors] = useState({
    dailyUpdate: {},
    newScheduledTask: {},
    newUnscheduledTask: {},
  });
  useEffect(() => {
    if (isEmpty(tasks)) fetchScheduledTasks(localStorage.jwtToken, username);
    if (isEmpty(dailyTasks)) fetchDailyTasks(localStorage.jwtToken, user.id);
    if (isEmpty(notTodayTasks))
      fetchNotTodayTasks(localStorage.jwtToken, user.id);
    if (isEmpty(projects)) fetchProjects(localStorage.jwtToken);
    if (isEmpty(selectOpts.scheduledProjects)) {
      let p = [];
      projects.forEach((project) => {
        p.push({
          value: project._id,
          label: project.title,
          id: 'project',
          category: 'newScheduledTask',
        });
      });
      setOpts({ ...selectOpts, scheduledProjects: p });
    }
    if (
      isEmpty(selectOpts.notTodayTasks) ||
      isEmpty(selectOpts.unscheduledProjects) ||
      isEmpty(selectOpts.scheduledProjects)
    ) {
      let s = [];
      let uns = [];
      let nt = [];
      projects.forEach((project) => {
        s.push({
          value: project._id,
          label: project.title,
          id: 'project',
          category: 'newScheduledTask',
        });
        uns.push({
          value: project._id,
          label: project.title,
          id: 'project',
          category: 'newUnscheduledTask',
        });
      });
      notTodayTasks.forEach((task) => {
        nt.push({
          value: task._id,
          label: task.title,
          project: task.project,
          dueDate: task.dueDate,
          totalProgress: task.totalProgress,
          id: 'task',
          category: 'newScheduledTask',
        });
      });

      setOpts({
        ...selectOpts,
        scheduledProjects: s,
        unscheduledProjects: uns,
        notTodayTasks: nt,
      });
    }
    errorsR.dailyUpdate
      ? setErrors({ ...errors, dailyUpdate: { ...errorsR.dailyUpdate } })
      : errorsR.newScheduledTask
      ? setErrors({ ...errors, newScheduledTask: { ...errorsR.newScheduled } })
      : errorsR.newUnscheduledTask
      ? setErrors({
          ...errors,
          newUnscheduledTask: { ...errorsR.newUnscheduledTask },
        })
      : null;
    if (isEmpty(newScheduledTask.task)) {
    }
  }, [errorsR, projects]);
  const addTimesRow = () => {
    if (isEmpty(timesRows)) setTimesRows([1]);
    else setTimesRows([...timesRows, timesRows[timesRows.length - 1] + 1]);
  };
  const removeTimesRow = (item) => {
    const rows = timesRows.filter((row) => row !== item);
    setTimesRows(rows);
    const arr = scheduledTask.timePeriods;
    arr.splice(item, 1);
    setScheduledTask({ ...scheduledTask, timePeriods: arr });
  };
  const unsetError = (id, category = '') => {
    const err = errors;
    if (category === 'dailyUpdate') {
      delete err.dailyUpdate[id];
    } else if (category === 'newUnscheduledTask') {
      delete err.newUnscheduledTask[id];
    } else {
      delete err[id];
    }
    setErrors({ ...err });
  };
  const selectOnChange = (e) => {
    unsetError(e.id);
    if (e.category === 'newUnscheduledTask')
      setNewUnscheduledTask({
        ...newUnscheduledTask,
        project: { id: e.value, title: e.label },
      });
    else if (e.category === 'newScheduledTask') console.log(e);
    if (e.id === 'project') {
      setNewScheduledTask({
        ...newScheduledTask,
        project: { id: e.value, title: e.label },
      });
    } else if (e.id === 'task') {
      setNewScheduledTask({
        ...newScheduledTask,
        task: {
          id: e.value,
          project: e.project,
          title: e.label,
          dueDate: e.dueDate,
          totalProgress: e.totalProgress,
        },
      });
    }
  };
  const textOnChange = (e, category = '') => {
    const splitted = e.target.id.split('-');
    if (category === 'newUnscheduledTask') {
      unsetError(e.target.name, 'newUnscheduledTask');
      setNewUnscheduledTask({
        ...newUnscheduledTask,
        [e.target.name]: e.target.value,
      });
    } else if (category === 'scheduledTask') {
      if (splitted[0] === 'startTime' || splitted[0] === 'endTime') {
        unsetError(splitted[0], 'dailyUpdate');
        if (scheduledTask.timePeriods[splitted[1]]) {
          const arr = scheduledTask.timePeriods;
          arr[splitted[1]][splitted[0]] = e.target.value;
          setScheduledTask({
            ...scheduledTask,
            timePeriods: arr,
          });
        } else {
          const arr = scheduledTask.timePeriods;
          arr.push({ [splitted[0]]: e.target.value });
          setScheduledTask({
            ...scheduledTask,
            timePeriods: arr,
          });
        }
      } else {
        unsetError(e.target.id, 'dailyUpdate');
        setScheduledTask({ ...scheduledTask, [e.target.id]: e.target.value });
      }
    } else if (e.target.name === 'relatedToProject') {
      setNewUnscheduledTask({
        ...newUnscheduledTask,
        relatedToProject: !newUnscheduledTask.relatedToProject,
      });
    } else {
      unsetError(e.target.name);
      setData({ ...data, [e.target.name]: e.target.value.trim() });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === 'newUnscheduledTask') {
      addUnscheduledTask(localStorage.jwtToken, history, user, {
        project: !newUnscheduledTask.relatedToProject
          ? {}
          : newUnscheduledTask.project,
        title: newUnscheduledTask.title,
        startTime: newUnscheduledTask.startTime,
        endTime: newUnscheduledTask.endTime,
      });
    } else if (e.target.id === 'scheduledTask') {
      submitDailyUpdate(
        localStorage.jwtToken,
        history,
        user,
        scheduledTask.project.id,
        scheduledTask.id,
        {
          description: scheduledTask.description,
          todaysProgress: scheduledTask.todaysProgress,
          timePeriods: scheduledTask.timePeriods,
        }
      );
    }
  };
  const addNttTask = () => {
    const task = {
      id: newScheduledTask.task.id,
      project: newScheduledTask.project,
      dueDate: newScheduledTask.task.dueDate,
      title: newScheduledTask.task.title,
      totalProgress: newScheduledTask.task.totalProgress,
    };
    setNtt([...ntt, task]);
  };

  return (
    <Fragment>
      {
        //task properties modal
      }
      <div
        id="taskPropertiesModal"
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
                مشخصات فعالیت
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
              <form id="scheduledTask" onSubmit={onSubmit}>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="projectTitle" class="col-form-label">
                      نام پروژه
                    </label>
                    <input
                      value={scheduledTask.project.title}
                      type="text"
                      class="form-control"
                      id="projectTitle"
                      readOnly
                    />
                    <span className="red-text"></span>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="title" class="col-form-label">
                      عنوان فعالیت
                    </label>
                    <input
                      value={scheduledTask.title}
                      onChange={textOnChange}
                      type="text"
                      class="form-control"
                      id="title"
                      readOnly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="dueDate" class="col-form-label">
                      تاریخ تحویل
                    </label>
                    <input
                      value={toPersianDate(scheduledTask.dueDate)}
                      type="text"
                      class="form-control"
                      id="dueDate"
                      readOnly
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="totalProgress" class="col-form-label">
                      درصد پیشرفت تا امروز
                    </label>
                    <input
                      value={scheduledTask.totalProgress.toString()}
                      type="number"
                      class="form-control"
                      id="totalProgress"
                      readOnly
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="todaysProgress" class="col-form-label">
                      درصد پیشرفت امروز
                    </label>
                    <input
                      value={scheduledTask.todaysProgress}
                      type="number"
                      min="1"
                      max="100"
                      class="form-control"
                      id="todaysProgress"
                      onChange={(e) => textOnChange(e, 'scheduledTask')}
                    />
                    <span className="red-text">
                      {errors.dailyUpdate.todaysProgress}
                    </span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label class="col-form-label">توضیحات</label>
                    <input
                      value={scheduledTask.description}
                      type="text"
                      class="form-control"
                      id="description"
                      onChange={(e) => textOnChange(e, 'scheduledTask')}
                    />
                    <span className="red-text">
                      {errors.dailyUpdate.description}
                    </span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-5">
                    <label for="startTime-0" class="col-form-label">
                      ساعت شروع
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="startTime-0"
                      onChange={(e) => textOnChange(e, 'scheduledTask')}
                    />
                    <span className="red-text">
                      {errors.dailyUpdate.startTime}
                    </span>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="endTime-0" class="col-form-label">
                      ساعت پایان
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="endTime-0"
                      onChange={(e) => textOnChange(e, 'scheduledTask')}
                    />
                    <span className="red-text">
                      {errors.dailyUpdate.endTime}
                    </span>
                  </div>
                  <div class="form-group col-md-2">
                    <label for="totalProgress" class="col-form-label">
                      &nbsp;
                    </label>
                    <button
                      type="button"
                      class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                      onClick={addTimesRow}
                    >
                      +
                    </button>
                  </div>
                </div>
                {timesRows.map((row) => (
                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for={`startTime-${row}`} class="col-form-label">
                        ساعت شروع
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id={`startTime-${row}`}
                        onChange={(e) => textOnChange(e, 'scheduledTask')}
                      />
                    </div>
                    <div class="form-group col-md-4">
                      <label for={`endTime-${row}`} class="col-form-label">
                        ساعت پایان
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        id={`endTime-${row}`}
                        onChange={(e) => textOnChange(e, 'scheduledTask')}
                      />
                    </div>
                    <div class="form-group col-md-2">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-danger btn-bordred waves-effect waves-light"
                        onClick={() => removeTimesRow(row)}
                      >
                        -
                      </button>
                    </div>
                    <div class="form-group col-md-2">
                      <label class="col-form-label">&nbsp;</label>
                      <button
                        type="button"
                        class="form-control btn btn-purple btn-bordred waves-effect waves-light"
                        onClick={addTimesRow}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <button type="submit" class="btn btn-primary">
                  ثبت اطلاعات
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {
        //new scheduled task modal
      }
      <div
        id="newScheduledTaskModal"
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
                فعالیت برنامه ای جدید
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
              <form
                class="form-horizontal"
                role="form"
                noValidate
                id="newScheduledTask"
                onSubmit={onSubmit}
              >
                <div class="form-group row">
                  <label for="projectTitle" class="col-3 col-form-label">
                    نام پروژه
                  </label>
                  <div class="col-9">
                    <Select
                      options={selectOpts.scheduledProjects}
                      styles={selectStyles}
                      onChange={selectOnChange}
                      placeholder="انتخاب کنید"
                    />
                    <span className="red-text"></span>
                  </div>
                </div>
                {!isEmpty(newScheduledTask.project) && (
                  <div class="form-group row">
                    <label for="projectTitle" class="col-3 col-form-label">
                      عنوان فعالیت
                    </label>
                    <div class="col-9">
                      <Select
                        options={selectOpts.notTodayTasks}
                        styles={selectStyles}
                        onChange={selectOnChange}
                        placeholder="انتخاب کنید"
                      />
                    </div>
                  </div>
                )}
                <div class="modal-footer">
                  <button
                    type="button"
                    onClick={addNttTask}
                    class="btn btn-primary waves-effect waves-light"
                  >
                    ثبت فعالیت
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {
        //new unscheduled task modal
      }
      <div
        id="newUnscheduledTaskModal"
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
                فعالیت خارج از برنامه جدید
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
              <form
                class="form-horizontal"
                role="form"
                noValidate
                onSubmit={onSubmit}
                id="newUnscheduledTask"
              >
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="xminded" class="col-form-label">
                      عنوان فعالیت
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="xminded"
                      name="title"
                      onChange={(e) => textOnChange(e, 'newUnscheduledTask')}
                    />
                    <span className="red-text">
                      {errors.newUnscheduledTask.title}
                    </span>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="xer1" class="col-form-label">
                      ساعت شروع
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="xer1"
                      name="startTime"
                      onChange={(e) => textOnChange(e, 'newUnscheduledTask')}
                    />
                    <span className="red-text">
                      {errors.newUnscheduledTask.startTime}
                    </span>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="xer2" class="col-form-label">
                      ساعت پایان
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      id="xer2"
                      name="endTime"
                      onChange={(e) => textOnChange(e, 'newUnscheduledTask')}
                    />
                    <span className="red-text">
                      {errors.newUnscheduledTask.endTime}
                    </span>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-9">
                    <div class="checkbox checkbox-primary">
                      <input
                        id="checkbox2"
                        type="checkbox"
                        name="relatedToProject"
                        onChange={textOnChange}
                      />
                      <label for="checkbox2">مرتبط با پروژه</label>
                    </div>
                  </div>
                </div>
                {newUnscheduledTask.relatedToProject && (
                  <div class="form-group row">
                    <label for="projectTitle" class="col-3 col-form-label">
                      نام پروژه
                    </label>
                    <div class="col-9">
                      <Select
                        options={selectOpts.unscheduledProjects}
                        styles={selectStyles}
                        onChange={selectOnChange}
                        placeholder="انتخاب کنید"
                      />
                    </div>
                  </div>
                )}

                <div class="modal-footer">
                  <button
                    type="submit"
                    class="btn btn-primary waves-effect waves-light z-i-zero"
                  >
                    ثبت فعالیت
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {
        // Main
      }
      <div class="row">
        <div class="col-12">
          <div class="card-box tasks-table">
            <h4 class="header-title m-t-10 m-b-20">فعالیت های امروز</h4>
            <div class="table-rep-plugin">
              <div class="table-responsive" data-pattern="priority-columns">
                <table id="tech-companies-1" class="table table-striped">
                  <thead>
                    <tr>
                      <th> نام پروژه</th>
                      <th>شرح فعالیت</th>
                      <th>تاریخ تحویل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyTasks.map((task) => (
                      <tr
                        data-toggle="modal"
                        data-target="#taskPropertiesModal"
                        onClick={() => {
                          setScheduledTask({
                            id: task._id,
                            project: task.project,
                            title: task.title,
                            dueDate: task.dueDate,
                            totalProgress: task.totalProgress,
                            todaysProgress: '',
                            timePeriods: [],
                            description: '',
                          });
                        }}
                      >
                        <td>{task.project.title}</td>
                        <td>{task.title}</td>
                        <td>{toPersianDate(task.dueDate)}</td>
                      </tr>
                    ))}
                    {ntt.map((task) => (
                      <tr
                        data-toggle="modal"
                        data-target="#taskPropertiesModal"
                        onClick={() => {
                          setScheduledTask({
                            id: task._id,
                            project: task.project,
                            title: task.title,
                            dueDate: task.dueDate,
                            totalProgress: task.totalProgress,
                            todaysProgress: '',
                            timePeriods: [],
                            description: '',
                          });
                        }}
                      >
                        <td>{task.project.title}</td>
                        <td>{task.title}</td>
                        <td>{toPersianDate(new Date(task.dueDate))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <button
                  type="button"
                  class="btn btn-warning waves-effect waves-light w-lg m-b-5"
                  onClick={() => console.log(ntt)}
                >
                  modalOpen
                </button>
              </div>
              <div class="col-sm-3">
                <button
                  type="button"
                  class="btn btn-warning waves-effect waves-light w-lg m-b-5"
                  data-toggle="modal"
                  data-target="#newScheduledTaskModal"
                >
                  فعالیت برنامه ای جدید
                </button>
              </div>
              <div class="col-sm-6">
                <button
                  type="button"
                  class="btn btn-trans btn-warning waves-effect waves-light w-lg m-b-5"
                  onClick={() => console.log(selectOpts)}
                  data-toggle="modal"
                  data-target="#newUnscheduledTaskModal"
                >
                  فعالیت خارج از برنامه جدید
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

DailyReport.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  fetchScheduledTasks: PropTypes.func.isRequired,
  addScheduledTask: PropTypes.func.isRequired,
  submitExpense: PropTypes.func.isRequired,
  addUnscheduledTask: PropTypes.func.isRequired,
  submitDailyUpdate: PropTypes.func.isRequired,
  fetchDailyTasks: PropTypes.func.isRequired,
  fetchNotTodayTasks: PropTypes.func.isRequired,
  dailyTasks: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
  errorsR: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  tasks: state.task.scheduledTasks,
  projects: state.project.projects,
  errorsR: state.errors,
  dailyTasks: state.forms.dailyTasks.tasks,
  notTodayTasks: state.forms.dailyTasks.tasks,
});

export default connect(mapStateToProps, {
  fetchProjects,
  fetchScheduledTasks,
  addScheduledTask,
  addUnscheduledTask,
  submitExpense,
  fetchDailyTasks,
  submitDailyUpdate,
  fetchNotTodayTasks,
})(DailyReport);
