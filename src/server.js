const express = require('express');
const HealthRoute = require('./config/health');

const configRotas = (app) => {
  HealthRoute(app);
};

const configServer = (app) => {
  app.use(express.json());
  configRotas(app);
};

const createServer = () => {
  const app = express();
  configServer(app);
  return app;
};

const initServer = (app, port = 3000) => {
  console.log(`Running! Port: ${port}`);
  app.listen(port);
};

module.exports = {
  createServer,
  initServer,
  configServer,
  configRotas,
};
