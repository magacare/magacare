const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  },
  createdAt: {
    type: Date,
    required: true,
  },

});

module.exports = mongoose.model('WhishLists', schema);
