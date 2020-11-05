import { FETCH_PROJECT, FETCH_PROJECTS } from '../actions/types';

const initialState = {
  projects: [],
  project: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case FETCH_PROJECT:
      return {
        ...state,
        project: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
