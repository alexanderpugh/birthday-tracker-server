const service = require('./service');
const logger = require('../../utils/logger');

const response = {
  success: false,
  data: null,
  message: ''
};

module.exports = [
  {
    name: "getOne",
    method: 'get',
    route: "/:id",
    handler: async (req, res, next) => {
      const jsonRes = { ...response };

      try {
        jsonRes.data = await service.getOne({
          userId: req.decoded.id,
          contactId: req.params.id
        });

        jsonRes.success = true;
      } catch (err) {
        logger.error(err);
        jsonRes.message = 'Unable to get contact';
      } finally {
        res.json(jsonRes);
      }
    }
  },

  {
    name: "getAll",
    method: 'get',
    route: "/",
    handler: async (req, res, next) => {
      const jsonRes = { ...response };

      try {
        jsonRes.data = await service.getAll({
          userId: req.decoded.id
        });

        jsonRes.success = true;
      } catch (err) {
        logger.error(err);
        jsonRes.message = 'Unable to get contacts';
      } finally {
        res.json(jsonRes);
      }
    }
  },

  {
    name: "editOne",
    method: 'put',
    route: "/:id",
    handler: async (req, res, next) => {
      const jsonRes = { ...response };

      try {
        await service.editOne({
          userId: req.decoded.id,
          contactId: req.params.id,
          contact: {
            name: req.body.name,
            imageURL: req.body.imageURL,
            DOB: req.body.DOB,
            budget: req.body.budget
          }
        });

        jsonRes.data = await service.getOne({
          userId: req.decoded.id,
          contactId: req.params.id
        });

        jsonRes.success = true;
      } catch (err) {
        logger.error(err);
        jsonRes.message = 'Unable to edit contact';
      } finally {
        res.json(jsonRes);
      }
    }
  },

  {
    name: "deleteOne",
    method: 'delete',
    route: "/:id",
    handler: async (req, res, next) => {
      const jsonRes = { ...response };

      try {
        const preDeleted = await service.getOne({
          userId: req.decoded.id,
          contactId: req.params.id
        });

        await service.deleteOne({
          userId: req.decoded.id,
          contactId: req.params.id
        });

        jsonRes.data = preDeleted;
        jsonRes.success = true;
      } catch (err) {
        logger.error(err);
        jsonRes.message = 'Unable to delete contact';
      } finally {
        res.json(jsonRes);
      }
    }
  },

  {
    name: "addOne",
    method: 'post',
    route: "/",
    handler: async (req, res, next) => {
      const jsonRes = { ...response };

      try {
        const newContact = await service.create({
          userId: req.decoded.id,
          contact: {
            name: req.body.name,
            imageURL: req.body.imageURL,
            DOB: req.body.DOB,
            budget: req.body.budget
          }
        });

        jsonRes.data = newContact;
        jsonRes.success = true;
      } catch (err) {
        logger.error(err);
        jsonRes.message = 'Unable to save new contact';
      } finally {
        res.json(jsonRes);
      }
    }
  }
];
