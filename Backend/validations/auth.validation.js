const Joi = require('joi');

exports.registerSchema = Joi.object({
   name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
role: Joi.string().valid("entreprise", "consommateur","admin").default("consommateur"),
 
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
