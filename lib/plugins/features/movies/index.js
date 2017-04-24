'use strict';

const Controller     = require('./controller');
const MovieValidator = require('../../../validators/movie');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      description: 'List all movies with filter params',
      handler: function (request, reply) {
        reply(Controller.findAll(request.query));
      },
      validate: {
        query: MovieValidator.query
      }
    }
  }, {
    method: 'POST',
    path: '/movies/{id}/locations',
    config: {
      description: 'Add a location to a movie using id',
      handler: function (request, reply) {
        reply(Controller.addLocationToMovieId(request.params.id, request.payload));
      },
      validate: {
        payload: MovieValidator.payload_location
      }
    }
  }, {
    method: 'POST',
    path: '/movies',
    config: {
      handler: function (request, reply) {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator.payload
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
