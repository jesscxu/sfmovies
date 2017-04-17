'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('name'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  },
  filter: function (filter) {
    return this.query((qb) => {
      if (filter.release_year) {
        qb.where('release_year', filter.release_year);
      }

      if (filter.release_year_start) {
        qb.where('release_year', '>=', filter.release_year_start);
      }

      if (filter.release_year_end) {
        qb.where('release_year', '<=', filter.release_year_end);
      }

      if (filter.title) {
        qb.where('name', filter.title);
      }

      if (filter.fuzzy_title) {
        qb.where('name', 'like', `%${filter.fuzzy_title}%`);
      }
    });
  }
});
