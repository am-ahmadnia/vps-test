import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import taskReducer from './taskReducer';
import projectReducer from './projectReducer';
import formsReducer from './formsReducer';
import alertReducer from './alertReducer';
import uiReducer from './uiReducer';

import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
  forms: formsReducer,
  project: projectReducer,
  errors: errorReducer,
  alerts: alertReducer,
  ui: uiReducer,
});
