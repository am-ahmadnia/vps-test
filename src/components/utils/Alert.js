import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import { setAlert } from './../../actions/alertActions';
import PropTypes from 'prop-types';
import {
  TASK_UPDATED,
  SIGN_UP_SUBMITTED,
  TASK_ADDED,
  EXPENSE_ADDED,
} from './../../actions/types';

const Alerts = ({
  expenseAdded,
  signUpSubmitted,
  taskUpdated,
  taskAdded,
  setAlert,
}) => {
  const alert = useAlert();

  useEffect(() => {
    if (expenseAdded) {
      alert.success('اطلاعات هزینه با موفقیت ذخیره شد');
      setTimeout(setAlert(EXPENSE_ADDED, false), 3000);
    }
    if (signUpSubmitted) {
      alert.success('اطلاعات استخدامی با موفقیت ذخیره شد');
      setTimeout(setAlert(SIGN_UP_SUBMITTED, false), 3000);
    }
    if (taskAdded) {
      alert.success('فعالیت با موفقیت اضافه شد');
      setTimeout(setAlert(TASK_ADDED, false), 3000);
    }
    if (taskUpdated) {
      alert.success('فعالیت با موفقیت ویرایش شد');
      setTimeout(setAlert(TASK_UPDATED, false), 3000);
    }
  });

  return <Fragment></Fragment>;
};

Alerts.propTypes = {
  setAlert: PropTypes.func.isRequired,
  taskUpdated: PropTypes.bool.isRequired,
  signUpSubmitted: PropTypes.bool.isRequired,
  expenseAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  taskUpdated: state.alerts.taskUpdated,
  taskAdded: state.alerts.taskAdded,
  signUpSubmitted: state.alerts.signUpSubmitted,
  expenseAdded: state.alerts.expenseAdded,
});

export default connect(mapStateToProps, { setAlert })(Alerts);
