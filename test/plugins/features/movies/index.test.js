'use strict';

const Movies = require('../../../../lib/server');

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
      return Movies.inject({
        url: '/movies?title=WALL-E',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result[0].title).to.eql('WALL-E');
      });
    });

  });

});
