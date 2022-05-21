const Joi = require('joi');

const ClientSchemaController = Joi.object({
  fullName: Joi.string().required().min(4),
  email: Joi.string().required(),
  birthDate: Joi.string().required(),
  cpf: Joi.string().max(14),
  phoneNumber: Joi.string().required().min(10).max(14),
  postalCode: Joi.string().required().min(8),
  gender: Joi.string().required(),
  password: Joi.string().required().min(6),
});

module.exports = {
  ClientSchemaController,
};
