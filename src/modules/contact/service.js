const Contact = require('./model');

const isRequired = require('../../utils/isRequired');
const { orderByClosestDate } = require('./utils');
const logger = require('../../utils/logger');

module.exports = {
  create: async ({ userId = isRequired('userId'), contact = isRequired('contact') }) => {
    try {
      const {
        name = isRequired('name'),
        imageURL,
        DOB = isRequired('DOB'),
        budget
      } = contact;

      const newContact = new Contact({ ...contact, userId });

      await newContact.save();

      return newContact;

    } catch (err) {
      logger.error(logger);
      throw err;
    }
  },

  getOne: async ({ userId = isRequired('userId'), contactId = isRequired('contactId') }) => {
    try {
      const fetchedContact = await Contact.findOne({ _id: contactId, userId }).exec();

      if (!fetchedContact) {
        throw new Error('ERROR: invalid contact ID or user ID');
      }

      return fetchedContact;

    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  getAll: async ({ userId = isRequired('userId') }) => {
    try {
      const fetchedContacts = await Contact.find({ userId }).exec();

      const contacts = orderByClosestDate(fetchedContacts, new Date());

      return contacts;

    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  editOne: async ({
    userId = isRequired('userId'),
    contactId = isRequired('contactId'),
    contact = isRequired('contact')
  }) => {
    try {
      const preEditedContact = await Contact.findByIdAndUpdate(contactId, { $set: { ...contact } }).exec();

      return preEditedContact;

    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

  deleteOne: async ({ userId = isRequired('userId'), contactId = isRequired('contactId') }) => {
    try {
      const deletedContact = await Contact.remove({ userId, _id: contactId }).exec();

      if (!deletedContact.n) {
        throw new Error('ERROR: invalid user ID and contact ID');
      }
      return deletedContact;
    } catch (err) {
      logger.error(er);
      throw err;
    }
  }
};
