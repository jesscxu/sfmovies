'use strict';

const Controller = require('../../../../lib/plugins/features/locations/controller');
const Location   = require('../../../../lib/models/location');

describe('location controller', () => {

  describe('create', () => {

    it('creates a location', () => {
      const payload = { name: 'jessicas pooping toilet' };

      return Controller.create(payload)
      .then((loc) => {
        expect(loc.get('name')).to.eql(payload.name);

        return new Location({ id: loc.id }).fetch();
      })
      .then((loc) => {
        expect(loc.get('name')).to.eql(payload.name);
      });
    });

  });

  describe('findAll', () => {

    it('finds all locations', () => {
      const values = {
        name: 'jessicaaa'
      };

      return new Location().save(values)
      .then(() => {
        return Controller.findAll().get('models');
      })
      .then((locations) => {
        expect(locations.length).to.be.at.least(1);
      });
    });

  });

});
