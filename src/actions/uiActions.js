import { SET_HEADER_PATH } from './types';

export const setHeaderPath = (path) => (dispatch) => {
  dispatch({
    type: SET_HEADER_PATH,
    payload: path,
  });
};
