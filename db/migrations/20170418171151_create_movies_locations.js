'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.createTable('movies_locations', (table) => {
    table.increments('id').primary();
    table.integer('location_id');
    table.integer('movie_id');
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.dropTable('movies_locations');
};
