const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '0',
    padding: '25px',
    direction: 'rtl',
    textAlign: 'right',
    width: '400px',
  },
};

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    height: '38px',
    borderRadius: '4px',
    border: '1px solid #e3e3e3',
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '0',
  }),
};

const datepickerStyles = {
  calendarContainer: 'calendarContainer',
  dayPickerContainer: 'dayPickerContainer',
  monthsList: 'monthsList',
  daysOfWeek: 'daysOfWeek',
  dayWrapper: 'dayWrapper',
  selected: 'selected',
  heading: 'heading',
  next: 'next',
  prev: 'prev',
  title: 'title',
};

module.exports = {
  selectStyles,
  datepickerStyles,
  modalStyles,
};
