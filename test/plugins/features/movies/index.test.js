'use strict';

const Bluebird = require('bluebird');

const Location = require('../../../../lib/models/location');
const Movie    = require('../../../../lib/models/movie');
const Movies   = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });

    });

  });

  describe('findAll', () => {

    it('filters movies by query parameters', () => {

      const values = {
        name: 'Rollerball',
        release_year: 2017
      };

      return new Movie().save(values)
      .then(() => {
        return Movies.inject({
          url: '/movies?title=Rollerball',
          method: 'GET'
        });
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result[0].title).to.eql('Rollerball');
      });
    });

  });

  describe('addLocationToMovieId', () => {

    it('adds a location to a movie', () => {
      const movie_values = {
        name: 'jessica',
        release_year: 2004
      };

      const location_values = {
        name: 'pooper'
      };

      return Bluebird.all([
        new Movie().save(movie_values),
        new Location().save(location_values)
      ])
      .then(() => {
        return Bluebird.all([
          new Movie({ name: movie_values.name }).fetch(),
          new Location({ name: location_values.name }).fetch()
        ]);
      })
      .then((arr) => {
        const movie = arr[0];
        const loc = arr[1];
        return Movies.inject({
          url: `/movies/${movie.id}/locations`,
          method: 'POST',
          payload: { location_id: loc.id }
        });
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.title).to.eql('jessica');
      });

    });

  });

});
