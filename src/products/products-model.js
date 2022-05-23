const mongoose = require('mongoose');

const schema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Products', schema);
