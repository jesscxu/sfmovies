'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const movie = Movie.forge().serialize();

      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);

    });

  });

  describe('filter', () => {

    it('filters by exact title', () => {
      const filter = {
        title: 'Rollerball'
      };

      return new Movie().filter(filter).fetchAll().get('models')
      .then((movies) => {
        expect(movies[0].get('title')).to.eql(filter.title);
      });
    });

    it('filters by fuzzy title', () => {
      const filter = {
        fuzzy_title: 'and'
      };

      return new Movie().filter(filter).fetchAll().get('models')
      .then((movies) => {
        expect(movies).to.not.be.empty;
        movies.forEach((movie) => expect(movie.get('title')).to.have.string('and'));
      });
    });

    it('filters by release year', () => {
      const filter = {
        release_year: 2002
      };

      return new Movie().filter(filter).fetchAll().get('models')
      .then((movies) => {
        expect(movies).to.not.be.empty;
        movies.forEach((movie) => expect(movie.get('release_year')).to.eq(filter.release_year));
      });
    });

    it('filters by range of release years', () => {
      const filter = {
        release_year_start: 2002,
        release_year_end: 2004
      };

      return new Movie().filter(filter).fetchAll().get('models')
      .then((movies) => {
        expect(movies).to.not.be.empty;
        movies.forEach((movie) => expect(movie.get('release_year')).to.be.at.least(filter.release_year_start));
        movies.forEach((movie) => expect(movie.get('release_year')).to.be.at.most(filter.release_year_end));
      });
    });

  });

});
