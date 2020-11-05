import { SET_HEADER_PATH } from './../actions/types';

const initialState = {
  headerPath: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_HEADER_PATH:
      return {
        ...state,
        headerPath: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
