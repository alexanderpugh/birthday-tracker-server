const jsonwebtoken = require('jsonwebtoken');

const { login, register } = require('./service');
const { SECRET } = require('../../config/keys');
const logger = require('../../utils/logger');

module.exports = {
  login: async (req, res, next) => {
    const jsonResponse = {};

    try {
      const token = await login(req.body);

      jsonResponse.success = true;
      jsonResponse.data = token;

    } catch (err) {
      logger.error(err);
      jsonResponse.success = false;
      jsonResponse.message = 'Details invalid';

    } finally {
      res.json(jsonResponse);
    }
  },

  register: async (req, res, next) => {
    const jsonResponse = {};

    try {
      const token = await register(req.body);

      jsonResponse.success = true;
      jsonResponse.data = token;

    } catch (err) {
      jsonResponse.success = false;
      jsonResponse.message = 'Details invalid';

    } finally {
      res.json(jsonResponse);
    }
  },

  validate: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    const failRes = { success: false, message: 'Failed to authenticate token.' };

    if (token) {
      jsonwebtoken.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ ...failRes });
        } else {
          req.decoded = decoded;
          next();
        }
      });

    } else {
      return res.status(403).json({ ...failRes });
    }
  }
};
