const controller = require('./controller');

const root = '/api/contact';

module.exports = {
  requiresAuth: true,

  init(app) {
    controller.forEach((prop) => {
      app[prop.method](`${root}${prop.route}`, prop.handler);
    });
  }
}
