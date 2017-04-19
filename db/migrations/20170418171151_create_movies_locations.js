'use strict';

exports.up = function (Knex, Promise) {
  return Knex.schema.createTable('movies_locations', (table) => {
    table.increments('id').primary();
    table.integer('location_id').notNullable();
    table.integer('movie_id').notNullable();
  });
};

exports.down = function (Knex, Promise) {
  return Knex.schema.dropTable('movies_locations');
};
