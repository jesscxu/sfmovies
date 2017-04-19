'use strict';

const Location = require('../../lib/models/location');

describe('location model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const loc = Location.forge().serialize();

      expect(loc).to.have.all.keys([
        'id',
        'name',
        'object'
      ]);

    });

  });

});

