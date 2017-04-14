'use strict';

const Joi = require('joi');

exports.payload = Joi.object().keys({
  title: Joi.string().min(1).max(255).required(),
  release_year: Joi.number().integer().min(1878).max(9999).optional()
});

exports.query = Joi.object().keys({
  title: Joi.string().min(1).max(255).optional(),
  fuzzy_title: Joi.string().min(1).max(255).optional(),
  release_year: Joi.number().integer().min(1878).max(9999).optional(),
  release_year_start: Joi.number().integer().min(1878).max(9999).optional(),
  release_year_end: Joi.number().integer().min(1878).max(9999).optional()
})
.nand('title', 'fuzzy_title');
