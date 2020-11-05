import axios from 'axios';

import {
  FETCH_USER,
  ADD_PERSONAL_INFO,
  EMPTY_ERRORS,
  GET_ERRORS,
} from './types';
import { requestAddress } from '../utils/keys';
import extractToken from './../utils/getToken';

export const addPersonalInfo = (jwt, history, username, data) => async (
  dispatch
) => {
  try {
    await axios.post(
      `${requestAddress}/user/${username}/add-personal-info`,
      data,
      {
        headers: { Authorization: extractToken(jwt) },
      }
    );
    history.push(`/${username}`);
    dispatch({
      type: EMPTY_ERRORS,
    });
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data,
    });
  }
};

export const fetchUser = (jwt, username) => async (dispatch) => {
  try {
    const user = await axios.get(`${requestAddress}/user/${username}`, {
      headers: { Authorization: extractToken(jwt) },
    });
    dispatch({
      type: FETCH_USER,
      payload: user.data,
    });
  } catch (error) {
    return;
  }
};
