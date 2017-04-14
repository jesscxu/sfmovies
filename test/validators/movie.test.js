'use strict';

const Joi = require('joi');

const MovieValidator = require('../../lib/validators/movie');

describe('movie validator payload', () => {

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, MovieValidator.payload);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = {
        title: 'a'.repeat(256)
      };
      const result = Joi.validate(payload, MovieValidator.payload);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is released on or after 1878', () => {
      const payload = {
        title: 'foo',
        release_year: 1800
      };
      const result = Joi.validate(payload, MovieValidator.payload);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is at most 9999', () => {
      const payload = {
        title: 'foo',
        release_year: 10000
      };
      const result = Joi.validate(payload, MovieValidator.payload);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});

describe('movie validator query', () => {

  describe('release_year_start', () => {

    it('is released on or after 1878', () => {
      const query = {
        title: 'poop',
        release_year_start: 1877
      };
      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].path).to.eql('release_year_start');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is at most 9999', () => {
      const query = {
        title: 'foo',
        release_year_start: 10000
      };
      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].path).to.eql('release_year_start');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('release_year_end', () => {

    it('is released on or after 1878', () => {
      const query = {
        title: 'poop',
        release_year_end: 1234
      };
      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].path).to.eql('release_year_end');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const query = {
        title: 'foo',
        release_year_end: 10000
      };
      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].path).to.eql('release_year_end');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('fuzzy_title', () => {

    it('is less than 255 characters', () => {
      const query = {
        fuzzy_title: 'j'.repeat(256)
      };
      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].path).to.eql('fuzzy_title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('fuzzy_title nand title', () => {

    it('cannot have both fuzzy_title and title', () => {
      const query = {
        fuzzy_title: 'poop',
        title: 'jessicaaaaa'
      };

      const result = Joi.validate(query, MovieValidator.query);

      expect(result.error.details[0].type).to.eql('object.nand');
    });

  });

});
