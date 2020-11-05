import {
  FETCH_SCHEDULED_TASK,
  FETCH_SCHEDULED_TASKS,
} from './../actions/types';

const initialState = {
  scheduledTasks: [],
  scheduledTask: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEDULED_TASKS:
      return {
        ...state,
        scheduledTasks: action.payload,
      };
    case FETCH_SCHEDULED_TASK:
      return {
        ...state,
        scheduledTask: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
