'use strict';

const Locations = require('../../../../lib/server');
const Location  = require('../../../../lib/models/location');

describe('locations integration', () => {

  describe('create', () => {

    it('creates a location', () => {
      return Locations.inject({
        url: '/locations',
        method: 'POST',
        payload: { name: 'jessica pooping toilet' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('location');
      });

    });

  });

  describe('findAll', () => {

    it('finds all locations in the locations table', () => {

      const values = {
        name: 'marcus poop'
      };

      new Location().save(values);

      return Locations.inject({
        url: '/locations',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.length).to.be.at.least(1);
      });

    });

  });

});
