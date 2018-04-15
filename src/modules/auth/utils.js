const _ = require('lodash');

const isTruthy = (value) => !(_.isNull(value) || _.isUndefined(value));

const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

const emailValid = (email, regex = emailRegex) =>
  isTruthy(email) && Boolean(email.match(regex));

const passwordValid = (password, regex = passwordRegex) =>
  isTruthy(password) && Boolean(password.match(regex));

module.exports = {
  emailRegex,
  passwordRegex,
  emailValid,
  passwordValid
};
