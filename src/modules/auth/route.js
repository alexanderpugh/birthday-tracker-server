const { login, register } = require('./controller');

const root = '/api/auth/';

module.exports = {
  requiresAuth: false,

  init(app) {
    app.post(`${root}login`, login);
    app.post(`${root}register`, register);
  }
}
