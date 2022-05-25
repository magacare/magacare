const {
  autenticateClient,
} = require('./session-controller');
const { SessionController } = require('../validate/schema-controller');
const validator = require('../validate/validate');

module.exports = (app) => {
  const defaultRoute = '/session';
  app.post(
    defaultRoute,
    validator.validateFields(SessionController),
    autenticateClient,
  );
};
