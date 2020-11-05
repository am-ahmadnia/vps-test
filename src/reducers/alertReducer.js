import {
  USER_ADDED,
  USER_EDITED,
  USER_DELETED,
  ADMIN_REGISTERED,
  TASK_UPDATED,
  TASK_ADDED,
  SIGN_UP_SUBMITTED,
  EXPENSE_ADDED,
} from './../actions/types';

const initialState = {
  expenseAdded: false,
  signUpSubmitted: false,
  taskUpdated: false,
  taskAdded: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EXPENSE_ADDED:
      return {
        ...state,
        expenseAdded: action.payload,
      };
    case SIGN_UP_SUBMITTED:
      return {
        ...state,
        signUpSubmitted: action.payload,
      };
    case TASK_ADDED:
      return {
        ...state,
        taskAdded: action.payload,
      };
    case TASK_UPDATED:
      return {
        ...state,
        taskUpdated: action.payload,
      };
    case USER_ADDED:
      return {
        ...state,
        userAdded: action.payload,
      };
    case USER_EDITED:
      return {
        ...state,
        userEdited: action.payload,
      };
    case USER_DELETED:
      return {
        ...state,
        userDeleted: action.payload,
      };
    case ADMIN_REGISTERED:
      return {
        ...state,
        adminRegistered: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
