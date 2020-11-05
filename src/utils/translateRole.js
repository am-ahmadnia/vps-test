module.exports = (role) => {
  return role === 'designer'
    ? 'طراح'
    : role === 'leadDesigner'
    ? 'طراح ؟؟؟'
    : role === 'manager'
    ? 'مدیر'
    : role === 'admin'
    ? 'ادمین'
    : null;
};
