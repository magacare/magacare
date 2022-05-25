const bcrypt = require('bcryptjs');

const checkPassword = (password, passwordHash) => bcrypt.compare(password, passwordHash);

module.exports = checkPassword;
