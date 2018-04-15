const fs = require('fs');
const path = require('path');

module.exports = {
  init: ({ app, authCheckHandler }) => {
    const modules = fs.readdirSync(path.resolve(__dirname, '../modules'));

    const preAuth = [];
    const postAuth = [];

    modules.forEach((component) => {
      const routeFile = `../modules/${component}/route.js`;
      const routePath = path.resolve(__dirname, routeFile);
      const routeExists = fs.existsSync(routePath);

      if (routeExists) {
        const route = require(routeFile);

        if (route.requiresAuth) {
          postAuth.push(route.init);
        } else {
          preAuth.push(route.init);
        }
      }
    });

    preAuth.forEach((init) => {
      init(app);
    });

    app.use(authCheckHandler);

    postAuth.forEach((init) => {
      init(app);
    });
  }
};
