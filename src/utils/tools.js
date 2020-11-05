const getDaysInBetween = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
};

const checkEndDate = (startDate, endDate) => {
  if (new Date(startDate).getTime() >= new Date(endDate).getTime())
    return false;
  else return true;
};

const translateNumbers = (numbers) => {
  var map = [
    '&#1632;',
    '&#1633;',
    '&#1634;',
    '&#1635;',
    '&#1636;',
    '&#1637;',
    '&#1638;',
    '&#1639;',
    '&#1640;',
    '&#1641;',
  ];
  var newStr = '';
  numbers = String(numbers);
  for (i = 0; i < numbers.length; i++) {
    newStr += map[parseInt(numbers.charAt(i))];
  }

  return newStr;
};

module.exports = {
  getDaysInBetween,
  checkEndDate,
  translateNumbers,
};
