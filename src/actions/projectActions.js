import axios from 'axios';
import {
  GET_ERRORS,
  EMPTY_ERRORS,
  FETCH_TASKS,
  FETCH_TASK,
  FETCH_PROJECTS,
  TASK_UPDATED,
  TASK_ADDED,
} from './types';
import { requestAddress } from '../utils/keys';

export const fetchProjects = (jwtToken) => async (dispatch) => {
  try {
    const projects = await axios.get(`${requestAddress}/user/projects`, {
      headers: { Authorization: extractToken(jwtToken) },
    });
    dispatch({
      type: FETCH_PROJECTS,
      payload: projects.data,
    });
  } catch (e) {
    return;
  }
};

export const fetchTask = (jwtToken, id) => async (dispatch) => {
  const token = extractToken(jwtToken);
  const task = await axios.get('http://127.0.0.1:3000/api/users/tasks/' + id, {
    headers: { Authorization: token },
  });
  dispatch({
    type: FETCH_TASK,
    payload: task.data,
  });
};

const extractToken = (token) => {
  return token.split(' ')[1];
};
