'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.findAll = (filter) => {
  return new Movie()
  .filter(filter)
  .fetchAll()
}
