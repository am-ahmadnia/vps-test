import axios from 'axios';
import {
  GET_ERRORS,
  EMPTY_ERRORS,
  EXPENSE_ADDED,
  TASK_ADDED,
  FETCH_USER,
  FETCH_DAILY_TASKS,
  FETCH_NOT_TODAY_TASKS,
} from './types';
import { requestAddress } from '../utils/keys';
import extractToken from './../utils/extractToken';

export const addExpense = (jwt, history, user, data) => async (dispatch) => {
  try {
    await axios.post(`${requestAddress}/forms/${user.id}/add-expense`, data, {
      headers: { Authorization: extractToken(jwt) },
    });
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: EXPENSE_ADDED,
      payload: true,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const submitDailyUpdate = (
  jwt,
  history,
  user,
  projectId,
  taskId,
  data
) => async (dispatch) => {
  try {
    await axios.post(
      `${requestAddress}/forms/${user.id}/${projectId}/${taskId}/daily-update`,
      data,
      {
        headers: { Authorization: extractToken(jwt) },
      }
    );
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: EXPENSE_ADDED,
      payload: true,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const fetchNotTodayTasks = (jwt, userId) => async (dispatch) => {
  const tasks = await axios.get(
    `${requestAddress}/forms/${userId}/not-today-tasks`,
    {
      headers: { Authorization: extractToken(jwt) },
    }
  );
  dispatch({
    type: FETCH_NOT_TODAY_TASKS,
    payload: {
      page: 'dailyReport',
      tasks: tasks.data,
    },
  });
};

export const fetchDailyTasks = (jwt, userId) => async (dispatch) => {
  const tasks = await axios.get(
    `${requestAddress}/forms/${userId}/daily-tasks`,
    {
      headers: { Authorization: extractToken(jwt) },
    }
  );
  dispatch({
    type: FETCH_DAILY_TASKS,
    payload: {
      page: 'dailyReport',
      tasks: tasks.data,
    },
  });
};

export const addUnscheduledTask = (jwt, history, user, data) => async (
  dispatch
) => {
  try {
    await axios.post(
      `${requestAddress}/forms/${user.id}/add-unscheduled-task`,
      data,
      {
        headers: { Authorization: extractToken(jwt) },
      }
    );
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: EXPENSE_ADDED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const addScheduledTask = (jwt, history, projectId, user, data) => async (
  dispatch
) => {
  try {
    await axios.post(
      `${requestAddress}/forms/${user.id}/${projectId}/add-scheduled-task`,
      data,
      {
        headers: { Authorization: extractToken(jwt) },
      }
    );
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: EXPENSE_ADDED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const fetchUser = (jwt, id) => async (dispatch) => {
  const user = await axios.get(`${requestAddress}/user/${id}`, {
    headers: { Authorization: extractToken(jwt) },
  });
  dispatch({
    type: FETCH_USER,
    payload: user.data,
  });
};

export const submitLeaveRequest = (jwt, history, user, data) => async (
  dispatch
) => {
  try {
    await axios.post(`${requestAddress}/forms/${user.id}/leave-request`, data, {
      headers: { Authorization: extractToken(jwt) },
    });
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: EXPENSE_ADDED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const submitSignUp = (jwt, history, user, data) => async (dispatch) => {
  try {
    await axios.post(`${requestAddress}/forms/${user.id}/sign-up`, data, {
      headers: { Authorization: extractToken(jwt) },
    });
    history.push(`/${user.username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
    dispatch({
      type: TASK_ADDED,
      payload: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};
