const mongoose = require('mongoose');

const schema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    default: 'prefiro não responder',
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Clients', schema);
