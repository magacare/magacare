const { config } = require('dotenv');

config('../../.env');

module.exports = {
  connectionString: process.env.DATABASE,
};
