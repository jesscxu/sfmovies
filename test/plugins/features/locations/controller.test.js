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

});
