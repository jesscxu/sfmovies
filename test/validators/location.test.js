'use strict';

const Joi = require('joi');

const LocationValidator = require('../../lib/validators/location');

describe('location validator', () => {

  describe('name', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, LocationValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { name: 'j'.repeat(256) };
      const result = Joi.validate(payload, LocationValidator);

      expect(result.error.details[0].path).to.eql('name');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

});
