'use strict';

const Bluebird = require('bluebird');

const Location = require('../../../models/location');
const Movie    = require('../../../models/movie');

exports.create = (payload) => {
  payload.name = payload.title;
  Reflect.deleteProperty(payload, 'title');
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.findAll = (filter) => {
  return new Movie()
  .filter(filter)
  .fetchAll({ withRelated: Movie.RELATED });
};

exports.addLocationToMovieId = (id, payload) => {
  return Bluebird.all([
    new Location({ id: payload.location_id }).fetch({ require: true }),
    new Movie({ id }).fetch({ require: true })
  ])
  .then((arr) => {
    const loc = arr[0];
    const movie = arr[1];
    return movie.locations().attach(loc);
  })
  .then(() => {
    return new Movie({ id }).fetch({ require: true, withRelated: Movie.RELATED });
  });
};
