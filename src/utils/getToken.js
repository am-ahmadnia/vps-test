module.exports = (jwt) => {
  return jwt.split(' ')[1];
};
