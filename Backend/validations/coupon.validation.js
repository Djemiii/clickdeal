const Joi = require('joi');

exports.createCouponSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  discount: Joi.number().min(1).max(100).required(),
  code: Joi.string().alphanum().min(4).max(12).optional(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  startDate: Joi.date().greater('now').required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required(),
  conditions: Joi.string().required(),
  company: Joi.string().hex().length(24).required() // ObjectId de l'entreprise
});
