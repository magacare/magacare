const mongoose = require('mongoose');

const current = new Date();
const timeStamp = new Date(Date.UTC(
  current.getFullYear(),
  current.getMonth(),
  current.getDate(),
  current.getHours(),
  current.getMinutes(),
  current.getSeconds(),
  current.getMilliseconds(),
));

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clients',
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
  }],
  createdAt: {
    type: Date,
    default: timeStamp,
  },

});

module.exports = mongoose.model('WhishLists', schema);
