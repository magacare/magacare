const Joi = require('joi');

const ClientSchemaController = Joi.object({
  fullName: Joi.string().required().min(4).message('The name of client should have at least 4 characters.'),
  email: Joi.string().required().email(),
  birthDate: Joi.string().required('The birth date is required'),
  cpf: Joi.string().max(14).message('The cpf is required and it should have 14 characters.'),
  phoneNumber: Joi.string().required().min(10).max(14),
  postalCode: Joi.string().required().min(8)
    .message('The postal code should have at least 8 numbers.'),
  gender: Joi.string().required().valid('mulher cis', 'mulher trans', 'homem cis', 'homem trans', 'não binário', 'prefiro não responder').lowercase(),
  password: Joi.string().required().min(6).message('The password should have at least 6 characters.'),
});

const ProductSchemaController = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required().min(2).message('The product name should have at least 2 characters'),
  description: Joi.string().required(),
  volume: Joi.string().required(),
  recommendation: Joi.string().required().valid('pele seca', 'pele oleosa', 'pele mista', 'pele normal', 'todas as peles').lowercase(),
});

const ProductSchemaControllerUpdate = Joi.object({
  name: Joi.string().required().min(2).message('The product name should have at least 2 characters'),
  description: Joi.string().required(),
  volume: Joi.string().required(),
  recommendation: Joi.string().required().valid('pele seca', 'pele oleosa', 'pele mista', 'pele normal', 'todas as peles').lowercase(),
});

const WishListSchemaController = Joi.object({
  title: Joi.string().required().min(4).message('The title of wishlist should have at least 4 characters'),
  client: Joi.string().required().min(2).message('The id of client should have at least 2 characters'),
  product: Joi.array().required().min(1).message('The wishlist must contain at least 1 product'),
});

module.exports = {
  ClientSchemaController,
  ProductSchemaController,
  ProductSchemaControllerUpdate,
  WishListSchemaController,
};
