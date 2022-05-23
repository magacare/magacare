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

const ProductSchemaController = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required().min(2).message('O nome do produto deve contrar no minimo 2 caracteres'),
  description: Joi.string().required(),
  volume: Joi.string().required(),
  recommendation: Joi.string().valid('pele seca', 'pele oleosa', 'pele mista', 'pele normal').required(),
});

const WishListSchemaController = Joi.object({
  title: Joi.string().required().min(4).message('O título da wishlist deve contrar no minimo 4 caracteres'),
  client: Joi.string().required().min(2).message('O id do cliente deve conter pelo menos 2 caracteres'),
  product: Joi.string().required().min(2).message('O código do produto deve conter pelo menos 2 caracteres'),
});

module.exports = {
  ClientSchemaController,
  ProductSchemaController,
  WishListSchemaController,
};
