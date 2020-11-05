import { FETCH_DAILY_TASKS, FETCH_NOT_TODAY_TASKS } from './../actions/types';

const initialState = {
  dailyTasks: { lastUsed: '', tasks: [] },
  notTodayTasks: { lastUsed: '', tasks: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DAILY_TASKS:
      return {
        ...state,
        dailyTasks: {
          lastUsed: action.payload.page,
          tasks: action.payload.tasks,
        },
      };
    case FETCH_NOT_TODAY_TASKS:
      return {
        ...state,
        notTodayTasks: {
          lastUsed: action.payload.page,
          tasks: action.payload.tasks,
        },
      };

    default:
      return {
        ...state,
      };
  }
}
