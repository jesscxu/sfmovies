'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.table('movies_locations', (table) => {
    table.dropColumn('id');
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.table('movies_locations', (table) => {
    table.increments('id').primary();
  });
};
