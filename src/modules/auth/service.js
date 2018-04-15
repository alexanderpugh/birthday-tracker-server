const jsonwebtoken = require('jsonwebtoken');

const User = require('../user/model');
const { emailValid, passwordValid } = require('./utils');
const { SECRET } = require('../../config/keys');
const logger = require('../../utils/logger');

const setAndSendToken = (user) => jsonwebtoken.sign(user, SECRET, { expiresIn: "7d" });

module.exports = {

  register: async ({ email, password }) => {
    try {
      if (!(emailValid(email) || passwordValid(password))) {
        throw new Error('ERROR: email and password must be set');
      }

      const user = new User({ email, password });

      await user.save();

      return setAndSendToken(user.getData());

    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try {
      if (!(emailValid(email) || passwordValid(password))) {
        throw new Error('ERROR: email and password must be set');
      }

      const user = await User.findOne({ email }).exec();

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new Error('ERROR: the passwords do not match');
      }

      return setAndSendToken(user.getData());

    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
};
