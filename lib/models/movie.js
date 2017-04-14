'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  serialize: function () {
    return {
      id: this.get('id'),
      title: this.get('title'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  },
  filter: function(filter) {
    return this.query(function (qb) {
      if (filter.release_year) {
        qb.where('release_year', filter.release_year);
      }
      if (filter.release_year_start && filter.release_year_end) {
        qb.where('release_year', '>=', filter.release_year_start).andWhere('release_year', '<=', filter.release_year_end);
      }
      if (filter.title) {
        qb.where('title', filter.title);
      }
      if (filter.fuzzy_title) {
        qb.where('title', 'like', '%' + filter.fuzzy_title + '%')
      }
    })
  }
});

