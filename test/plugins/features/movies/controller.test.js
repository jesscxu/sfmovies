'use strict';

const Bluebird = require('bluebird');

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Location   = require('../../../../lib/models/location');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const title = 'WALL-E';
      const payload = { title };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(title);
      });
    });

  });

  describe('findAll', () => {

    it('finds all movies with filters', () => {
      const values = {
        name: 'poo of poop',
        release_year: 2004
      };

      const filter = {
        fuzzy_title: 'of',
        release_year_start: 2002,
        release_year_end: 2012
      };

      return new Movie().save(values)
      .then(() => {
        return Controller.findAll(filter);
      })
      .then((movies) => {
        expect(movies.length).to.be.at.least(1);
      });
    });

    it('loads related models (locations)', () => {
      const movie_values = {
        name: 'jessica',
        release_year: 2004
      };

      const location_values = {
        name: 'pooping toilet'
      };

      return Bluebird.all([
        new Movie().save(movie_values),
        new Location().save(location_values)
      ])
      .then((arr) => {
        const movie = arr[0];
        const loc = arr[1];
        return movie.locations().attach(loc);
      })
      .then(() => {
        return Controller.findAll({ title: 'jessica' }).get('models');
      })
      .then((movies) => {
        expect(movies[0].related('locations').at(0).get('name')).to.eql(location_values.name);
      });
    });

  });

  describe('addLocationToMovieId', () => {

    it('returns movie with all locations', () => {

      const movie_values = {
        name: 'jessica',
        release_year: 2004
      };

      const location_values = {
        name: 'pooping toilet'
      };

      return Bluebird.all([
        new Movie().save(movie_values),
        new Location().save(location_values)
      ])
      .then((arr) => {
        const movie = arr[0];
        const loc = arr[1];
        return Controller.addLocationToMovieId(movie.id, { location_id: loc.id });
      })
      .then((movie) => {
        expect(movie.related('locations').length).to.eql(1);
        expect(movie.related('locations').at(0).get('name')).to.eql(location_values.name);
      });
    });

    it('errors if movie does not exist', () => {
      const payload = {
        location_id: 1
      };

      const movie_values = {
        name: 'poopie',
        release_year: 2022,
        id: -1
      };

      return Controller.addLocationToMovieId(movie_values.id, payload)
      .catch((error) => error)
      .then((error) => {
        expect(error).to.be.instanceof(Movie.NotFoundError);
      });
    });

    it('errors if location does not exist', () => {
      const payload = {
        location_id: -1
      };

      const movie_values = {
        name: 'poopie',
        release_year: 2022
      };

      return new Movie().save(movie_values)
      .then(() => {
        return new Movie({ name: 'poopie' }).fetch();
      })
      .then((movie) => {
        return Controller.addLocationToMovieId(movie.id, payload);
      })
      .catch((error) => error)
      .then((error) => {
        expect(error).to.be.instanceof(Location.NotFoundError);
      });
    });

  });

});
