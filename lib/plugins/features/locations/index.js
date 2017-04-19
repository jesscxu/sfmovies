'use strict';

const Controller        = require('./controller');
const LocationValidator = require('../../../validators/location');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/locations',
    config: {
      description: 'List all locations',
      handler: function (request, reply) {
        reply(Controller.findAll());
      }
    }
  }, {
    method: 'POST',
    path: '/locations',
    config: {
      handler: function (request, reply) {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: LocationValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'locations'
};
