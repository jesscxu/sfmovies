'use strict';

const Location = require('../../../models/location');

exports.create = (payload) => {
  return new Location().save(payload)
  .then((loc) => {
    return new Location({ id: loc.id }).fetch();
  });
};

exports.findAll = () => {
  return new Location()
  .fetchAll();
};
