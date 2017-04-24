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
        'locations',
        'object'
      ]);

    });

  });

  describe('filter', () => {

    const values = {
      name: 'Rollerball',
      release_year: 2002
    };

    it('filters by exact title', () => {
      return new Movie().save(values)
      .then(() => {
        const filter = {
          title: 'Rollerball'
        };

        return new Movie().filter(filter).fetchAll().get('models')
        .then((movies) => {
          expect(movies[0].get('name')).to.eql(filter.title);
        });

      });

    });

    it('filters by fuzzy title', () => {
      new Movie().save(values)
      .then(() => {
        const filter = {
          fuzzy_title: 'all'
        };

        return new Movie().filter(filter).fetchAll().get('models')
        .then((movies) => {
          expect(movies).to.not.be.empty;
          movies.forEach((movie) => expect(movie.get('name')).to.have.string('all'));
        });

      });

    });

    it('filters by release year', () => {
      new Movie().save(values)
      .then(() => {
        const filter = {
          release_year: 2002
        };

        return new Movie().filter(filter).fetchAll().get('models')
        .then((movies) => {
          expect(movies).to.not.be.empty;
          movies.forEach((movie) => expect(movie.get('release_year')).to.eq(filter.release_year));
        });

      });

    });

    it('filters by range of release years', () => {
      new Movie().save(values)
      .then(() => {
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

});
